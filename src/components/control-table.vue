
<template>
  <section class="move-table">
        <div class="instructions-layer">
           
            <span class="inst-content">instructions</span>
            <PartyBag
                v-if="toggles.partyBag"/>
        </div>
        <div class="user-options">
            <div @click="menuSwitch({num:1 , val: true})"
                class="move-table-btn">Fight</div>
            <div @click="menuSwitch({num:2 , val: true})"
                class="move-table-btn">Pokemons</div>
            <div class="move-table-btn">Tutorial</div>
            <div class="move-table-btn">Quit</div>
        </div>
    <FightTable 
        
        v-if="toggles.fightTable"/>
       
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
            toggles:{
                fightTable:false,
                partyBag:false,
            },
         
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
        menuSwitch(toggle){
            console.log(toggle.num)
          switch (toggle.num) {
            case value:1
                this.toggles.FightTable = toggle.val
                break;
            case value:2
                this.toggles.FightTable = toggle.val
                break;
            case value:3
                this.toggles.FightTable = toggle.val
                break;
            case value:4
                this.toggles.FightTable = toggle.val
                break;
          
            default:
                break;
          }
        },
        // partyBagToggle(){
        //     if(this.partyBagIsOn){
        //         this.partyBagIsOn = false;  
        //     }else{
        //         this.partyBagIsOn = true;
        //     }
        // }
    }

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
        padding-left:20px;
        width: 100%;
        display: flex;
        align-items:center;

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