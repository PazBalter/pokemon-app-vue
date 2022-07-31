
import {utilService} from '@/services/util.service'
import {statsService} from '@/services/stats.service'
import {movesService} from '@/services/moves.service'

export const pokeService = {
    CreatePokeObject,
    createPokeObjectByLevel,

}
const POKE_URL = 'https://pokeapi.co/api/v2/pokemon/'  

const GEN_4 = 494
const GEM_5 = 649

const POKE_OBJECT = {
    id:0,
    name:'',
    stats:[],
    moves:[],
    types:[]

}

const ALL_POKE_STATS = {
    min:0,
    max:1000,
}



async function CreatePokeObject(id = 0){
    try{
        const pokemon = POKE_OBJECT
        pokemon.id = id === 0 ? utilService.getRandomInt(1,850) : id
        const dataJson = await fetchPokeDataById(pokemon.id)
        pokemon.name = dataJson.name
        pokemon.stats = statsService.CreateStatObject(dataJson.stats)
        // pokemon.moves = movesService.createPokeMoves(dataJson.id,dataJson.moves.length)
        pokemon.moves = await movesService.createPokeMoves(dataJson.moves)
        console.log(pokemon.moves)
        pokemon.types = pokeTypeArray(dataJson.types)
        return pokemon;
    }catch(error){
        console.log(error);  
    } 
}
async function fetchPokeDataById(id){
    try {
        let result = await fetch( POKE_URL + id);
        let data = await result.json();
        return data;
    } catch (error) {
        console.log(error);
    }
  
}
async function createPokeObjectByLevel(level = 0){
    try{
        const baseStat = minMaxLevelStats(level)
        var pokemon = await fetchPokeDataById(utilService.getRandomInt(1,GEN_4))
        var maxBP = statsService.BasePointsummary(pokemon.stats)
        while(maxBP){
            if(maxBP > baseStat.min && maxBP < baseStat.max){
                return PokeObject(pokemon)
            }else{

                var pokemon = await fetchPokeDataById(utilService.getRandomInt(1,GEN_4))
                maxBP = statsService.BasePointsummary(pokemon.stats)
            }
        }
    }catch(error) {
        console.log(error);
    }
  

}

function PokeObject(pokemon){
    const pokeObject = {
        id:pokemon.id,
        name:pokemon.name,
        stats:statsService.CreateStatObject(pokemon.stats),
        moves:movesService.createPokeMoves(pokemon.id,pokemon.moves.length),
        types:pokeTypeArray(pokemon.types)

    }
    return pokeObject
}



function minMaxLevelStats(level){
    var baseStat
    switch(level) {
        case 0:
            baseStat = ALL_POKE_STATS
            break;
        case 1:
            baseStat = {min:0,max:350}
            break;
        case 2:
            baseStat = {min:250,max:400}
            break;
        case 3:
            baseStat = {min:350,max:480}
            break;
        case 4:
            baseStat = {min:400,max:550}
            break;
        case 5:
            baseStat = {min:500,max:650}
            break; 
    }
    return baseStat
}

function pokeTypeArray(typesObj){
    var arrTypesName = typesObj.map(slot => slot.type.name)
    return arrTypesName
}