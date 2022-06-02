<template>
  <div class="home">
    <nav>
      Nav Bar
    </nav>
    <PokeList 
      :imageUrl="imageUrl" 
      :apiUrl="apiUrl"
      @setPokemonUrl="setPokemonUrl"/>
    <PokeDetail
      v-if="showDetail"
      :pokemonUrl="pokemonUrl"
      :imageUrl="imageUrl"
      @closeDetail="closeDetail"
      />
    

  </div>
</template>

<script>
// @ is an alias to /src
import PokeList from '@/components/poke-list.vue'
import PokeDetail from '@/components/poke-detail.vue'

export default {
  name: 'HomeView',
  components: {
    PokeList,
    PokeDetail
  },
  data:() => {
    return{
      imageUrl :'https://raw.githubusercontent.com/Pokeapi/sprites/master/sprites/pokemon/',
      apiUrl:' https://pokeapi.co/api/v2/pokemon/',
      pokemonUrl: '',
      showDetail: false
    }
  },
  methods:{
    setPokemonUrl(url){
      this.pokemonUrl = url;
      this.showDetail = true;
    },
    closeDetail(){
      this.pokemonUrl = url;
      this.showDetail = false;
    }
  },
}
</script>

<style lang="scss">
.home{
  background: radial-gradient(#156f99,#0A2E50);
  
  nav{
    margin-bottom: 40px;
  }
}

 
</style>
