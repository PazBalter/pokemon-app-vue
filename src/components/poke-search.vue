<template>
    <section class="poke-search">
        <div class="search-warper">
            <form @submit.prevent="setPokemonUrl">
                <input
                 :style="{'border-bottom-left-radius': dropdownOn() +'px'}"
                 type="text" v-model="searchValue">
                <div v-if="pokeOptions" class="dropdown-search">
                    <div class="names-buttons"
                        v-for="(value, index) in pokeSearchArr"
                        :key="'value'+index"
                        @click="clickName(pokeSearchArr[index])">
                        {{pokeSearchArr[index]}}
                    </div>
                </div>
            </form>
            <button class="search-button" @click="setPokemonUrl">Search</button>
        </div>
       
    </section>   
</template>
<script>

import _ from 'lodash'

export default {
    props:[
        'apiUrl'
    ],
    data:() => {
        return{
            searchValue: '',
            nextUrl:'',
            pokeSearchArr:[],
            currentUrl:'',
            pokeOptions:null,
            clickedPoke:null
        }
    },
    watch:{
        searchValue(){
            this.pokeOptions = null;
            this.pokeSearchArr = [];
            if(this.searchValue !== '' && this.searchValue.toLowerCase() !== this.clickedPoke ){
                this.searchPokeByName()
            }else{
                this.pokeOptions = null;
                this.pokeSearchArr = [];
                return ;
            }
        }   
    },
    methods:{
        dropdownOn(){
            return(this.pokeOptions? 0 : 3 )
        },
        clickName(pokeName){
            this.clickedPoke = pokeName
            this.searchValue = pokeName[0].toUpperCase()+pokeName.slice(1,pokeName.length)
            this.setPokemonUrl()
        },
        searchPokeByName:_.debounce(function(){
            if(this.searchValue !== ''){
                this.moreSearch()
                this.pokeOptions = true
            }else{
                this.pokeOptions = null
            }
        }, 1000),
        moreSearch(){
            this.currentUrl = this.apiUrl
            this.fetchThisData() 
            return this.pokeSearchArr 
        },
        // async fetchNewData(){
        //     try {
        //         let result = await fetch(this.currentUrl);
        //         let data = await result.json();
        //         data.results
        //     } catch (error) {
                
        //     }
          
        // },
        fetchThisData(){
            let req = new Request(this.currentUrl);
             fetch(req)
            .then((res) =>{
                if(res.status === 200)
                return res.json();
            })
            .then((data) => {
                this.nextUrl = data.next;
                data.results.forEach(pokemon => { 
                    if(pokemon.name.substring(0,this.searchValue.length).includes(this.searchValue.toLowerCase())){
                    
                        if(this.pokeSearchArr.length < 7){
                            this.pokeSearchArr.push(pokemon.name)
                        }else{
                        console.log('stop-me') 
                        } 
                    }
                }); 
            })
            .catch((error) =>{
                console.log(error);
            }) 
            .then(()=>{
                if(this.pokeSearchArr.length < 7){
                  this.next()  
                }else{
                    // console.log(this.pokeSearchArr)
                }
            })
           
        },
        setPokemonUrl(){
            if(this.searchValue !== ''){
                this.$emit('setPokemonUrl',this.apiUrl + this.searchValue.toLowerCase())
            }
        },
        next(){
            const pokeNum = this.nextUrl.split('offset=')[1].split('&')[0]
            if(pokeNum>850){
                return console.log('done')
            }
            this.currentUrl = this.nextUrl; 
            this.fetchThisData();
        },
    }
}
</script>
<style lang="scss" scoped>
  
    .poke-search{
       
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        flex-direction: column;
       
        // max-width: 510px;
        
        
        form{
            width: 300px;
        }
        .search-warper{
            display: flex;
            align-items: center;
            align-content: center;
            justify-content: center;
        }
        input{
            border: none;
            outline: none;
            border-radius: 5px 0 0 5px;
            padding: 10px 40px 10px 10px;
            width: calc(100% - 50px);
            font-size: 1rem;
            background-color: #efefef;
            
        }

        .search-button{
           
            outline:none;
            border:none;
            border-radius: 0 5px 5px 0;
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
        .dropdown-search{
            font-size: 1rem;
            box-sizing: border-box;
            display: grid;
            width: inherit;
            max-width: inherit;
            grid-template-columns: 1fr;
            position: absolute;
            // height: 300px;
            background-color: #efefef;
            
            border-top: 0px;
            // padding: 10px ;
            border-radius: 0px 0px 5px 5px;
            box-shadow: 0 15px 10px rgba(0,0,0,.2),
                        0 15px 20px rgba(0,0,0,.2);
            .names-buttons{
                text-align: left;
                text-transform: capitalize;
                padding: 10px 0px 10px 10px;
                transition: .2s;
                cursor: pointer;
                &:hover{
                    background-color: #d6d3d3;
                  

                }
            }
        }

    }
</style>


