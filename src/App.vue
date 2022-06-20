<template>
  <div id="app">
    <!-- <NavBar
    :key="partyReload"
    @togglePartySlots="togglePartySlots"
    @spliceFromParty="spliceFromParty"
    :imageUrl="imageUrl"
    /> -->
    <router-view/>
  </div>
</template>

<script>

import NavBar from '@/components/nav-bar.vue'
export default {
  components: {
    NavBar,
  },
  data(){
    return{
      // partyReload: 0,
      // imageUrl :'',
      // partySlots:true, 
    }
  },
  // created(){
  //   this.imageUrl = this.getImageUrl()
  // },
  methods:{
    // getImageUrl() {
    //   return this.$store.getters.getPokeImageUrl;
    // },
    // togglePartySlots(slots){
    //   if(slots === 0 ){
    //     this.partySlots = false;  
    //   }else{
    //     this.partySlots = true;  
    //   }
    // },
    // spliceFromParty(index){
    //   this.$store.commit({ type: "spliceIndexFromParty", index });
    //   this.partyCmpReload()
    // },
    // partyCmpReload(){
    //   this.partyReload++
    // },
  }
}
</script>

<style lang="scss">

*{
  padding: 0;
  margin: 0;
}
#app {
  background: radial-gradient(#156f99,#0A2E50);
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

nav {
  padding: 30px;
  background-color: rgb(251, 89, 89);
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
