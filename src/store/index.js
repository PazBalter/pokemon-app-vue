import Vue from 'vue'
import Vuex from 'vuex'

import {utilService} from '@/services/util.service'
import {movesService} from '@/services/moves.service'
import {statsService} from '@/services/stats.service'
import {trainerService} from '@/services/trainer.service.'
import {pokeService} from '@/services/pokemon.service'
import {damageService} from '@/services/damage.service'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    minPokemons:1,
    maxPokemons:500,
    pokeImageUrl :'https://raw.githubusercontent.com/Pokeapi/sprites/master/sprites/pokemon/',
    pokeApiUrl:'https://pokeapi.co/api/v2/pokemon/',
    pokeMovesUrl:'https://pokeapi.co/api/v2/move/',
    myPokemons: [],
    myPokemonsMoves:[],
    myPokemonsStats:[],
    slots:true,
    enemyPokemonsId:['3/','6/','9/'],
    enemyTrainer:[],
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
    getMyPokemonsMoves(state){
      return state.myPokemonsMoves;
    },
    getMyPokemonsStats(state){
      return state.myPokemonsStats;
    },
    getPokeMovesUrl(state){
      return state.pokeMovesUrl;
    },
    getMySlots(){
      return state.slots;
    },
    getEnemy(state){
      return state.enemyPokemonsId;
    },
    getEnemyTrainer(state){
      return state.enemyTrainer;
    },

  },
  mutations: {
    setMyPokemons(state,{pokemon}){
      if(state.myPokemons.length <3){
       console.log(pokemon.id)
        state.slots = true
        state.myPokemons.push(pokeService.CreatePokeObject(pokemon.id))
        // state.myPokemonsMoves.push(
        //   movesService.createPokeMoves(pokemon.id,pokemon.moves.length)
        // )
        // state.myPokemonsStats.push(
        //   statsService.CreateStatObject(pokemon.stats)
        // )
        console.log(state.myPokemonsStats)
      }else{
        state.slots = false 
      }
    },
    spliceIndexFromParty(state,{index}){
      state.myPokemons.splice(index,1)
     
    },
    makeNewEnemy(state){
      state.enemyPokemonsId.forEach((id,index) =>{
        state.enemyPokemonsId[index] =
          utilService.getRandomInt(state.minPokemons,state.maxPokemons).toString() + '/'
      });
    },
    setRandomMoves(state,{pokeIdAndMoves}){
      state.myPokemonsMoves.forEach((id,index)=>{
        if(state.myPokemonsMoves[index].pokeId === pokeIdAndMoves.id){
          console.log(pokeIdAndMoves.id)
          console.log(pokeIdAndMoves.moveLength)
          state.myPokemonsMoves[index]= movesService.createPokeMoves(pokeIdAndMoves.id,pokeIdAndMoves.moveLength)
        }
      })
    },
   
  },
  actions: {
    async addpokemon({state},{id}){
      try {
        const pokeObj = await pokeService.CreatePokeObject(id)
        state.myPokemons.push(pokeObj)
      } catch (error) {
        console.log(error)
      }
     
    },
    async setNewEnemyTrainer({state},{ level }){
      try {
        state.enemyTrainer = await trainerService.CreateTrainer(level)
      } catch (error) {
        console.log(error)
      }finally{
        console.log('new trainer enter: ',state.enemyTrainer)
      }
    },
  },
  modules: {
  }
})
