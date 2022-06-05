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
                <div class="property">
                    <div class="left">Height</div>
                    <div class="right">{{pokemon.height/10}} m</div>
                </div>
                <div class="property">
                    <div class="left">Weight</div>
                    <div class="right">{{pokemon.weight/10}} kg</div>
                </div>
                <h3>Pokemon Type</h3>
                <div class="types">
                    <div class="type"
                        v-for="(value, index) in pokemon.types"
                        :key="'value'+index">{{value.type.name}}
                    </div>
                </div>
            </div>
            <h2 v-else>The pokemon was not found</h2>
            <button class="detail-btn party" @click="addParty">Add Pokemon</button>  
            <button class="detail-btn" @click="closeDetail">Close</button>  
            
    
        </div>
        <div class="loader-pos" v-if="!show"><PulseLoader/></div>
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
        let req = new Request(this.pokemonUrl);
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
        },
        closeDetail(){
            this.$emit('closeDetail');
        },
        addParty(){
            this.$emit("addParty",this.pokemon)
        }
    },
  
}
</script>

<style lang="scss">
.poke-detail{
    display: flex;
    justify-content: center;
    align-items: center;
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
        padding: 85px 0 0;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 15px 30px rgba(0,0,0,.2) ,
                    0 15px 30px rgba(0,0,0,.2);

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

        h2{
            text-transform: capitalize;
            margin-bottom: 20px;
        }

        .data{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-direction: column;
            width: 100%;
            margin-bottom: 40px;
            .property{
                width: 90%;
                max-width: 400px;
                border-bottom: 1px solid #ccc;
                margin-bottom: 10px;
                .left{
                    float: left;
                }
                .right{
                    float: right;
                }

            }
        }
        h3{
            width: 90%;
            max-width: 400px;
            border-bottom: 1px solid #ccc;
            margin: 10px 0 10px 0;
            text-align: left;
            color: #222;
        }

        .types{
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            width: 90%;
            max-width: 400px;

            .type{
                margin: 0 10px 10px 0;
                padding: 5px 10px;
                border-radius: 20px;
                color: #fff;
                font-size: 1rem;
                letter-spacing: 1px;
                text-transform: capitalize;
                word-wrap: none;
                word-break: keep-all;
            }
            .type{background-color: #0a2e50;}
        }
        
        .detail-btn{
            outline:none;
            border:none;
            border-radius: 5px;
            background-color: #333;
            color: #efefef;
            padding: 10px 20px;
            margin-bottom: 20px;
            font-size: 1.2rem;
            cursor: pointer;
        }
          .party{
                background-color: #ffe600;
                color: #333;
            }
    }
}
</style>