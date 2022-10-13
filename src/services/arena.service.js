import { utilService } from "@/services/util.service";
import { damageService } from "./damage.service";

export const arenaService = {
    isUserIsFaster,
    userTurn
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
        const damage = damageService.calcDamage(move,userPoke,botPoke)
        console.log('arena-damage: ',damage)
        if(damage>botPoke.stats[0].points){
            botPoke.stats[0].points = 0
            console.log('true botPoke.stats[0].points: ',botPoke.stats[0].points)
        }else{
            botPoke.stats[0].points = botPoke.stats[0].points - damage;
            console.log('false botPoke.stats[0].points: ',botPoke.stats[0].points)
        }
        console.log('arena botPoke: ', botPoke)
        return botPoke
    } catch (error) {
        
    }  
}