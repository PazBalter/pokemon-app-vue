<template>
    <section class="battle-arena">
      
      
        <div>
            <!-- <button @click="setNewTrainer"> LEVEL 1 ENEMY </button>
            <button @click="makeNewEnemy"> NEW ENEMY </button> -->
            <!-- <button @click="showStats"> SHOW STATS</button>
            <button @click="submitPokemons"> SUBMIT POKEMONS</button> -->
        </div>
        <div class="battle-container">
            <div class="enemy-pos">
                <div class="enemy-status">
                    <PokeStats
                     :pokemon="opponentFrontPoke" />
                </div>
            <EndbattleMenu 
            v-if="isEndGameMenuOn"
            @quitGame="quitGame" />
                <div  class="enemy-poke-img">
                    <div  >
                        <div v-if="opponentFrontPoke"  class="pipi">
                            <img v-if=" opponentFrontPoke.height > 20" :style="{bottom: 25+'px'}" :src="imageUrl + opponentFrontPoke.id+'.png'" alt="">
                            <img v-else :style="{bottom: 20 +'px'}" :src="imageUrl + opponentFrontPoke.id+'.png'" alt="">
                        </div>
                    <div class="pipi" v-else>
                        <img :style="{bottom: 20+'px'}" :src="imageUrl + opponentFrontPoke.id+'.png'" alt="">
                    </div>
                    </div>
                 
                        
                </div>
            </div>
            <div class="user-pos">
                <div class="user-poke-img">
                    
                     <div  v-if="userPokemons.length" class="user-imgs-centered"> 
                        <div  v-if=" userPokemons[0].height > 5">
                            <img  v-if=" userPokemons[0].height < 20"
                                :style="{top: userPokemons[0].height+'px'}" 
                                :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${userPokemons[0].id}.png`">
                            <img  v-else 
                                :style="{top: 20+'px'}" 
                                :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${userPokemons[0].id}.png`">
                        </div>
                        <img  v-else
                        :style="{top: 25+'px'}" 
                        :src="userPokemons[0].sprites.back_default">
                    </div>
                </div>
                <div class="user-status">
                    <PokeStats
                    :pokemon="userFrontPoke"/>
                </div>
            </div>
        </div>
        <ControlTable @quitGame="quitGame"/>
    </section>
</template>

<script>

import PokeStats from './poke-stats.vue'
import ControlTable from './control-table.vue'
import EndbattleMenu from '@/components/end-battle-menu.vue' 

