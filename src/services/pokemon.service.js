
import {utilService} from '@/services/util.service'
import {statsService} from '@/services/stats.service'
import {movesService} from '@/services/moves.service'

export const pokeService = {
    CreatePokeObject,
    createPokeObjectByLevel,

}
const POKE_URL = 'https://pokeapi.co/api/v2/pokemon/'  

const GEN_4 = 494
const GEN_5 = 649

const ALL_POKE_STATS = {
    min:0,
    max:1000,
}



async function CreatePokeObject(id = 0){
    try{
        const pokemon =  {
            id:0,
            name:'',
            stats:[],
            moves:[],
            types:[],
            height:0,
        }
        pokemon.id = id === 0 ? utilService.getRandomInt(1,850) : id
        let dataJson = await fetchPokeDataById(pokemon.id)
        pokemon.name = dataJson.name
        pokemon.stats = statsService.CreateStatObject(dataJson.stats)
        pokemon.moves = await movesService.createPokeMoves(dataJson.moves)
        pokemon.types = pokeTypeArray(dataJson.types)
        pokemon.height = dataJson.height
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
                const pokeObj = await PokeObject(pokemon)
                console.log('pokeObj: ',pokeObj )
                return pokeObj
            }else{
                pokemon = await fetchPokeDataById(utilService.getRandomInt(1,GEN_4))
                maxBP = statsService.BasePointsummary(pokemon.stats)
            }
        }
    }catch(error) {
        console.log(error);
    }
  

}

async function PokeObject(pokemon){
    let pokeObject = {
        id:pokemon.id,
        name:pokemon.name,
        stats: statsService.CreateStatObject(pokemon.stats),
        moves: await movesService.createPokeMoves(pokemon.moves),
        types:pokeTypeArray(pokemon.types),
        height: pokemon.height
    }
    console.log('pokeObject.moves: ',pokeObject.moves)
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
    const arrTypesName = typesObj.map(slot => slot.type.name)
    return arrTypesName
}