<template>
    <section class="party-bag">
        <div class="bag-container" >
            <div
                @click="switchToFrontPoke(index)" 
                class="poke-profile-bag "
                v-for="(pokemon, index) in pokemons" :key= index>
                <div class="poke-profile-bag-left">
                    <div class="slot-poke-pic">
                        <div :class="{ 'grey-active': pokemon.isFaint }">
                            <img
                                class="party-poke-img"
                                :src="cardUrl + pokemon.id + '.png'"
                                width="66"
                                height="66"
                                />
                        </div>
                    </div>
                </div>  
                <div class="poke-profile-bag-right">
                    <div class="poke-profile-bag-name">
                        {{pokemon.name}}
                    </div>
                    <div class="bag-poke-profile-stats">
                        <div class="bag-hp-stat">
                            <span>HP</span>
                            <span ><span :class="{'zero-hp':pokemon.isFaint }">
                              {{pokemon.stats[0].points}} </span>  /
                                {{pokemon.stats[0].max}}</span>
                        </div>
                    </div>
                    
                </div>        
            </div> 
        </div>
        <div class="party-bag-back-btn" @click="goToControlTable">
            back
        </div> 
    </section>
</template>

<script>
export default {
    data(){
        return{
            cardUrl:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"
        }
    },
    computed:{
        pokemons(){
            return this.$store.getters.getMyPokemons;
        },
        userFrontPoke(){
        return this.$store.getters.getUserFront;
        },
    },
    methods:{
        goToControlTable(){
            this.$emit("menuSwitch",false,1);
        },
        async switchToFrontPoke(index){
            if( this.userFrontPoke.id === this.pokemons[index].id ){
                if( this.pokemons[index].isFaint ){
                    alert('cannot fight')
                }
                alert('pokemon already fighting')
            }else{
                this.goToControlTable()
                this.$store.dispatch({ type: "switchToFrontPoke", index })
            }
       
           
        },
        addGlow(){

        },

    }
}
</script>

<style lang="scss" scoped>

.party-bag{
    padding-left:20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    box-sizing: border-box;
    border-radius: 0px 0px 4px 4px;
    border: solid 5px #2c3e50;
    position: absolute;
    width: 700px;
    height: 120px;
    background-color: rgb(250, 229, 167);
    box-shadow: 0 15px 30px rgba(0,0,0,.2),
                0 15px 30px rgba(0,0,0,.2);
    .bag-container{
        gap: 10px;
        display: flex;
        flex-direction: row; 
    }
    .party-bag-back-btn{
        margin-right:20px;
        padding: 10px 20px 10px 20px;
        background-color: #2c3e50;
        color: #efefef;
    }
    

    .poke-profile-bag{
        height: 80px;
        background-color: #efefef;
        border: solid 3px #2c3e50;
        border-radius: 5px;
        padding: 3px;
        display: flex;
        flex-direction: row;
        // :hover{
           
            // animation: addglow 1s ease-in-out infinite alternate;
        // }
    
       
        // @keyframes addglow {
        //     from {
        //         text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
        //     }
            
        //     to {
        //         text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
        //     }
        // }
        
        .slot-poke-pic{
            background-color: #efefef;
        } 
        .poke-profile-bag-left{
            border-radius: 3px 0px 0px 3px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #2c3e50; 
            padding-left: 5px;
        }
        .grey-active{
            background-color: rgba(0, 0, 0, 0.1);
            position:relative;
                img{
                    -webkit-filter: grayscale(100%); 
                    filter: grayscale(100%);
                }
        }
        .zero-hp{
            color: #fb5959;
        }
        .poke-profile-bag-right{
            border-radius: 0px 3px 3px 0px;
            width: 90px;
            background-color: #2c3e50;
            text-transform: capitalize;
            color:#efefef;
            
            .poke-profile-bag-name{
                padding: 3px 3px 6px 3px;
                font-size: 14px;
                text-transform: capitalize;
            }
            .bag-poke-profile-stats{
                width: 70px;
                padding-left: 10px;
                font-size: 12px;
                display: flex;
                flex-direction: column;
                gap: 3px;
                .bag-hp-stat{
                    display: flex;
                    justify-content: space-between;
        
                }
                .bag-type-title{
                    display: flex;
                    justify-content: space-between;
                }
                
            }
        }
    }
}

</style>