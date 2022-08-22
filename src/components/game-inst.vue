<template>
    <section class="inst-container">
        <h2 class="inst-title"> Welcome To The Battle Arena</h2>
        <h2 class="inst-details">Instructions comes here</h2>
        <h1> My Pokemons:</h1>
        <div class="party-team-container">
            <div class="poke-box">
                <div class="center-box">
                    <div class="team-slot"
                    v-for="(pokemon, index) in pokemons" :key= index>
                        <div class="slot-light"></div>
                        <div class="slot-poke-pic">
                            <img
                                class="party-poke-img"
                                :src="cardUrl + pokemon.id + '.png'"
                                width="140"
                                height="140"
                                />
                        </div>
                        <div class="slot-poke-name">{{pokemon.name}}</div>
                    </div>
                    <div class="team-slot"
                    v-for="(pokemon, index) in pokemons" :key= index>
                        <div class="slot-light"></div>
                        <div class="slot-poke-pic">
                            <img
                                class="party-poke-img"
                                :src="cardUrl + pokemon.id + '.png'"
                                width="140"
                                height="140"
                                />
                        </div>
                        <div class="slot-poke-name">{{pokemon.name}}</div>
                    </div>
                </div>
            </div>
            <button @click="startGame">lets go</button>
        </div>
    </section>
</template>
<script>
export default {
    data() {
        return {
        cardUrl:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/",
        slots: 3,
        };
    },
    computed: {
        pokemons() {
        return this.$store.getters.getMyPokemons;
        },
    },
    methods:{
        startGame(){
            if(pokemons.length >= 3){
            this.$emit("startGame", true);
            }else{
                console.log("Party must be full")
            }
           
        }
    }
    
}
</script>
<style lang="scss" scoped>
.poke-box{
    display: flex;
    justify-content: center;
    .center-box{
      display: flex; 
       gap:20px; 
       background: grey;
       padding: 20px;
       border: 4px  red;
       border-style: ridge;
    }
    .team-slot{

        .slot-poke-name{
        background: lavender;  
        }
        .slot-poke-pic{
    
            background: lavender;
            
        }
    }
}
</style>