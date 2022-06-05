<template>
  <div class="home">
    <NavBar/>
    <div class="space-maker"></div>
    <PokeParty :key="partyReload"
    :imageUrl="imageUrl"
    />
    <!-- :myPokemonsUrl="myPokemonsUrl" -->
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
      @addParty="addParty"
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
  data:() => {
    return{
      imageUrl :'',
      apiUrl:'',
      pokemonUrl: '',
      showDetail: false,
      partyReload: 0 ,
      // myPokemonsUrl: null,
    }
  },
  created(){
   this.apiUrl = this.getApiUrl()
   this.imageUrl = this.getImageUrl()
  //  this.myPokemons = this.getMyPokemons()

  
  },
  mounted(){

  }, 
  methods:{
    getApiUrl() {
      console.log('get Api')
      return this.$store.getters.getPokeApiUrl;
    },
    getImageUrl() {
      return this.$store.getters.getPokeImageUrl;
    },
    partyCmpReload(){
      this.partyReload++
    },
    setPokemonUrl(url){
      this.pokemonUrl = url;
      this.showDetail = true;
    },
    closeDetail(){
      this.pokemonUrl = '';
      this.showDetail = false;
    },
    addParty(pokemon){
      this.$store.commit({ type: "setMyPokemons", pokemon });
      this.partyCmpReload()
    
      // this.myPokemonsUrl = this.getMyPokemons() 
      // console.log(this.myPokemonsUrl)
    },
  },
}
</script>

<style lang="scss">
.home{
  background: radial-gradient(#156f99,#0A2E50);
  
 .space-maker{
   padding-top: 120px ;
 }
 .home-search{
   padding-bottom: 20px 
 }
}

 
</style>
