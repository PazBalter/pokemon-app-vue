<template>
    <section class="end-battle-menu">
        
        <div>
            <h2>{{battleText}}</h2>
        </div>
        <div class="end-menu-btn-container">
            <button @click="quitGame" class="end-menu-btn added ">QUIT</button>
            <button v-if="battleText === `You Win!`" @click="setNextLevelTrainer" class="end-menu-btn added green-btn">Continue</button>
            <button v-else @click="setNextLevelTrainer" class="end-menu-btn added green-btn">New Game</button>
        </div>
        <div>
            <h2>Stage {{gameLevel}}</h2>
        </div>
       
    </section> 
</template>
<script>
export default {
    data(){
        return{
            text:"You Win!",
        }
    },
    computed:{
        gameLevel() {
            return this.$store.getters.getGameLevel;
        },
        battleText(){
            return this.$store.getters.getBattleText
        },   
    },
    methods:{
        async setNextLevelTrainer(){
            try {
                this.$store.commit({ type: "toggleGame"});
                this.$store.commit({type:"toggleEndGameMenu"})
                this.$store.commit({ type: "setGameLevel"});
                await this.$store.dispatch({type:"restoreTeamHP"})
                await this.$store.dispatch({ type: "setNewOpponent"});
            } catch (error) {
                console.log(error)
            }
        //    this.$store.commit({type: "toggleGame"})
        },
        quitGame(){
           this.$store.commit({ type: "toggleGame"});
           this.$emit("quitGame");
        }
        
    }
}
</script>
<style lang="scss">

.end-battle-menu{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    width: 100%;
    max-width: 350px;
    height: 30vh;
    border:3px #2c3e50 solid;
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 15px 30px rgba(0,0,0,.2),
                0 15px 30px rgba(0,0,0,.2);
    .end-menu-btn-container{
        margin: 30px 0px 30px 0px;
        gap: 20px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .end-menu-btn{
        outline:none;
        border:none;
        border-radius: 5px;
        background-color: #333;
        color: #efefef;
        padding: 10px 20px;
        font-size: 1.2rem;
        cursor: pointer;
        width: 100%;
        max-width: 120px;
    }
    .green-btn{
        background-color: #01a25a;
        color: #efefef;
    } 
}
 
</style>