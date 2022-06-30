<template>
    <section class="battle-arena">
        <div class="space-maker"></div>
      
        <div>
        
            <button @click="makeNewEnemy"> NEW ENEMY</button>
            <button @click="submitPokemons"> SUBMIT POKEMONS</button>
        </div>
        <div class="battle-container">
            <div class="enemy-pos">
                <div class="enemy-status">
                    <PokeStats :key="enemyFront"
                    :enemyFrontPoke="enemyFrontPoke" />
                </div>
                
                <div  class="enemy-poke-img">
                    <div  v-if="enemyPokemon.length > 0">
                        <div v-if="enemyFrontPoke.height > 10"  class="pipi">
                            <img v-if=" enemyFrontPoke.height > 20" :style="{bottom: 25+'px'}" :src="imageUrl + enemyFrontPoke.id+'.png'" alt="">
                            <img v-else :style="{bottom: 20+'px'}" :src="imageUrl + enemyFrontPoke.id+'.png'" alt="">
                        </div>
                    <div class="pipi" v-else>
                        <img :style="{bottom: 20+'px'}" :src="imageUrl + enemyFrontPoke.id+'.png'" alt="">
                    </div>
                    </div>
                 
                        
                </div>
            </div>
            <div class="user-pos">
                <div class="user-poke-img">
                    <div  v-if="userPokemon.length > 0" class="user-imgs-centered">
                        <div  v-if=" userPokemon[0].height > 5">
                            <img  v-if=" userPokemon[0].height < 30"
                                :style="{top: userPokemon[0].height+'px'}" 
                                :src="userPokemon[0].sprites.back_default">
                            <img  v-else 
                                :style="{top: 30+'px'}" 
                                :src="userPokemon[0].sprites.back_default">
                        </div>
                        <img  v-else
                        :style="{top: 35+'px'}" 
                        :src="userPokemon[0].sprites.back_default">
                    </div>
                </div>
                <div class="user-status">
                    <PokeStats
                    :userFrontPoke="userFrontPoke"
                    :key="userFront"/>
                </div>
                
               
            </div>
        </div>
        
    </section>
</template>

<script>

import PokeStats from './poke-stats.vue'
export default {
    components:{
    PokeStats

    },
    props: [  
        'imageUrl',
        'apiUrl',
        'pokeMovesUrl',
    ],
    data(){
        return{
            height:0,
            userPokemon:[],
            enemyPokemon:[],
            enemyPokemonId:['3/','6/','9/'],
            currentUrl:'',
            enemyFrontPoke:{},
            userFrontPoke:{},
            userFront:0,
            enemyFront:0
            
        }   
    },
    created(){
        this.enemyPokemonId = this.getEnemy()
        this.currentUrl = this.apiUrl;
        this.makeNewEnemy()
        

       
    },
    methods:{
        submitPokemons(){
            this.userPokemon = this.getMyPokemons()
            this.fetchDataUser()
            console.log(this.userPokemon)
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
        fetchDataEnemy(){  
            this.enemyPokemon = []
            this.enemyPokemonId.forEach(id => {
            let req = new Request(this.currentUrl + id);
            fetch(req)
            .then((res) =>{
                if(res.status === 200)
                return res.json();
                
            })
            .then((data) => {
                this.enemyPokemon.push(data);
                this.enemyFrontPoke = this.enemyPokemon[0]
                
            
            })
            .catch((error) =>{
                console.log(error);
            })
            .then(()=>{
                this.enemyFront++
            })
            });
        },
        fetchDataUser(){  
            this.userPokemon.forEach(pokemon => {
            let req = new Request(this.currentUrl + pokemon.id);
            fetch(req)
            .then((res) =>{
                if(res.status === 200)
                return res.json();
            })
            .then((data) => {
                this.userFrontPoke = this.userPokemon[0]
                this.userFront++
            })
            .catch((error) =>{
                console.log(error);
            })
            });
           
        },
      
        
        
           
    },
    computed:{
       
    },

}
</script>

<style lang="scss" scoped>
.battle-arena{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .space-maker{
        padding-top: 120px ;
    }
    .battle-container{
        width: 700px;
        height: 350px;
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
