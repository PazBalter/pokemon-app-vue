import { utilService } from "@/services/util.service";

export const movesService = {
  createPokeMoves,
  getApiMoveById,
};

const POKE_API_URL = "https://pokeapi.co/api/v2/pokemon/";
const POKE_MOVE_URL = "https://pokeapi.co/api/v2/move/";


async function createPokeMoves(allPokeMoves){
  try {
    const pokeMoves =  [
      {moveName: "", type: "", power: null, accuracy: null},
      {moveName: "", type: "", power: null, accuracy: null},
      {moveName: "", type: "", power: null, accuracy: null},
      {moveName: "", type: "", power: null, accuracy: null}
    ]
    const movesLen = allPokeMoves.length
  if(movesLen < 4){
    pokeMoves[0].moveName = allPokeMoves[0].move.name
    pokeMoves[0].type = "normal"
    return pokeMoves 
  }else{
    const arrId = utilService.GenrateArrUniqeNum(movesLen);
      pokeMoves.forEach((move,index) => {
        move.moveName = allPokeMoves[arrId[index]].move.name
    })
    const [moveProps1,moveProps2,moveProps3,moveProps4] =
    await Promise.all([
      getMovePropertiesByName(pokeMoves[0].moveName),
      getMovePropertiesByName(pokeMoves[1].moveName),
      getMovePropertiesByName(pokeMoves[2].moveName),
      getMovePropertiesByName(pokeMoves[3].moveName)])

      pokeMoves[0] = moveProps1 
      pokeMoves[1] = moveProps2
      pokeMoves[2] = moveProps3
      pokeMoves[3] = moveProps4

      console.log('pokeMoves[0]: ',pokeMoves[0])
      return pokeMoves
  }
  } catch (error) {
    console.log(error)
    
  }
  
}
async function getMovePropertiesByName(move){
  try {
    let result = await fetch(POKE_MOVE_URL + move);
    let data = await result.json();
    let moveProps = {
      moveName: move ,
      type: data.type.name,
      power: data.power,
      accuracy: data.accuracy
    }
    // console.log('moveProps: ',moveProps)
    return moveProps
  } catch (error) {
    console.log(error)
  }
}

async function getApiMoveById(id){
  try {
    let result = await fetch(POKE_MOVE_URL + id);
    let data = await result.json();
    // console.log(data)
    return data;
  } catch (error) { 
    console.log(error)
  }
}


async function fetchData(id) {
  let req = new Request(POKE_API_URL + id);
  fetch(req)
    .then((res) => {
      if (res.status === 200) return res.json();
    })
    .then((pokemon) => {
      console.log("from service:", pokemon.moves.length);
      return pokemon.moves.length;
    })
    .catch((error) => {
      console.log(error);
    });
}

