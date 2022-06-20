<template>
  <div class="home">
    <NavBar :key="partyReload"
      :imageUrl="imageUrl"
      @togglePartySlots="togglePartySlots"
      @spliceFromParty="spliceFromParty"
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
      :partySlots="partySlots"
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
      partySlots:true,
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
    togglePartySlots(slots){
      if(slots === 0 ){
        this.partySlots = false;  
      }else{
        this.partySlots = true;  
      }
      // console.log("homeview closefunc",this.partySlots)
    },
    addParty(pokemon){
      this.$store.commit({ type: "setMyPokemons", pokemon });
      this.partyCmpReload()
      // this.myPokemonsUrl = this.getMyPokemons() 
      // console.log(this.myPokemonsUrl)
    },
    spliceFromParty(index){
      this.$store.commit({ type: "spliceIndexFromParty", index });
      this.partyCmpReload()
    }
  },
}
</script>

<style lang="scss">
.home{
  min-height: 100vh; 
  
.space-maker{
  padding-top: 120px ;
}
.home-search{
  padding-bottom: 20px 
}
}

 
</style>
