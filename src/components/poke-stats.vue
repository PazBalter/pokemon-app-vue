<template>
    <section class="status" v-if="(opponentFrontPoke || userFrontPoke)">
        <div class="front-poke-name">{{pokemon.name}}
            <span v-if="pokeStatus">{{pokeStatus}}</span>
        </div>
        <div class="hp-bar-container">
            <div class="hp-wrapper">
                <div class="hp-tubo">
                <span :style="{width:setWidth() +'%',background:setBarColor()}"> </span>
            </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props:[  
        'opponentFrontPoke',
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
    watch:{
       pokeMaxHP(value){
           this.setWidth(value)
        },  
    },
    methods:{
        pokeCheck(){
            if(this.opponentFrontPoke){
              this.pokemon = this.opponentFrontPoke 
              this.calcHpByPercent(this.pokemon.stats[0]) 
            }else if(this.userFrontPoke){
              this.pokemon = this.userFrontPoke
              this.calcHpByPercent( this.pokemon.stats[0])   
            }else{
                return null
            }
        },
        calcHpByPercent({max,points}){
            let hp
            hp = Math.round(points*100/max)
            hp <= 0 ? hp = 0 : hp = hp
            this.pokeMaxHP = hp
        },
        setWidth(){
            return this.pokeMaxHP
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