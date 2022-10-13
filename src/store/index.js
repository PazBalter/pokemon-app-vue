import Vue from 'vue'
import Vuex from 'vuex'

import {utilService} from '@/services/util.service'
import {movesService} from '@/services/moves.service'
import {statsService} from '@/services/stats.service'
import {trainerService} from '@/services/trainer.service.'
import {pokeService} from '@/services/pokemon.service'
import {damageService} from '@/services/damage.service'
import {arenaService} from '@/services/arena.service'

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
    gameIsOn:false
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
      console.log(pokemon)
      state.myPokemons.splice(index,1)
      console.log('before: ',state.myPokemons)
      state.myPokemons.splice(0,0,pokemon)
      console.log('after: ',state.myPokemons)
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
        let userPoke = state.myPokemons[0]
        let botPoke = state.opponent.pokemons[0]

        if(arenaService.isUserIsFaster(userPoke,botPoke)){
          botPoke = await arenaService.userTurn(move,userPoke,botPoke)
        }else{

        }
        state.opponent.pokemons[0].stats[0].points = botPoke.stats[0].points
        console.log(state.opponent)
          

        
      } catch (error) {
        
      }
    },
  },
  modules: {
  }
})
