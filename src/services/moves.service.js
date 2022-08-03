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
      {moveName: '', type:""},
      {moveName: '', type:""},
      {moveName: '', type:""},
      {moveName: '', type:""}
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
    const [type1,type2,type3,type4] =
    await Promise.all([
      getMoveTypeByName(pokeMoves[0].moveName),
      getMoveTypeByName(pokeMoves[1].moveName),
      getMoveTypeByName(pokeMoves[2].moveName),
      getMoveTypeByName(pokeMoves[3].moveName)])

      pokeMoves[0].type = type1 
      pokeMoves[1].type = type2
      pokeMoves[2].type = type3
      pokeMoves[3].type = type4

      return pokeMoves
  }
  } catch (error) {
    console.log(error)
    
  }
  
}
async function getMoveTypeByName(moveName){
  try {
    let result = await fetch(POKE_MOVE_URL + moveName);
    let data = await result.json();
    return data.type.name
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

