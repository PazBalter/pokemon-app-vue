<template>
    <section class="inst-container">
        <h2 class="inst-title"> Welcome To The Battle Arena</h2>
        <h2 class="inst-details">Choose your 3 pokemons party from the full Pokedex and Battle trainers in the Arena</h2>
        <!-- <h1> My Pokemons:</h1> -->
        <div class="party-team-container">
            <div class="poke-box">
                <div class="center-box">
                    <div class="team-slot"
                    v-for="(pokemon, index) in pokemons" :key= index>
                    <PokeCard :pokemon="pokemon"/>
                    </div>
                    <div class="party-slots" v-for="slot in slots" :key="slot">
                        <img src="@/assets/questionmark.jpeg" height="250" width="214" />
                        <div class="slot-poke-name" >Empty</div>
                    </div>
                </div>
            </div>
            <button class="green-btn" @click="toggleGame">lets go</button>
            
        </div>
    </section>
</template>
<script>
import EndbattleMenu from '@/components/end-battle-menu.vue' 
import PokeCard from '@/components/poke-card.vue'
export default {
    components:{
        EndbattleMenu,
        PokeCard
    },
    data() {
        return {
        cardUrl:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/",
        // slots: 3,
        };
    },
    computed: {
        pokemons() {
        return this.$store.getters.getMyPokemons;
        },
        slots(){
        return this.$store.getters.getSlots;
    },
    },
    methods:{
        getPokemonsLength(){
            return this.$store.getter.getMyPokemonsLen;
        },
        toggleGame(){
            if(this.slots <= 0){
            this.$emit("toggleGame");
            }else{
                // console.log(this.getPokemonsLength)
                console.log("Party must be full")
                console.log("party slots:", this.slots)
            }
           
        }
    }
    
}
</script>
<style lang="scss" scoped>
.inst-title{
    margin-top: 40px;
    color: #f2f2f2;
    font-size: 40px;
    margin-bottom: 40px;
}
.inst-details{
    color: #f2f2f2;
    font-size: 20px;
    margin-bottom: 20px;
    link{
        text-decoration: none;
        color: red;
    }
}
.poke-box{
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    .center-box{
        height: 299px;
      display: flex; 
       gap:20px; 
       background: grey;
       padding: 20px;
       border: 4px  red;
       border-style: ridge;
    }
    .party-slots{

        background-color: #ffffff;
    }
    .team-slot{   
        .slot-poke-name{

            background-color: #ffffff; 
        }
        .slot-poke-pic{
            background-color: #ffffff;              
        }
    }
   
}
.green-btn{

    height: 38px;
    outline:none;
    border:none;
    border-radius: 5px;
    background-color:#01a25a ;
    color: #efefef;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    transition: .2s;

    &:hover{
        background-color: #00cc71;
    }      
}
</style>