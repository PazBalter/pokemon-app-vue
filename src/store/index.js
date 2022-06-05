import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pokeImageUrl :'https://raw.githubusercontent.com/Pokeapi/sprites/master/sprites/pokemon/',
    pokeApiUrl:' https://pokeapi.co/api/v2/pokemon/',
    myPokemons: [],
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
  },
  mutations: {
    setMyPokemons(state,{pokemon}){
      state.myPokemons.push(pokemon)
      // console.log(state.myPokemons)
    }
  },
  actions: {
  },
  modules: {
  }
})
