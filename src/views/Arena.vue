<template>
    <section class="arena-section">
    <NavBar
    :key="partyReload"
    @togglePartySlots="togglePartySlots"
    @spliceFromParty="spliceFromParty"
    :imageUrl="imageUrl"
    />
    <BattleArena
    :imageUrl="imageUrl"
    :apiUrl="apiUrl"
    :pokeMovesUrl="pokeMovesUrl"
    />
    </section>
</template>

<script>

import NavBar from '@/components/nav-bar.vue'
import BattleArena from '@/components/battle-arena.vue'
export default {
    name: 'Arena', 
    components:{
        NavBar,
        BattleArena,

    },
    data(){
        return{
            partyReload:0,  
            imageUrl:'',
            apiUrl:'',
            pokeMovesUrl:''
        }
    },
    created(){
        this.apiUrl= this.getApiUrl()
        this.imageUrl = this.getImageUrl()
        this.pokeMovesUrl = this.getPokeMovesUrl()
        this.partyCmpReload()
        // console.log(this.pokeMovesUrl+'7/')
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
        partyCmpReload(){
            this.partyReload++;
        },
        togglePartySlots(slots){
            if(slots === 0 ){
                this.partySlots = false;  
            }else{
                this.partySlots = true;  
            }
            // console.log("homeview closefunc",this.partySlots)
        },
        spliceFromParty(index){
            this.$store.commit({ type: "spliceIndexFromParty", index });
            this.partyCmpReload()
        },
    },
}
</script>

<style lang="scss" scoped>
.arena-section{
    height: 100vh;

}
</style>