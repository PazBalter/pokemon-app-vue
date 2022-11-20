<template>
  <section class="fight-table">
        <div class="moves-titles">
           <ul>
                <li :class="`${moves[0].type.toLowerCase()}-type`" 
                    @click="clickMove(moves[0])" 
                    @mouseover="moveInfo(moves[0])">
                    <div>{{moves[0].moveName}}</div></li>
                <li :class="`${moves[1].type.toLowerCase()}-type`"
                    @click="clickMove(moves[1])" 
                    @mouseover="moveInfo(moves[1])">
                    <div>{{moves[1].moveName}}</div></li>
            </ul> 
            <ul>
                <li :class="`${moves[2].type.toLowerCase()}-type`" 
                    @click="clickMove(moves[2])" 
                    @mouseover="moveInfo(moves[2])">
                    <div>{{moves[2].moveName}}</div></li>
                <li :class="`${moves[3].type.toLowerCase()}-type`" 
                    @click="clickMove(moves[3])" 
                    @mouseover="moveInfo(moves[3])">
                    <div>{{moves[3].moveName}}</div></li>
            </ul> 
        </div>
        <div class="move-props">
            <ul>
                <li>type: <span :class="{ 'typing-circle': moveType }">{{moveType}}</span></li>
                <li>power: {{movePower}}</li>
                <li>accuracy: {{moveAcc}}</li>
            </ul>
                <button class="back-btn" @click="goToControlTable">back</button>
            
        </div>
  </section>
</template>

<script>
export default {
    data(){
        return{
            moves: null,
            moveType:'',
            movePower:'',
            moveAcc:'',
        }
    },
    created(){
        this.moves = this.userFrontPoke.moves
        
    },
    computed:{
         userFrontPoke(){
            return this.$store.getters.getUserFront;
        },
    },
    methods:{
        moveInfo(move){
            this.movePower = (move.power) ? move.power : 0;
            this.moveType = move.type;
            this.moveAcc = move.accuracy;
        },
        goToControlTable(){
            this.$emit("menuSwitch",false,0);
        },
        clickMove(move){
            this.$emit("menuSwitch",false,0);
            this.$emit("clickMove",move);
        },
    }
}
</script>

<style lang="scss" scoped>
    .fight-table{
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        border-radius: 0px 0px 4px 4px;
        border: solid 5px #2c3e50;
        position: absolute;
        width: 700px;
        height: 120px;
        background-color: rgb(250, 229, 167);
        box-shadow: 0 15px 30px rgba(0,0,0,.2),
                    0 15px 30px rgba(0,0,0,.2);

        .moves-titles{
            ul{
                list-style: none;
                text-decoration: none;
                text-transform: uppercase;
                display: flex;
                justify-content: space-between;
                height: 50%;
                width: 400px;
            }
            li{
                text-transform: uppercase;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                border:5px solid black;
                background-color: #ddeaa2;
                border-radius: 4px;
                margin: 2px 3px 2px 3px;
                div{
                    
                    color:#384239;
                    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
                    padding: 4px 8px 4px 8px;
                    // background-color: rgba(0,0,0,.7);
                }
            }
            .normal-type{
                border-color: #a8a878;
            }
            .water-type{
                border-color: #6890f0;
            }
            .fire-type{
                border-color: #f08030;
            }
            .grass-type{
                border-color: #78c850;
            }
            .fighting-type{
                border-color: #c03028;
            }
            .flying-type{
                border-color: #a890f0;
            }
            .poison-type{
                border-color: #8e3e8f;
            }
            .rock-type{
                border-color: #b8a038;
            }
            .electric-type{
                border-color: #f8db44;
            }
            .ground-type{
                border-color: #8e5713;
            }
            .psychic-type{
                border-color: #f85888;
            }
            .ice-type{
                border-color: #98d8d8;
            }
            .bug-type{
                border-color: #a8b820;
            }
            .ghost-type{
                border-color: #705898;
            }
            .steel-type{
                border-color: #b8b8d0;
            }
            .dragon-type{
                border-color: #6f38f6;
            }
            .dark-type{
                border-color: #705848;
            }
            .fairy-type{
                border-color: #f8c0b0;
            }
        }
        .move-props{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 0px 25px 0px 15px;
            font-family: 'Courier New', Courier, monospace;
            font-size: 1rem;
            .typing-circle{
                margin: 0 10px 10px 0;
                padding: 5px 10px;
                border-radius: 20px;
                color: #fff;
                font-size: 1rem;
                letter-spacing: 1px;
                text-transform: capitalize;
                word-wrap: none;
                word-break: keep-all;
                background-color: #0a2e50
            }
            ul{
                gap: 10px;
                list-style: none;
                text-decoration: none;
                text-transform: uppercase;
                display: flex;
                
                flex-direction: column;
                li{
                    text-align: left;
                    text-transform: uppercase;
                    cursor: default;
                }
            }
        .back-btn{
            outline: none;
            border: none;
            color: #efefef;
            padding: 10px 10px;
            font-size: 1rem;
            cursor: pointer;
            transition: 0.2s;
            padding: 10px 20px 10px 20px;
            background-color: #2c3e50;
            color: #efefef;
            border-radius: 6px;
        }    
        }
    }
</style>