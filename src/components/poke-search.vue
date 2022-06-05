<template>
    <section class="poke-search">
        <form @submit.prevent="setPokemonUrl">
            <input type="text" v-model="searchValue">
        </form>
        <button class="search-button" @click="setPokemonUrl">Search</button>
    </section>   
</template>
<script>

export default {
   props:[
       'apiUrl'
   ],
   data:() => {
       return{
           searchValue: '',
       }
   },
   methods:{
       setPokemonUrl(url){
           if(this.searchValue !== ''){
            //    console.log(this.apiUrl + this.searchValue);
               this.$emit('setPokemonUrl',this.apiUrl + this.searchValue.toLowerCase())
           }
       }
   }
}
</script>
<style lang="scss" scoped>
  
    .poke-search{
       
        display: flex;
        justify-content: center;
        position: relative;
        width: 100%;
        // max-width: 510px;
        // padding-bottom: 20px;
        
       
     
        input{
            border: none;
            outline: none;
            border-radius: 5px 0 0 5px;
            padding: 10px 40px 10px 10px;
            width: calc(100% - 50px);
            font-size: 1rem;
            
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

    }
</style>


