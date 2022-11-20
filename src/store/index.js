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
    opponent:[],
    gameIsOn:false,
    battleRound:0,
    battleText:  "Choose your move!" ,
    isUserSwitch: false,
    isUserAction: false,
    isUserLost: false,
    gameLevel:1,
    isEndGameMenuOn: false,
  },
  getters: {
    getIsEndGameMenuOn(state){
      return state.isEndGameMenuOn
    },
    getGameLevel(state){
      return state.gameLevel
    },
    getIsUserAction(state){
      return state.isUserAction
    },
    getIsUserSwitch(state){
      return state.isUserSwitch
    },
    getBattleText(state){
      return state.battleText
    },
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
    },
  },
  mutations: {
    setGameLevel(state){
      if(state.gameLevel < 5){
        state.gameLevel = state.gameLevel + 1;
      }
      if(state.isUserLost){
        state.gameLevel = 1;
      }
    },
    toggleUserAction(state){
      state.isUserAction = (state.isUserAction)? false : true ;
    },
    toggleEndGameMenu(state){
      state.isEndGameMenuOn = (state.isEndGameMenuOn)? false : true ;
    },
    setNewText(state,{txt}){
      state.battleText = txt
      console.log(state.battleText)
    },
    setMyPokemons(state,{pokemon}){
      if(state.myPokemons.length < 3){
        state.partySlots = state.partySlots - 1;
        state.myPokemons.push(pokemon);
      }else{
        state.partySlots = 0;
       
      };
    },
    popFromParty(state,{pokeId}){
      state.myPokemons.forEach((poke,index) => {
        if(poke.id === pokeId){
          state.myPokemons.splice(index,1);
          state.partySlots = state.partySlots + 1;
        }
      });
    },
    spliceIndexFromParty(state,{index}){
      state.myPokemons.splice(index,1);
      state.partySlots = state.partySlots + 1;
     
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
      console.log('store-toggleGame: ',state.gameIsOn)
    },
    setNewPokeMoves(state,{pokeId,pokeMoves}){
      state.myPokemons.forEach(poke =>{
        if(poke.id = pokeId){
          poke.moves = pokeMoves
        }
      })
    },
    botSwitchPoke(state,{userPoke}){
      // console.log( state.opponent.pokmons.some((poke) => poke.stats[0].points > 0))
      console.log("bot opp: ", state)
      if(true){
        const arrOfChoices = []
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
    },
    isBotCanNotBattle(state){
      let botPokemons = state.opponent.pokemons
      let isAllZero = botPokemons.every(poke => poke.stats[0].points === 0);
      state.opponent.isCantBattle = isAllZero
    },
    isUserCanNotBattle(state){
      let userPokemons = state.myPokemons
      let isAllZero = userPokemons.every(poke => poke.stats[0].points === 0);
      state.isUserLost = isAllZero
    },
    setTypeWriter(state,{act,move,atkPoke,defPoke}) {
      switch (act) {
        case 'default':// make default para
          console.log('before default.battleText: ',state.battleText)
          state.battleText = `What will ${atkPoke.name.toUpperCase()} do!`;
          break;
        case 'attack':
          console.log('before attack.battleText: ',state.battleText)
          state.battleText = `${atkPoke.name.toUpperCase()} use ${move.moveName.toUpperCase()}!`;
          break;
        case 'pokeFaint':
          console.log('before pokeFaint.battleText: ',state.battleText)
          state.battleText = `${defPoke.name.toUpperCase()} fainted!`;
          break;
        case 'critical':
          console.log('before critical.battleText: ',state.battleText)
          state.battleText = `A critical hit!`;
          break;
        case 'superEffective':
          console.log('before superEffective.battleText: ',state.battleText)
          state.battleText = `It's super effective!`;
          break;
        case 'attackHit':
          console.log('before attackHit.battleText: ',state.battleText)
          state.battleText = `The attack hit!`;
          break;
        case 'notAffectedBy':
          console.log('before notAffectedBy.battleText: ',state.battleText)
          state.battleText = `It doesn't affect ${defPoke.name.toUpperCase()}...`;
          break;
        case 'notEffective':
          console.log('before notEffective.battleText: ',state.battleText)
          state.battleText = `Its not very effective...`;
          break;
        case 'missed':
          console.log('before missed.battleText: ',state.battleText)
          state.battleText = `${atkPoke.name.toUpperCase()}'s attack missed!`;
          break;
        case 'botSwitch':
          console.log('before botSwitch.battleText: ',state.battleText)
          state.battleText = `Your opponent sent out ${atkPoke.name.toUpperCase()}!`;
          break;
        case 'switching':
          console.log('before switching.battleText: ',state.battleText)
          state.battleText = `${atkPoke.name.toUpperCase()}, that's O.K!`;
          break;
        case 'midSwitch':
          console.log('before midSwitch.battleText: ',state.battleText)
          state.battleText = `${atkPoke.name.toUpperCase()}, that's enough! \n come back!`;
          break;
        case 'goPoke':
          console.log('before goPoke.battleText: ',state.battleText)
          state.battleText = `Go! ${atkPoke.name.toUpperCase()}!`;
          break;
        case 'userMustSwitch':
          console.log('before goPoke.battleText: ',state.battleText)
          state.battleText = `${defPoke.name.toUpperCase()} can not fight choose your next pokemon!`;
          break;
        case 'needSwitch':
          console.log('before goPoke.battleText: ',state.battleText)
          state.battleText = `${defPoke.name.toUpperCase()} fainted! choose your next pokemon!`;
          break;
        
        default:
        
      }
      console.log('setTypeWriter battleText: ',state.battleText)
    },
    onUserSwitch(state){
      state.isUserSwitch = (state.isUserSwitch) ? false : true;
    },
    
  },
  actions: {
    async changPokeMoves({commit,state},{pokeId}){
      try {
        let allPokeMoves =  await pokeService.getPokeMovesById(pokeId)
        console.log("allPokeMoves: ",allPokeMoves)
        let pokeMoves = await movesService.createPokeMoves(allPokeMoves)
        commit({type:'setNewPokeMoves',pokeId,pokeMoves})
      } catch (error) {
        console.log(error)
      }
    },
    async addPokemon({commit},{id}){
      const pokemon = await pokeService.CreatePokeObject(id)
      commit({type: 'setMyPokemons',pokemon})

    },
    async setNewOpponent({commit,state}){
      try {
        commit({type:"setNewText",txt:"Choose your move!"})
        const newOpp = await trainerService.CreateTrainer(state.gameLevel)
        commit({type: 'setTrainer', newOpp})
      } catch (error) {
        console.log(error)
      }finally{
        console.log('finally: set opponent')
        commit({type: 'toggleGame'})
        commit({type:"toggleUserAction"})
      }
    },
    async switchToFrontPoke({dispatch,commit,state},{index}){
      try {
        let userPoke = state.myPokemons[0]
        let userNextPoke  = state.myPokemons[index]
        if(userPoke.stats[0].points > 0){
          await dispatch({type: "middleBattleSwitch",index})
        }else{
          commit('setTypeWriter',{act:"switching",move:null,atkPoke:userPoke,defPoke:null})
          await arenaService.delayAction(1500)
          commit('setTypeWriter',{act:"goPoke",move:null,atkPoke:userNextPoke,defPoke:null})
          commit({type: 'switchPokeIdx', index})
          await arenaService.delayAction(1500)
        }
      
      } catch (error) {
        console.log(error)
      }finally{
        console.log()
      }
    },
    async middleBattleSwitch({dispatch,commit,state},{index}){
      try {

        commit({type: 'toggleUserAction'})
        state.battleRound++
        let userPoke = state.myPokemons[0]
        let userNextPoke  = state.myPokemons[index]
        let botPoke = state.opponent.pokemons[0]
        commit('setTypeWriter',{act:"midSwitch",move:null,atkPoke:userPoke,defPoke:null})
        await arenaService.delayAction(2000)
        console.log("userPoke: ",userPoke)
        commit('setTypeWriter',{act:"goPoke",move:null,atkPoke:userNextPoke,defPoke:null})
        commit({type: 'switchPokeIdx',index})
        await arenaService.delayAction(1500)
        await dispatch({type:'botAttackPhase',userPoke,botPoke})
        if( await dispatch({type:'isPokeFaint',userPoke:userNextPoke,botPoke:null})){
          console.log("hehehee ")
        }else{
          commit('setTypeWriter',{act:"default",move:null,atkPoke:userNextPoke,defPoke:null})
        }
      } catch (error) {
        console.log(error)
      } finally{
        commit({type: 'toggleUserAction'})
      }
    },
    async battleRound({dispatch,commit,state},{move}){
      try {

        commit({type: 'toggleUserAction'})
        state.battleRound++
        let userPoke = state.myPokemons[0]
        let botPoke = state.opponent.pokemons[0]
        await dispatch({type:'firstAttackPhase',userPoke,botPoke,move})
        if( await dispatch({type:'isPokeFaint',userPoke,botPoke})){
          await arenaService.delayAction(3000)
          if(state.isUserLost || state.opponent.isCantBattle){
            console.log("ya fs")
          }else{
            // commit('setTypeWriter',{act:"default",move:null,atkPoke:userPoke,defPoke:null})
          }
          // commit('setTypeWriter',{act:"default",move:null,atkPoke:userPoke,defPoke:null})
        }else{
          await dispatch({type:'secondAttackPhase',userPoke,botPoke,move})
          if(await dispatch({type:'isPokeFaint',userPoke,botPoke})){
            await arenaService.delayAction(3000)
            if(state.isUserLost || state.opponent.isCantBattle){
              console.log("ya fs")
            }else{
              // commit('setTypeWriter',{act:"default",move:null,atkPoke:userPoke,defPoke:null})
            }
          }else{
            commit('setTypeWriter',{act:"default",move:null,atkPoke:userPoke,defPoke:null})
          
          }
        }
      } catch (error) {
        console.log(error)
      }finally{
        if(state.isUserCanNotBattle || state.opponent.isCantBattle){

        }else{
          commit({type: 'toggleUserAction'})
        }
       
      }
    },
    async firstAttackPhase({dispatch},{userPoke,botPoke,move}){
      console.log("firstAttackPhase")
       try {
        console.log('firstAttackPhase: ',userPoke,botPoke,move)
        if(arenaService.isUserIsFaster(userPoke,botPoke)){
          await dispatch({type:"userAttackPhase",userPoke,botPoke,move})
          await arenaService.delayAction(3000)
          // console.log("next act")
        }else{
          await dispatch({type:"botAttackPhase",userPoke,botPoke})
          await arenaService.delayAction(3000)
          // console.log("next act")
        }
      } catch (error) {
        console.log(error)
      }
      
    },
    async userAttackPhase({state,commit,dispatch},{userPoke,botPoke,move}){
      try {
        commit('setTypeWriter',{act:'attack',move,atkPoke:userPoke,defPoke:botPoke})
        await arenaService.delayAction(1500)
        const damageObj = await arenaService.userAtkDmg(move,userPoke,botPoke)
        // console.log("damageObj: ",damageObj)
        // console.log("before stats[0].points: ", botPoke.stats[0].points)
        botPoke = await dispatch({type:"pokeHpCalc",damage:damageObj.points,pokemon:botPoke})
        // console.log("after stats[0].points: ", botPoke.stats[0].points)
        commit('setTypeWriter',{act:damageObj.cause,move,atkPoke:userPoke,defPoke:botPoke})

      } catch (error) {
        console.log(error)
      }
    
    },
    async botAttackPhase({state,commit,dispatch},{userPoke,botPoke}){
      try {
        
        const attack = await arenaService.botBestMove(botPoke,userPoke)

        commit('setTypeWriter',{act:'attack',move:attack,atkPoke:botPoke,defPoke:userPoke})
        console.log('attack: ',attack)
        await arenaService.delayAction(1500)
        let damageObj = await arenaService.calcAtkDmg(attack,botPoke,state.myPokemons[0])
        // await arenaService.delayAction(1000)
        state.myPokemons[0] = await dispatch({type:"pokeHpCalc",damage:damageObj.points,pokemon:state.myPokemons[0]})
        commit('setTypeWriter',{act:damageObj.cause,move:attack,atkPoke:botPoke,defPoke:state.myPokemons[0]})
      } catch (error) {
        console.log(error)
      }
    
    },
    async pokeHpCalc({state,commit},{damage,pokemon}){
        try {
          if( pokemon.stats[0].points > damage ){
            pokemon.stats[0].points = pokemon.stats[0].points- damage;
          }else{
            pokemon.stats[0].points = 0
            pokemon.isFaint = true
          }
          return pokemon
        } catch (error) {
          console.log(error)
        }
     
    },
    async secondAttackPhase({dispatch},{userPoke,botPoke,move}){
      try {
        console.log("secondAttackPhase")
        console.log('secondAttackPhase: ',userPoke,botPoke,move)
        if(!arenaService.isUserIsFaster(userPoke,botPoke)){
          await dispatch({type:"userAttackPhase",userPoke,botPoke,move})
          await arenaService.delayAction(3000)
          console.log("next act")
        }else{
          await dispatch({type:"botAttackPhase",userPoke,botPoke})
          await arenaService.delayAction(3000)
          console.log("next act")
        }  
      } catch (error) {
        console.log(error)
      }
    },
    async isPokeFaint({state,commit,dispatch},{userPoke,botPoke}){
      try {
        if(userPoke.isFaint){
          commit('setTypeWriter',{act:'pokeFaint',move:null,atkPoke:botPoke,defPoke:userPoke})
          await arenaService.delayAction(1000)
          commit({type:"isUserCanNotBattle"})
          if(state.isUserLost){
            commit({type:"setNewText",txt:"Game Over!"})
            commit({type:"toggleEndGameMenu"})
          }else{
            await arenaService.delayAction(1000)
            commit('setTypeWriter',{act:'userMustSwitch',move:null,atkPoke:null,defPoke:userPoke})
            commit({type:'onUserSwitch'})
          }
          return true
        }else if(botPoke.isFaint){

          commit('setTypeWriter',{act:'pokeFaint',move:null,atkPoke:userPoke,defPoke:botPoke})
          await arenaService.delayAction(2000)
          commit({type:"isBotCanNotBattle"})

          if(state.opponent.isCantBattle){
            commit({type:"setNewText",txt:"You Win!"})
            commit({type:"toggleEndGameMenu"})
            console.log("bot loser")
          }else{
            commit({type:"botSwitchPoke",userPoke})
          
          }
         
          return true
        }else{
          return false
        }
      } catch (error) {
        console.log(error)
      }
    },
    async switchPhase({state,commit},{userPoke,botPoke}){
      try {
        if(userPoke.isFaint){
          commit({type:'onUserSwitch'})
        }
        if(botPoke.isFaint){
          commit({type:"botSwitchPoke",userPoke})
        }
      } catch (error) {
        console.log(error)
      }
    },
    async restoreTeamHP({state}){
      try {
        console.log(state.myPokemons)
        state.myPokemons.forEach(poke =>{
          poke.stats[0].points =  poke.stats[0].max;
          poke.isFaint = false;
        })
      } catch (error) {
        console.log(error)
      }
    },
    async pokemonCantFight({commit},{pokemon}){
      try {
        commit('setTypeWriter',{act:'needSwitch',move:null,atkPoke:null,defPoke:pokemon})
      } catch (error) {
        console.log(error)
      }
    }
  },
})
