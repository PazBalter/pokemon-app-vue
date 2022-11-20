<template>
    <section class="poke-card-container">
        
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
              
              <li class="types-container" @click="showStats = !showStats" >
                pokemon stats
                <div  class="overlay stats-container"
                  :class="{'click-overlay' : showStats}"
                >
                  <div>
                    HP:{{pokemon.stats[0].max}}
                  </div>
                  <div>
                    Atk:{{pokemon.stats[1].points}}
                  </div>
                  <div>
                    Def:{{pokemon.stats[2].points}}
                  </div>
                  <div>
                    S.Atk:{{pokemon.stats[3].points}}
                  </div>
                  <div>
                    S.Def:{{pokemon.stats[4].points}}
                  </div>
                  <div>
                    Speed:{{pokemon.stats[5].points}}
                  </div>
                </div>
                
              </li>
              <li class="types-container" @click="showTypes = !showTypes" >
                pokemon types
                <div  class="overlay"
                  :class="{'click-overlay' : showTypes}"
                >
                  <div 
                    class="type"
                    v-for="(value, index) in pokemon.types"
                    :key="'value' + index"
                  >
                    {{value}}
                  </div>
                </div>
                
              </li>
               
              <li v-if="!showOption1"
                @click="showOption1 = !showOption1">
                Change Moves
              </li>
              <li
                v-else
                class="row-li-option"
                :class="{ 'show-menu': showOption1 }"
              >
                <div @click="changeMoves(pokemon.id) , showOption1 = !showOption1">Resume</div>
                <div @click="showOption1 = !showOption1">Cancel</div>
              </li>
              <li v-if="!showOption2"
                @click="showOption2 = !showOption2">
                Remove From Party
              </li>
              <li
                v-else
                class="row-li-option"
                :class="{ 'show-menu': showOption2 }"
              >
                <div @click="popFromParty(pokemon.id)">Resume</div>
                <div @click="showOption2 = !showOption2">Cancel</div>
              </li>
            </ul>
          </div>

          <div class="kaki">
            <button class="switch-card-btn" @click="side = !side">
              Options
            </button>
          </div>

        
    </section>
</template>
<script>
    export default {
  props: ["pokemon"],
  data() {
    return {
      currPokeMoves: null,
      cardUrl:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/",
      showMenu: null,
      side: true,
      showStats: false,
      showTypes: false,
      showOption1: false,
      showOption2: false,
    }
  },
  methods:{
    changeMoves(pokeId) {
      this.$store.dispatch({type:"changPokeMoves", pokeId});
    },
    popFromParty(pokeId) {
      this.$store.commit({type:"popFromParty", pokeId});
    },
  }

}
</script>
<style lang="scss" scoped>
.poke-card-container{
    
    
    text-transform: capitalize;
    background-color: #efefef;
    color: #2c3e50;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    border: 3px solid #212f3c;
    border-radius: 5px;
    padding: 4px;
    width: 200px;
    display: flex;
    flex-direction: column;
    .kaki {
        background-color: #2c3e50;
        border-radius: 0px 0px 5px 5px;
        .switch-card-btn {
            cursor: pointer;
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
        background-color: #2c3e50;
        ul {
            list-style-type: none;
            li {
                cursor: pointer;
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
            background-color: #0a2e50;
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
        .types-container{
          position: relative;
          
          .overlay{
            position: absolute;
            bottom: 100%;
            left: 0;
            right: 0;
            background-color: #0a2e50;
            overflow: hidden;
            width: 100%;
            height:0;
            transition: .5s ease;
          }
          .click-overlay{
            bottom: 0;
            height: 100%;
          }

        }
        .stats-container{
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
              text-transform: uppercase;
              word-wrap: none;
              word-break: keep-all;
              background-color: #0a2e50;
            }
        }
    }
}
</style>


