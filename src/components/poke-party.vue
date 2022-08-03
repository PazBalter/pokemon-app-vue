<template>
  <section class="poke-party">
    <article
      class="party-slots"
      v-for="(pokemon, index) in pokemons"
      :key="'poke' + index"
    >
      <div
        @mouseover="
          openHoverMenu(index)
        "
        @mouseleave="openHoverMenu(null)"
        class="pokemon-slot"
      >
      <!-- , movesIdCheck(pokemon.id, pokemon.moves.length) -->
      <!-- , movesIdCheck(null) -->
        <img
          class="party-poke-img"
          :src="imageUrl + pokemon.id + '.png'"
          width="64"
          height="64"
          alt=""
        />

        <div v-if="index === showMenu" class="hover-menu">
          <div v-show="side" class="switch-front">
            <div class="poke-title">
              <div class="poke-name">{{ pokemon.name }}</div>
              <div class="poke-num">{{ pokemon.id }}#</div>
            </div>
            <div class="poke-card-paint">
              <div>
                <img
                  class="party-poke-img"
                  :src="cardUrl + pokemon.id + '.png'"
                  width="140"
                  height="140"
                  alt=""
                />
              </div>
            </div>
            <div  class="poke-moves">
              <span v-for="(move, index) in pokemon.moves" :key="move + index">
                <span v-if="move.moveName !== ''">
                  {{move.moveName}}
                  </span>
                <span v-else>-</span>
              </span>
            </div>
          </div>
          <div v-show="!side" class="switch-back">
            <ul>
              <li>Pokemon Sound</li>
              <li>
                pokemon types:
                <div
                  class="type"
                  v-for="(value, index) in pokemon.types"
                  :key="'value' + index"
                >
                  {{value}}
                </div>
              </li>
              <li @click="randomPokeMoves(pokemon.id, pokemon.moves.length)">
                Randomized Attacks
              </li>
              <li v-if="!showOption" @click="showOption = !showOption">
                Remove From Party
              </li>
              <li
                v-else
                class="row-li-option"
                :class="{ 'show-menu': showOption }"
              >
                <div @click="popFromParty(index)">Remove</div>
                <div @click="showOption = !showOption">Cancel</div>
              </li>
            </ul>
          </div>

          <div class="kaki">
            <button class="switch-card-btn" @click="side = !side">
              switch
            </button>
          </div>
        </div>
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
export default {
  props: ["myPokemonsUrl", "imageUrl"],
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
    // this.pokemons = this.getMyPokemons();
    // this.pokemonsMoves = this.getMyPokemonsMoves();
    this.checkSlots();
  },
  computed: {
    pokemons() {
        return this.$store.getters.getMyPokemons;
    },
    getSlots(){
        return this.$store.getters.getSlots;
    },
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
      this.showMenu = index;
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

    .hover-menu {
      .kaki {
        background-color: #2c3e50;
        border-radius: 0px 0px 5px 5px;
        .switch-card-btn {
          color: #efefef;
          padding: 5px;
          transition: 0.3s;
          background-color: #2f4e6d;
          border-radius: 5px;
        }
      }

      .switch-front {
        border-radius: 0px 5px 0px 0px;
        background-color: #2c3e50;
        cursor: default;
        height: 255px;
      }
      // text-transform: capitalize;
      background-color: #efefef;
      position: absolute;
      top: 4rem;
      color: #2c3e50;
      font-family: Avenir, Helvetica, Arial, sans-serif;
      border: 3px solid #212f3c;
      border-radius: 5px;
      padding: 4px;
      width: 200px;
      // padding: 1rem;
      display: flex;
      flex-direction: column;

      .poke-title {
        background-color: #2c3e50;
        display: flex;
        flex-direction: row;
        border-radius: 0px 3px 0px 0px;

        .poke-name {
          background-color: #efefef;
          font-weight: bold;
          font-size: 1rem;
          padding: 0px 24px 0 10px;
          border-bottom-right-radius: 65%;
          border-top-right-radius: 4px;
        }
        .poke-num {
          text-align: right;
          background-color: #2c3e50;
          color: #efefef;
          padding: 0px 10px 0 16px;
          border-radius: 0px 3px 0px 0px;
        }
      }
      .poke-card-paint {
        background-color: #efefef;
        border: 6px solid #2c3e50;
        border-radius: 3px 0px 0px 0px;
      }
      .poke-moves-table {
        display: grid;
        grid-template-areas: 1fr 1fr;
      }
      .poke-moves {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
        flex-wrap: wrap;
        padding: 10px;
        background-color: #2c3e50;
        border-radius: 0px 0px 3px 3px;
        color: #efefef;
        font-size: 12px;

        span {
          padding: 4px;
          width: 80px;
        }
        .moves-top-row {
          display: flex;
          flex-direction: row;
        }
        .moves-bottom-row {
          display: flex;
          flex-direction: row;
        }
      }

      .flex-row {
        display: flex;
        flex-direction: row;
        gap: 5px;
        .poke-img {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 80px;
          height: 80px;
          background-color: #333;
          border-radius: 50%;
          border-bottom-right-radius: 50%;
          overflow: hidden;
        }
      }

      .switch-back {
        height: 255px;
        background-color: #0a2e50;
        ul {
          list-style-type: none;
          li {
            color: #efefef;
            padding: 10px;
            transition: 0.3s;
            &:hover {
              background-color: #2f4e6d;
            }
          }
        }
        .row-li-option {
          transition: 0.2s;
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;

          &:hover {
            background-color: #0a2e50;
          }
          div {
            padding: 10px 15px 10px 15px;
            &:hover {
              background-color: #2f4e6d;
            }
          }
        }
        .show-menu {
          padding: 0px;
        }
        .types {
          display: flex;
          justify-content: flex-start;
          max-width: 400px;

          .type {
            margin: 0 10px 10px 0;
            padding: 3px 6px;
            border-radius: 12px;
            color: #fff;
            font-size: 0.7rem;
            letter-spacing: 1px;
            text-transform: capitalize;
            word-wrap: none;
            word-break: keep-all;
          }
          .type {
            background-color: #0a2e50;
          }
        }
      }
    }
  }
  .poke-slot-menu {
    background-color: aqua;
    height: 100px;
    width: 100px;
  }
}
</style>