export default {
    components:{
        PokeStats,
        ControlTable,
        EndbattleMenu,
    },
    props: [  
        'imageUrl',
        'apiUrl',
        'pokeMovesUrl',
    ],
    data(){
        return{
            
            height:0,
            // enemyPokemon:[],
            currentUrl:'',
            // opponentFrontPoke:{},
            // userFrontPoke:{},
            // userFront:0,
            // enemyFront:0,
            // opponent:null,
            
        }   
    },
    created(){
        // this.enemyPokemonId = this.getEnemy()
        // this.currentUrl = this.apiUrl;
        // this.makeNewEnemy()
        // this.opponentFrontPoke = this.opponent.pokemons[0]
        // console.log(this.opponent.pokemons[0])
        // console.log(this.opponentFrontPoke.id)
    },
    computed:{
        opponent(){
            return this.$store.getters.getOpponent;
        },
        opponentFrontPoke(){
            return this.$store.getters.getOpponentFrontPoke;
        },
        userFrontPoke(){
            return this.$store.getters.getUserFront;
        },
        userPokemons(){
            return this.$store.getters.getMyPokemons;
        },
        isEndGameMenuOn(){
            return this.$store.getters.getIsEndGameMenuOn
        }

    },

    methods:{
        quitGame(){
            this.$emit("quitGame");
        },
        async setNewTrainer(){
            try {           
                await this.setNewTrainerByLevel()
                // this.opponentFrontPoke = this.getOpponentFrontPoke()
                //   console.log('frontOpp: ',this.opponentFrontPoke)
              
                // this.opponent = this.$store.getters.getEnemyTrainer
                // await this.fetchDataEnemy()
            } catch (error) {
               console.log(error) 
            }
            finally{
                // this.enemyPokemonId = this.opponent.pokemons.map( poke =>
                //     poke.id
                // )
                // this.fetchDataEnemy()
                //  this.enemyFront++
            }
          
        },
        getOpponentFrontPoke(){
            return this.$store.getters.getOpponentFront;
        },
        async setNewTrainerByLevel(){
            let level = 1
            await this.$store.dispatch({ type: "setNewOpponent", level });
            // return this.$store.getters.getEnemyTrainer;
        },
        submitPokemons(){
            this.userPokemons = this.getMyPokemons()
            // this.fetchDataUser()
            console.log(this.userPokemons)
        },
        getMyPokemons() {
            return this.$store.getters.getMyPokemons;
        },
        getEnemy(){
            return this.$store.getters.getEnemy;
        },
        makeNewEnemy(){
            this.$store.commit('makeNewEnemy')
            this.enemyPokemonId = this.getEnemy()
            this.fetchDataEnemy()
           
        },
        showStats(){
            console.log(this.$store.getters.getMyPokemonsStats)
        },
        fetchDataEnemy(){  
            // try {
            //     this.opponent.pokemons.forEach(poke => {})
            // } catch (error) {
            //     console.log(error)
            // }
            // this.opponent = []
            // this.opponent.pokemons.forEach(poke => {
            // let req = new Request(this.currentUrl + poke.id);
            // fetch(req)
            // .then((res) =>{
            //     if(res.status === 200)
            //     return res.json();
                
            // })
            // .then((data) => {
            //     this.enemyPokemon.push(data);
            //     this.opponentFrontPoke = this.enemyPokemon[0]
            // })
            // .catch((error) =>{
            //     console.log(error);
            // })
            // .then(()=>{
            //     this.enemyFront++
            // })
            // });
        },
        fetchDataUser(){  
            this.userPokemons.forEach(pokemon => {
            let req = new Request(this.currentUrl + pokemon.id);
            fetch(req)
            .then((res) =>{
                if(res.status === 200)
                return res.json();
            })
            .then((data) => {
                this.userFrontPoke = this.userPokemons[0]
                this.userFront++
            })
            .catch((error) =>{
                console.log(error);
            })
            });
           
        },
      
        
        
           
    },
  
}
</script>

<style lang="scss" scoped>
.battle-arena{
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    .battle-container{
        width: 700px;
        height: 300px;
        background-image: url(@/assets/arena-backgorund.jpeg);
        
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .enemy-pos{
            display: flex;
            justify-content: flex-end;
            .enemy-poke-img{
            height: 62px;
            width: 127px;
            display: block;
            background-image: url(@/assets/grass-enemy.png);
            background-repeat: no-repeat;
            background-size: contain;
            margin: 100px 100px 0px 0px;
            display: flex;
            justify-content: center;
            align-items: center;
                .pipi{
                    img{
                        position: relative;
                        bottom: 200px;
                        
                    }
           
                }
            }

            .enemy-status{
                position: relative;
                top: 20%;
                right: 10px;
            }
        }
        .user-pos{
            display: flex;
            align-items: flex-end; 
            .user-poke-img{
            width: 253px;
            height: 32px;
            display: block;
            background-image: url(@/assets/grass-user.png);
            background-repeat: no-repeat;
            background-size: contain;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            align-content: flex-end;  
                .user-imgs-centered{
                    img{
                        width: 150px;
                        height: 150px;
                        position: relative;
                        top: 20px;
                    }
                }  
            }

            .user-status{
                position: relative;
                bottom: 100%;
            }
        }
    }
}

</style>
