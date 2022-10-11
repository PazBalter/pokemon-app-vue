<template>
  <section class="fight-table">
        <div class="moves-titles">
           <ul>
                <li @mouseover="moveInfo(moves[0])">{{moves[0].moveName}}</li>
                <li @mouseover="moveInfo(moves[1])">{{moves[1].moveName}}</li>
            </ul> 
            <ul>
                <li @mouseover="moveInfo(moves[2])">{{moves[2].moveName}}</li>
                <li @mouseover="moveInfo(moves[3])">{{moves[3].moveName}}</li>
            </ul> 
        </div>
        <div class="move-props">
            <ul>
                <li>type:{{moveType}}</li>
                <li>power:{{movePower}}</li>
                <li @click="goToControlTable">back</li>
            </ul>
            
        </div>
  </section>
</template>

<script>
export default {
    data(){
        return{
            moves: null,
            moveType:'',
            movePower:''
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
        },
        goToControlTable(){
            this.$emit("fightTableToggle");
        }
    }
}
</script>

<style lang="scss" scoped>
    .fight-table{
        display: flex;
        flex-direction: row;
        box-sizing: border-box;
        border-radius: 0px 0px 4px 4px;
        border: solid 5px #2c3e50;
        position: absolute;
        width: 445px;
        height: 120px;
        background-color: #efefef;
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
            }
        }
        .move-props{
            width: 100%;
            display: flex;
            justify-content: flex-end;
            ul{
                list-style: none;
                text-decoration: none;
                text-transform: uppercase;
                display: flex;
                flex-direction: column;
                li{
                    text-transform: uppercase;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                }
            }
        }
    }
</style>