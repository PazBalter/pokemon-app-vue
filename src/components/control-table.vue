
<template>
  <section class="move-table">
        <div class="instructions-layer">
            
            <span class="inst-content">instructions</span>
            <PartyBag
                @menuSwitch="menuSwitch"
                v-if="switches[1].val"/>
        </div>
        <div class="user-options">
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
        @menuSwitch="menuSwitch"
        v-if="switches[0].val"/>
       
  </section>
</template>

<script>
import FightTable from '@/components/fight-table.vue'
import PartyBag from '@/components/party-bag.vue'

export default {
    components:{
        FightTable,
        PartyBag
    },
    data(){
        return {
            switches:[
                {name:'fightTable' , val: false},
                {name:'partyBag' , val: false}
            ],
         
            pokemon:null,
        }
    },
    watch:{
        pokemon(){
            
        }
    },
    computed:{
        userFrontPoke(){
            return this.$store.getters.getUserFront;
        },
    },
    methods:{
        menuSwitch(value,i){
            this.switches.forEach((toggle,index) => {
                if(index === i){
                    console.log(value)
                    toggle.val = value
                }else{
                    toggle.val = false 
                }

            })
            console.log('this.switches: ',this.switches)
        }
    },
        // partyBagToggle(){
        //     if(this.partyBagIsOn){
        //         this.partyBagIsOn = false;  
        //     }else{
        //         this.partyBagIsOn = true;
        //     }
        // }
        // }

}
</script>

<style lang="scss" scoped>
.move-table{
    box-sizing: border-box;
    width: 700px;
    height: 120px;
    background-color: #2c3e50;
    display: flex;
   
    .instructions-layer{
        
        width: 100%;
        display: flex;
        align-items:center;
        span{
            padding-left:20px;
        }

        .inst-content{
            text-align: left;
            font-size: 20px;
            color: #efefef;
        }
    }

    .user-options{
        display: grid;
        grid-template-columns: 1fr 1fr;
        box-sizing: border-box;
        border-radius: 5px 0px 5px 5px;
        width: 350px;
        padding: 10px;
        background-color: rgb(250, 229, 167);
        box-shadow: 0 15px 30px rgba(0,0,0,.2),
                    0 15px 30px rgba(0,0,0,.2);
        .move-table-btn{
            display: flex;
            justify-content: center;
            align-content: center;
            outline: none;
            border: none;
            padding: 10px 20px;
            cursor: pointer;

        }
    }

    
}
</style>