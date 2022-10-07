<template>
    <section class="arena-section">
    <NavBar
        @togglePartySlots="togglePartySlots"
        @spliceFromParty="spliceFromParty"
        :imageUrl="imageUrl"
    />
    <div class="space-maker"></div>

    <div v-if="gameIsOn" >
        <BattleArena
            :imageUrl="imageUrl"
            :apiUrl="apiUrl"
            :pokeMovesUrl="pokeMovesUrl"
        />
    </div>
    <div v-else>
        <div  v-if="showGameInst" > <GameInst @toggleGame="toggleGame"/></div>
        <div v-else><PulseLoader/></div>
        
    </div>
  
    
    </section>
</template>

<script>

import NavBar from '@/components/nav-bar.vue'
import BattleArena from '@/components/battle-arena.vue'
import GameInst from '@/components/game-inst.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
export default {
    name: 'Arena', 
    components:{
        PulseLoader,
        NavBar,
        BattleArena,
        GameInst,

    },
    data(){
        return{
            partyReload:0,  
            imageUrl:'',
            apiUrl:'',
            pokeMovesUrl:'',
            showGameInst: true,
        }
    },
    created(){
        this.apiUrl= this.getApiUrl()
        this.imageUrl = this.getImageUrl()
        this.pokeMovesUrl = this.getPokeMovesUrl()
    },
    computed:{
        gameIsOn(){
            return this.$store.getters.getGameIsOn
        }
    },
    methods:{
        getApiUrl(){
            return this.$store.getters.getPokeApiUrl;
        },
        getImageUrl(){
            return this.$store.getters.getPokeImageUrl;
        },
        getPokeMovesUrl(){
            return this.$store.getters.getPokeMovesUrl;
        },
        togglePartySlots(slots){
            if(slots === 0 ){
                this.partySlots = false;  
            }else{
                this.partySlots = true;  
            }
        },
        spliceFromParty(index){
            this.$store.commit({ type: "spliceIndexFromParty", index });
            this.partyCmpReload()
        },
        async setNewTrainerByLevel(){
            let level = 1
            await this.$store.dispatch({ type: "setNewOpponent", level });
            // return this.$store.getters.getEnemyTrainer;
        },
        async toggleGame(){
           try {
               this.showGameInst = false
               await this.setNewTrainerByLevel()
           } catch (error) {
            console.log(error)
           }
     
        //    this.$store.commit({type: "toggleGame"})
        }
    },
}
</script>

<style lang="scss" scoped>
.arena-section{
    height: 100vh;
    .space-maker{
        padding-top: 120px ;
    }
}
</style>