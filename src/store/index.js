import Vue from 'vue'
import Vuex from 'vuex'

import {utilService} from '@/services/util.service'
import {movesService} from '@/services/moves.service'
import {statsService} from '@/services/stats.service'
import {trainerService} from '@/services/trainer.service.'
import {pokeService} from '@/services/pokemon.service'
import {damageService} from '@/services/damage.service'
import {arenaService} from '@/services/arena.service'
// import { types } from 'sass'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    minPokemons:1,
    maxPokemons:500,
    pokeImageUrl :'https://raw.githubusercontent.com/Pokeapi/sprites/master/sprites/pokemon/',
    pokeApiUrl:'https://pokeapi.co/api/v2/pokemon/',
    pokeMovesUrl:'https://pokeapi.co/api/v2/move/',
    myPokemons: [],
    partySlots:3,
    enemyPokemonsId:['3/','6/','9/'],
    opponent:[],
    gameIsOn:false,
    battleRound:0
  },
  getters: {
    getPokeImageUrl(state) {
      return state.pokeImageUrl;
    },
    getPokeApiUrl(state) {
      return state.pokeApiUrl;
    },
    getMyPokemons(state) {
      return state.myPokemons;
    },
    getMyPokemonsLen(state) {
      return state.myPokemons.length;
    },
    getPokeMovesUrl(state){
      return state.pokeMovesUrl;
    },
    getSlots(state){
      return state.partySlots;
    },
    getEnemy(state){
      return state.enemyPokemonsId;
    },
    getOpponent(state){
      return state.opponent;
    },
    getOpponentFrontPoke(state){
      return state.opponent.pokemons[0]
    },
    getUserFront(state){
      return state.myPokemons[0]
    },
    getGameIsOn(state){
      console.log('getGameIsOn: ',state.gameIsOn)
      return state.gameIsOn
    }

  },
  mutations: {
    setMyPokemons(state,{pokemon}){
      if(state.myPokemons.length < 3){
        state.partySlots = state.partySlots - 1
        state.myPokemons.push(pokemon)
      }else{
        state.partySlots = 0
       
      }
    },
    spliceIndexFromParty(state,{index}){
      state.myPokemons.splice(index,1)
      state.partySlots = state.partySlots + 1
     
    },
    switchPokeIdx(state,{index}){
     
      const pokemon = state.myPokemons[index]
      state.myPokemons.splice(index,1)
      state.myPokemons.splice(0,0,pokemon)
    
    },
    makeNewEnemy(state){
      state.enemyPokemonsId.forEach((id,index) =>{
        state.enemyPokemonsId[index] =
          utilService.getRandomInt(state.minPokemons,state.maxPokemons).toString() + '/'
      });
    },
    setTrainer(state,{newOpp}){
      state.opponent = newOpp
      console.log('setTrainer store: ',state.opponent)
    },
    toggleGame(state){
      state.gameIsOn? state.gameIsOn = false : state.gameIsOn = true ;
      console.log('toggleGame: ',state.gameIsOn)
    },
    setRandomMoves(state,{pokeIdAndMoves}){
      // state.myPokemonsMoves.forEach((id,index)=>{
      //   if(state.myPokemonsMoves[index].pokeId === pokeIdAndMoves.id){
      //     console.log(pokeIdAndMoves.id)
      //     console.log(pokeIdAndMoves.moveLength)
      //     state.myPokemonsMoves[index]= movesService.createPokeMoves(pokeIdAndMoves.id,pokeIdAndMoves.moveLength)
      //   }
      // })
      console.log('Coming Soon')
    },
    botSwitchPoke(state,{userPoke}){
      
   
      // console.log( state.opponent.pokmons.some((poke) => poke.stats[0].points > 0))
      if( true){
        const arrOfChoices =[]
        state.opponent.pokemons.forEach((poke,index) =>{
         if(poke.stats[0].points > 0){
           console.log("poke.index: ",index)
           arrOfChoices.push(index)
         }
         // let choice = arenaService.botBestSwitch(userPoke.types,poke)
       });
       console.log('arrOfChoices: ',arrOfChoices)
       const pokemon = state.opponent.pokemons[arrOfChoices[0]]
       state.opponent.pokemons.splice(arrOfChoices[0],1)
       state.opponent.pokemons.splice(0,0,pokemon)
      }else{
        console.log('You Win')
      }
    
    }
   
  },
  actions: {
    async addPokemon({commit},{id}){
      const pokemon = await pokeService.CreatePokeObject(id)
      commit({type: 'setMyPokemons',pokemon})

    },
    async setNewOpponent({commit},{level}){
      try {
        const newOpp = await trainerService.CreateTrainer(level)
        commit({type: 'setTrainer', newOpp})
      } catch (error) {
        console.log(error)
      }finally{
        console.log('finally: set opponent')
        commit({type: 'toggleGame'})
      }
    },
    async switchToFrontPoke({commit},{index}){
      try {
        commit({type: 'switchPokeIdx', index})
      } catch (error) {
        console.log(error)
      }finally{
        console.log()
      }
    },
    async battleTurn({commit,state},{move}){
      try {
        state.battleRound++
        let userPoke = state.myPokemons[0]
        let botPoke = state.opponent.pokemons[0]

        if(arenaService.isUserIsFaster(userPoke,botPoke)){
          botPoke = await arenaService.userTurn(move,userPoke,botPoke)
          if(botPoke.stats[0].points === 0){
            console.log('botSwitchPoke')
            commit({type: 'botSwitchPoke',userPoke})
          }else{
            userPoke = await arenaService.botTurn(userPoke,botPoke)
            if(userPoke.stats[0].points === 0){
              console.log('user have to switch')
            }
          }
          
        }else{
          userPoke = await arenaService.botTurn(userPoke,botPoke)
          if(userPoke.stats[0].points === 0){
            console.log('user have to switch')
          }else{
            botPoke = await arenaService.userTurn(move,userPoke,botPoke)
            if(botPoke.stats[0].points === 0){
              console.log('botSwitchPoke')
              commit({type: 'botSwitchPoke',userPoke})
            }
          }
         
        }
        console.log('finish func battle Round: ',state.battleRound)
          

        
      } catch (error) {
        console.log(error)
      }
    },
  },
  modules: {
  }
})
