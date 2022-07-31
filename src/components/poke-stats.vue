<template>
    <section class="status" v-if="(enemyFrontPoke || userFrontPoke)">
        <div class="front-poke-name">{{pokemon.name}}
            <span v-if="pokeStatus">{{pokeStatus}}</span>
        </div>
        <div class="hp-bar-container">
            <div class="hp-wrapper">
                <div class="hp-tubo">
                <span :style="{width:setwidth() +'%',background:setBarColor()}"> </span>
            </div>
            </div>
        </div>
        <!-- <button @click="changeMoreHP">cahnge</button>
        <button @click="changeLessHP">cahnge</button>
        <button @click="changeLesserHP">cahnge</button> -->
    </section>
</template>

<script>
export default {
    props:[  
        'enemyFrontPoke',
        'userFrontPoke',
        ],
    data(){
       
        return{
            pokemon:{},
            pokeMaxHP: 100,
            pokeStatus:null ,
        }
    },
    created(){
        this.pokeCheck()
    },
    mounted(){
        
    },
    methods:{
        pokeCheck(){
            if(this.enemyFrontPoke){
              this.pokemon = this.enemyFrontPoke  
            }else if(this.userFrontPoke){
              this.pokemon = this.userFrontPoke  
            }else{
                return null
            }
        },
        setwidth(){
        var width = this.pokeMaxHP
        return width
        },  
        changeLessHP(){
            this.pokeMaxHP = 19
            this.setwidth()
        }, 
        changeLesserHP(){
            this.pokeMaxHP = 0
            this.setwidth()
        }, 
        changeMoreHP(){
            this.pokeMaxHP = 55
            this.setwidth()
        },
        setBarColor(){
            if (this.pokeMaxHP > 55) {
                return '#00cc71';
            }else if(this.pokeMaxHP >=20){
                return '#ffb33e'
            }
            else if(this.pokeMaxHP >=8){
                return '#FB5959';
            }
            else{
                return '#e30e0e'
            }
        }, 
    }
}
</script>


<style lang="scss" scoped>

.status{
    width: 150px;
    display: flex;
    flex-direction: column;
    align-items: left;
    border: 3px solid rgb(73, 73, 73);
    background-color: rgb(207, 203, 203) ;
    padding: 2px;
    border-radius: 5px;
    height: 40px;
    .front-poke-name{
        font-size: 15px;
        font-weight: bold;
        text-align: left;
        text-transform: uppercase;
    }
    .hp-bar-container {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid rgb(44, 43, 43);
        border-radius: 999px;
    }
}


.hp-wrapper {
    display: flex;
    align-items: center;
}
.hp-tubo {
    position: relative;
    height: 8px;
    background: #e4e5e7;
    -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    flex-grow: 1;
    border-radius: 999px;
    span {
        transition: 4s;
        display: flex;
        align-content: center;
        // background-color: #ffb33e;
        height: 100%;
        position: absolute;
        left: 0;
        z-index: 1;
        border-radius: 999px;
    }
}
</style>