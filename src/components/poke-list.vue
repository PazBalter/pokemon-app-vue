<template>
  <section class="list-container">
    <article class="poke-card" v-for="(pokemon ,index) in pokemons"
    :key="'poke'+index"
    @click="setPokemonUrl(pokemon.url)">
    <img :src="imageUrl +pokemon.id+'.png'" width="96" height="96" alt="">
    <h3>{{pokemon.name}}</h3>
    <h3>{{pokemon.id}}#</h3>
    </article>
    <div class="scroll-trigger" ref="infinitescrolltrigger">
      <PulseLoader/>
    </div>
  </section>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
  name: 'PokeList',
  components:{
    PulseLoader,
  },
  props: [  
    'imageUrl',
    'apiUrl'
    ],
    data() {
    return {
      pokemons:[],
      nextUrl:'',
      currentUrl: ''
    }
  },
  created(){
    this.currentUrl = this.apiUrl;
    this.fetchData();
  },
  mounted(){
    this.scrollTrigger();
  },
  methods:{
    fetchData(){
      let req = new Request(this.currentUrl);
      fetch(req)
        .then((res) =>{
          if(res.status === 200)
          return res.json();
        })
        .then((data) => {
          this.nextUrl = data.next;
          data.results.forEach(pokemon => { 
            pokemon.id = pokemon.url.split('/')
              .filter(function(part){ return !!part}).pop()
            this.pokemons.push(pokemon);
          });
        })
        .catch((error) =>{
          console.log(error);
        })
    },
    scrollTrigger(){
      const observer = new IntersectionObserver((entries)=>{
        entries.forEach(entry =>{
          if(entry.intersectionRatio > 0 && this.nextUrl){
            this.next();
          }
        });
      })

        observer.observe(this.$refs.infinitescrolltrigger)
    },
    next(){
      this.currentUrl = this.nextUrl; 
      this.fetchData();
    },
    setPokemonUrl(url){
      this.$emit('setPokemonUrl',url) ;
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  
}
a {
  color: #42b983;
}
.poke-info{
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.list-container{
  display: grid;
  padding: 0 20px;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fit,minmax(150px ,1fr));
  grid-gap: 10px;
  width: 100%;
  max-width: 500px;
}
.poke-card{
  border-radius: 10px;
  background-color: #efefef;
  transition: 0.25s;
  text-transform: capitalize;
  cursor: pointer;
  &:hover{
    background-color:rgb(251, 249, 113) ;
    
  }
}
.scroll-trigger{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 150px;
  font-size: 2rem;
  // color: #efefef;
}
.box-load{
  width: 100px;
  height: 100px;
}
</style>
