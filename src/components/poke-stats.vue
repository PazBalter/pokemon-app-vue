<template>
    <section class="status" v-if="pokemon">
        <div class="front-poke-name">{{pokemon.name}}
            <span v-if="pokeStatus">{{pokeStatus}}</span>
        </div>
        <div class="hp-bar-container">
            <div class="hp-wrapper">
                <div class="hp-tubo">
                <span :style="{width:calcHpByPercent(this.pokemon.stats[0])  +'%',background:setBarColor()}"> </span>
            </div>
            </div>
        </div>
        <!-- <button @click="pokeCheck()">pokeCheck</button> -->
    </section>
</template>

<script>
export default {
    props:[  
        'pokemon',
        ],
    data(){
       
        return{
            // pokemon:{

            // },
            pokeHP: 100,
            pokeStatus:null ,
        }
    },
   
    created(){
        console.log(this.pokemon)
        // console.log('1',this.opponentFrontPoke)
        // console.log('2',this.userFrontPoke)
        // this.pokeCheck()

    },
    watch:{
        pokemon(newVal,oldVal){
            console.log('newVal: ',newVal)
            console.log('oldVal: ',oldVal)
            this.pokeHP = newVal.stats[0].points
            this.pokeCheck()
        },
        opponentFrontPoke(newVal,oldVal){
           console.log(newVal,oldVal)
            // this.id = newExrDay.id
            // this.weight = newExrDay.weight
            // this.auto_weight = Boolean(newExrDay.auto_weight)
            // this.auto_reps = Boolean(newExrDay.auto_reps)
            // this.day_id = newExrDay.day_id
            // this.exercise_id = newExrDay.exercise_id.toString()
            // this.increment = newExrDay.increment
            // console.log('watcher opponentFrontPoke: ', opponentFrontPoke) 
        }
    },
    methods:{
        consoleLog(){
            console.log('1',this.pokemon)
            console.log('2',this.pokemon)
        },
        pokeCheck(){
            if(this.pokemon){
              this.calcHpByPercent(this.pokemon.stats[0]) 
              this.setWidth()
            }else{
                return null
            }
        },
        calcHpByPercent(statHp){
            let hp = Math.round(statHp.points*100/statHp.max)
            hp <= 0 ? hp = 0 : hp = hp
            this.pokeHP = hp
            return this.pokeHP
        },
        setWidth(){
            return this.pokeHP
        },  
        setBarColor(){
            if (this.pokeHP > 55) {
                return '#00cc71';
            }else if(this.pokeHP >=20){
                return '#ffb33e'
            }
            else if(this.pokeHP >=8){
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