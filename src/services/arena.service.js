import { utilService } from "@/services/util.service";
import { damageService } from "./damage.service";

export const arenaService = {
    isUserIsFaster,
    userTurn,
    botTrun
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
        const damage = await damageService.calcDamage(move,userPoke,botPoke)
        console.log('arena-damage: ',damage)
        if(damage>botPoke.stats[0].points){
            botPoke.stats[0].points = 0
            console.log('Kill botPoke.stats[0].points: ',botPoke.stats[0].points)
        }else{
            botPoke.stats[0].points = botPoke.stats[0].points - damage;
            console.log('Hit botPoke.stats[0].points: ',botPoke.stats[0].points)
        }
        console.log('arena botPoke: ', botPoke)
        return botPoke
    } catch (error) {
        
    }  
}
async function botTrun(userPoke,botPoke){
    try {
       
        let move = await botBestMove(botPoke,userPoke)
        const damage = await damageService.calcDamage(move,botPoke,userPoke)
        console.log('arena-damage: ',damage)
        if(damage>userPoke.stats[0].points){
            userPoke.stats[0].points = 0
            console.log('Kill userPoke.stats[0].points: ',botPoke.stats[0].points)
        }else{
            userPoke.stats[0].points = userPoke.stats[0].points - damage;
            console.log('Hit userPoke.stats[0].points: ',botPoke.stats[0].points)
        }
        console.log('arena botPoke: ', botPoke)
        return botPoke
    } catch (error) {
        
    }  
}

async function botBestMove(botPoke,userPoke){
    try {
        const defenderTypes = userPoke.type
        console.log(defenderTypes)
        damageService.damageRelations( botPoke.moves[0].type,userPoke.type)
      
    } catch (error) {
        
    }
}