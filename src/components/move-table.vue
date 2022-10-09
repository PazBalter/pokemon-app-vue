
<template>
  <section class="move-table">
        <div class="instructions-layer">
            <span class="inst-content">instructions</span>
            
        </div>
        <div class="user-options">
            <div @click="fightTableToggle"
                class="move-table-btn">Fight</div>
            <div class="move-table-btn">Pokemons</div>
            <div class="move-table-btn">Tutorial</div>
            <div class="move-table-btn">Quit</div>
        </div>
    <div class="fight-table" v-show="fightTableIsOn">
        adasdasd
    </div>
  </section>
</template>

<script>
export default {
    data(){
        return {
            fightTableIsOn:false,


        }
    },
    methods:{
        fightTableToggle(){
            if(this.fightTableIsOn){
              this.fightTableIsOn = false;  
            }else{
                this.fightTableIsOn = true
            }
        }
    }

}
</script>

<style lang="scss" scoped>
.move-table{
    box-sizing: border-box;
    width: 700px;
    height: 120px;
    background-color: #2c3e50;
    display: flex;
   

    .instructions-layer{
        padding-left:20px;
        width: 100%;
        display: flex;
        align-items:center;

        
        .inst-content{
            text-align: left;
            font-size: 20px;
            color: #efefef;
        }
    }

    .user-options{
        display: grid;
        grid-template-columns: 1fr 1fr;
        box-sizing: border-box;
        border-radius: 5px 0px 5px 5px;
        width: 350px;
        padding: 10px;
        background-color: rgb(250, 229, 167);
        box-shadow: 0 15px 30px rgba(0,0,0,.2),
                    0 15px 30px rgba(0,0,0,.2);
        .move-table-btn{
            display: flex;
            justify-content: center;
            align-content: center;
            outline: none;
            border: none;
            padding: 10px 20px;
            cursor: pointer;

        }
      
    }
      .fight-table{
            background: aqua;
            width: 700px;
            z-index: 10;
        }
}
</style>