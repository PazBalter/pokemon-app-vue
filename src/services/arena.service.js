import { utilService } from "@/services/util.service";
import { damageService } from "./damage.service";

export const arenaService = {
    isUserIsFaster,
    userTurn,
    botTurn,
    botBestSwitch,
    botBestMove,
    isTherePokeLeft,
    userAtkDmg,
    calcAtkDmg,
    delayAction,
  
};

function isUserIsFaster(userPoke,botPoke){
    if(userPoke.stats[5].points>botPoke.stats[5].points){
        return true
    }
    return false
}
function gameAlgorithm(userPoke,botPoke,move){
    if(typeof move !== 'number'){
        const [first , second] = arenaService.speedCheck(userPoke,botPoke)   
    }else{
        const second = botPoke
    }
}

async function userTurn(move,userPoke,botPoke){
    try {
        const damage = await damageService.createDamageObj(move,userPoke,botPoke)
     
        if(damage>botPoke.stats[0].points){
            botPoke.stats[0].points = 0
       
        }else{
            botPoke.stats[0].points = botPoke.stats[0].points - damage;
        
        }
     
        return botPoke
    } catch (error) {
        
    }  
}
async function botTurn(userPoke,botPoke){
    try {
        let move = await botBestMove(botPoke,userPoke)
        const damage = await damageService.createDamageObj(move,botPoke,userPoke)
  
        if(damage>userPoke.stats[0].points){
            userPoke.stats[0].points = 0
        
        }else{
            userPoke.stats[0].points = userPoke.stats[0].points - damage;
          
        }
  
        return userPoke
    } catch (error) {
        
    }  
}

async function botBestMove(botPoke,userPoke){
    try {
        // const defenderTypes = userPoke.types
        const arrDmgRel = await Promise.all( botPoke.moves.map( async (move) => {
            return await damageService.damageRelations( move.type,userPoke.types)

        }))
        const max = Math.max(...arrDmgRel);
        const index = arrDmgRel.indexOf(max);
       
        return botPoke.moves[index]
    } catch (error) {
        console.log(error)
    }
}
function botBestSwitch(userPokeTypes,botPoke){
    userPokeTypes.forEach(type => {
        
    });
    return dmgTypeNum
}
function isTherePokeLeft(pokemon){
    return pokemon.stats[0].points > 0
}
async function userAtkDmg(move,userPoke,botPoke){
    try {
        const damageObj = await damageService.createDamageObj(move,userPoke,botPoke)
        return damageObj
    } catch (error) {
        console.log(error)
    }  
}
async function calcAtkDmg(move,attacker,defender){
    try {
        console.log(move)
        const damageObj = await damageService.createDamageObj(move,attacker,defender)
        return damageObj
    } catch (error) {
        console.log(error)
    }  
}
function delayAction(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }