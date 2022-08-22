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
        <GameInst @startGame="startGame"/>
    </div>
  
    
    </section>
</template>

<script>

import NavBar from '@/components/nav-bar.vue'
import BattleArena from '@/components/battle-arena.vue'
import GameInst from '@/components/game-inst.vue'

export default {
    name: 'Arena', 
    components:{
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
            gameIsOn: false,
        }
    },
    created(){
        this.apiUrl= this.getApiUrl()
        this.imageUrl = this.getImageUrl()
        this.pokeMovesUrl = this.getPokeMovesUrl()
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
        startGame(){
            this.gameIsOn = true
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