<template>
  <section class="poke-party">
    <article
      class="party-slots"
      v-for="(pokemon, index) in pokemons"
      :key="'poke' + index"
    >
      <div
        @mouseover="openHoverMenu(index)"
        @mouseleave="openHoverMenu(null)"
        class="pokemon-slot">
        <!-- , movesIdCheck(pokemon.id, pokemon.moves.length) -->
        <!-- , movesIdCheck(null) -->
        <img
          class="party-poke-img"
          :src="imageUrl + pokemon.id + '.png'"
          width="64"
          height="64"
          alt=""
        />
        <PokeCard 
          class="hover-menu"
          v-if="index === showMenu"
          :pokemon="pokemon"
        />
      </div>
    </article>

    <article class="party-slots" v-for="slots in 3 - pokemons.length" :key="slots">
      <div class="pokeball-slot">
        <img src="@/assets/pokeball.png" width="40" height="40" alt="" />
      </div>
    </article>
  </section>
</template>

<script>
import PokeCard from '@/components/poke-card.vue'
export default {
  props: ["myPokemonsUrl",
   "imageUrl"
  ],
  components:{
    PokeCard,
  },
  data() {
    return {
      currPokeMoves: null,
      cardUrl:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/",
      showMenu: null,
      side: true,
      showOption: false,
    };
  },
  created() {
    this.checkSlots();
  },
  computed: {
    pokemons() {
      return this.$store.getters.getMyPokemons;
    },
    getSlots(){
      return this.$store.getters.getSlots;
    },
    isGameOn(){
      return this.$store.getters.getGameIsOn
    }
  },
  methods: {
    getMySlots() {
      return this.$store.getters.getMySlots;
    },
    getMyPokemonsMoves() {
      return this.$store.getters.getMyPokemonsMoves;
    },
    checkSlots() {
      this.slots -= this.pokemons.length;
      // console.log("poke-slots",this.slots)
      this.closeParty();
    },
    closeParty() {
      this.$emit("closeParty", this.slots);
    },
    openHoverMenu(index) {
      if(this.isGameOn){
        this.showMenu = null;
      }else{
        this.showMenu = index;
      }
     
    },
    popFromParty(index) {
      this.$emit("popFromParty", index);
    },
    randomPokeMoves(id, moveLength) {
      // this.$emit("randomPokeMoves", { id, moveLength });
    },
  },
};
</script>

<style lang="scss" scoped>
.show-opacity {
  opacity: 1;
}
.poke-party {
  background-color: rgb(253, 176, 88);
  display: flex;
  justify-content: center;
  padding: 3px 10px 4px 10px;
  max-width: 250px;
  border-radius: 80px;
  border: 3px solid rgb(230, 138, 34);
  gap: 5px;

  .pokeball-slot {
    height: 40px;
    width: 40px;
    background-color: rgb(137, 79, 12);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2), 0 3px 5px rgba(0, 0, 0, 0.2);
  }
  .pokemon-slot {
    cursor: pointer;
    height: 40px;
    width: 40px;
    background-color: rgb(137, 79, 12);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2), 0 3px 5px rgba(0, 0, 0, 0.2);

    
  }
  .hover-menu{
    position: absolute;
    top: 4rem;
  }
  .poke-slot-menu {
    background-color: aqua;
    height: 100px;
    width: 100px;
  }
}
</style>
