<template>
    <section class="poke-party">
        <article class="poke-card" v-for="(pokemon ,index) in pokemons"
            :key="'poke'+ index">
            <img :src="imageUrl + pokemon.id+'.png'" width="64" height="64" alt="">
        </article>
        <article class="poke-card" v-for="slots in slots"  :key=slots>
            <img src="@/assets/pokeball.png"  width="64" height="64" alt="">
        </article>
    </section>
</template>

<script>


export default {
    props:[
        // 'myPokemonsUrl',
        'imageUrl',
    ],
    data:()=>{
        return{
            slots: 3,
            pokemons:[], 
            currentUrl:''
        }
    },
    created(){
        this.pokemons = this.getMyPokemons()
        this.checkSlots()
       
    },
    mounted(){
        // this.checkSlots()      
    },
    methods:{
        getMyPokemons() {
            return this.$store.getters.getMyPokemons;
        },
        checkSlots(){
           this.slots -= this.pokemons.length
        },
        // fetchData(){
        //     this.pokemons = this.getMyPokemons()
        //     if(this.myPokemonsUrl){ 
        //     this.myPokemonsUrl.forEach(pokemonUrl => {
        //         let req = new Request(pokemonUrl);
        //         fetch(req)
        //             .then((res) =>{
        //                 if(res.status === 200)
        //                 return res.json();
        //             })
        //             .then((data) => {
        //                 this.pokemons.push(data);
        //             })
        //             .catch((error) =>{
        //             console.log(error);
        //             })  
        //         });
        //     }   
        // },
    }
}
</script>

<style lang="scss" scoped>

</style>
