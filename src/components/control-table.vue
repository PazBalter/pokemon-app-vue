
<template>
  <section class="move-table">
        <div class="instructions-layer">
                <!-- :replace="replace"
                :replace-interval="1000" -->
            <Typewriter
                :key="battleText"
                class="inst-content"
                :type-interval="25"
            >
                <div>{{battleText}}</div>
            </Typewriter>
            <PartyBag 
                @menuSwitch="menuSwitch"
                v-if="switches[1].val"/>
        </div>
        <div v-if="isUserAction" class="user-options">
            <div @click="menuSwitch(true,0)"
                class="move-table-btn">Fight
            </div>
            <div @click="menuSwitch(true,1)"
                class="move-table-btn">Pokemons
            </div>
            <div class="move-table-btn">Tutorial</div>
            <div class="move-table-btn">Quit</div>
        </div>
    <FightTable 
        @clickMove="clickMove"
        @menuSwitch="menuSwitch"
        v-if="switches[0].val"/>
       
  </section>
</template>

<script>
import FightTable from '@/components/fight-table.vue'
import PartyBag from '@/components/party-bag.vue'
import Typewriter from "typewriter-vue";

export default {
    components:{
        FightTable,
        PartyBag,
        Typewriter
    },
    data(){
        return {
            switches:[
                {name:'fightTable' , val: false},
                {name:'partyBag' , val: false}
            ],
            userAction: true,
            pokeSwitch: false
            // pokemon:null,
        }
    },
   
    watch:{
        // pokeSwitch(){
        //     if(this.isUserSwitch){
        //         this.menuSwitch(true,1)
        //     }
        // },
    },
    computed:{
        isUserSwitch(){
            return this.$store.getters.getIsUserSwitch
        },
        battleText(){
            return this.$store.getters.getBattleText
        },
        userFrontPoke(){
            return this.$store.getters.getUserFront;
        },
        opponentFrontPoke(){
            return this.$store.getters.getOpponentFrontPoke;
        },
        isUserAction(){
            return this.$store.getters.getIsUserAction
        }
    },
    methods:{
        menuSwitch(value,i){
            if(this.userFrontPoke.isFaint && i === 0){
                this.$store.dispatch({ type: "pokemonCantFight", pokemon:this.userFrontPoke})
            }else{
                this.switches.forEach((toggle,index) => {
                if(index === i){
                    console.log(value)
                    toggle.val = value
                }else{
                    toggle.val = false 
                }

            })
            }
            
            console.log('this.switches: ',this.switches)
        },
        async clickMove(move){
            try {
                // this.userAction = false
                this.$store.dispatch({ type: "battleRound", move})
            } catch (error) {
                console.log(error)
            }
           
        },
        
    },
        

}
</script>

<style lang="scss" scoped>
.move-table{
    box-sizing: border-box;
    width: 700px;
    height: 120px;
    background-color: #efefef;
    display: flex;
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    border-radius: 0px 0px 4px 4px;
    border: solid 5px #2c3e50;
    // position: absolute;
    width: 700px;
    height: 120px;
   
    .instructions-layer{
        width: 100%;
        display: flex;
        align-items:center;
      

        .inst-content{
            padding-left:20px;
            text-align: left;
            font-size: 20px;
            color: #2c3e50;
        }
    }

    .user-options{
        display: grid;
        grid-template-columns: 1fr 1fr;
        box-sizing: border-box;
        border-radius: 5px 0px 0px 5px;
        width: 350px;
        // padding: 10px;
        background-color: #2c3e50;
        box-shadow: 0 15px 30px rgba(0,0,0,.2),
                    0 15px 30px rgba(0,0,0,.2);
        .move-table-btn{
            font-family: bold;
            color: #efefef;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            outline: none;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            transition: 0.1s;
            &:hover{
                background-color: #2d5f91;
                color:  rgb(247, 197, 48);
            }
        }
    }

    
}
</style>