
import {utilService} from '@/services/util.service'
import {pokeService} from '@/services/pokemon.service'


export const trainerService = {
    CreateTrainer,
}

// const TRAINER = {
//     difficulty: 0,
//     pokemons:[],
// }

async function CreateTrainer(level = 0){
    try{
        const trainer = {
            difficulty: level,
            pokemons: await trainerPokeTeam(level),
        }
        return trainer
    }catch(error){
        console.log(error)
    }
}
async function trainerPokeTeam(level){
    try {
        const pokeTeam = []
        while(pokeTeam.length < 3){
            pokeTeam.push( await pokeService.createPokeObjectByLevel(level))
        }  
        return pokeTeam
    } catch (error) {
        
    }
    

}