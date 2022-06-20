import Vue from 'vue'
import Vuex from 'vuex'

import {utilService} from '@/services/util.service'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    minPokemons:1,
    maxPokemons:500,
    pokeImageUrl :'https://raw.githubusercontent.com/Pokeapi/sprites/master/sprites/pokemon/',
    pokeApiUrl:'https://pokeapi.co/api/v2/pokemon/',
    pokeMovesUrl:'https://pokeapi.co/api/v2/move/',
    myPokemons: [],
    slots:true,
    enemyPokemonsId:['3/','6/','9/'],
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
    getPokeMovesUrl(state){
      return state.pokeMovesUrl;
    },
    getMySlots(){
      return state.slots;
    },
    getEnemy(state){
      console.log(state.enemyPokemonsId)
      return state.enemyPokemonsId;
    },

  },
  mutations: {
    setMyPokemons(state,{pokemon}){
      if(state.myPokemons.length <3){
        state.slots = true
        state.myPokemons.push(pokemon)
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
   
  },
  actions: {
  },
  modules: {
  }
})
