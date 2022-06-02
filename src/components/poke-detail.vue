<template>
    <section class="poke-detail" >
        <div class="poke-prev" v-if="show">
            <div v-if="pokemon" class="poke-img">
                <img :src="imageUrl + pokemon.id + '.png'" alt="">
            </div>
            <div v-if="pokemon" class="data">
                <h2>{{pokemon.name}}</h2>
                <div class="property">
                    <div class="left">Base Experience</div>
                    <div class="right">{{pokemon.base_experience}} XP</div>

                </div>
            </div>
        </div>
        <PulseLoader/>
    </section>
    
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default{
    props:[
        'pokemonUrl',
        'imageUrl'
    ],
    components:{
        PulseLoader
    },
    data:()=>{
        return{
           show: false,
           pokemon: {} 
        }
    },
    created(){
        this.fetchData()
    },
    methods:{
        fetchData(){
            
        let req = new Request(this.imageUrl);
        fetch(req)
            .then((res) =>{
                if(res.status === 200)
                return res.json();
            })
            .then((data) => {
                this.pokemon = data;
                this.show = true;
            })
            .catch((error) =>{
            console.log(error);
            })  
        }
    },
  
}
</script>

<style lang="scss">
.poke-detail{
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    padding: 90px 10px 10px;
    width:  calc(100% - 20px);
    height: calc(100vh - 20px);
    background: rgba($color: #000000, $alpha: .7);
    .poke-prev{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: relative;
        width: 100%;
        max-width: 510px;
        background-color: #fff;
        border-radius: 5px;

        .poke-img{
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: -60px;
            width: 120px;
            height: 120px;
            background-color:#333;
            border-radius: 50%;
            overflow: hidden;
            box-shadow: 0 15px 30px rgba(0,0,0,.2) ,
                        0 15px 30px rgba(0,0,0,.2);
        }
    }
}
</style>