<template>
  <div class="home">
    <NavBar class="nav-pos-fixed"
      :imageUrl="imageUrl"
      @spliceFromParty="spliceFromParty"
      @randomPokeMoves="randomPokeMoves"
     />
    <div class="space-maker"></div>
    <PokeSearch class="home-search"
      :apiUrl="apiUrl"
      @setPokemonUrl="setPokemonUrl"/>
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
import PokeSearch from '@/components/poke-search.vue'
import NavBar from '@/components/nav-bar.vue'
import PokeParty from '@/components/poke-party.vue'

export default {
  name: 'HomeView',
  components: {
    NavBar,
    PokeList,
    PokeDetail,
    PokeSearch,
    PokeParty,
    
  },
  data() {
    return{
      imageUrl :'',
      apiUrl:'',
      pokemonUrl: '',
      showDetail: false,
    }
  },
  created(){
   this.apiUrl = this.getApiUrl()
   this.imageUrl = this.getImageUrl()
  }, 
  methods:{
    getApiUrl(){
      return this.$store.getters.getPokeApiUrl;
    },
    getImageUrl(){
      return this.$store.getters.getPokeImageUrl;
    },
    setPokemonUrl(url){
      this.pokemonUrl = url;
      this.showDetail = true;
    },
    closeDetail(){
      this.pokemonUrl = '';
      this.showDetail = false;
    },
    spliceFromParty(index){
      this.$store.commit({ type: "spliceIndexFromParty", index });
    },
    randomPokeMoves(pokeIdAndMoves){
      console.log('home=',pokeIdAndMoves)
      this.$store.commit({type: "setRandomMoves" , pokeIdAndMoves})
    }
  },
}
</script>

<style lang="scss">
.home{
  min-height: 100vh; 
  
  .nav-pos-fixed{
    position: fixed;
  }
  .space-maker{
    padding-top: 120px ;
  }
  .home-search{
    padding-bottom: 20px 
  }
}

 
</style>
