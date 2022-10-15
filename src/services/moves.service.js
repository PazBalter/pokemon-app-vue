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
      {moveName: "", type: "",id: null, power: null, accuracy: null},
      {moveName: "", type: "",id: null, power: null, accuracy: null},
      {moveName: "", type: "",id: null, power: null, accuracy: null},
      {moveName: "", type: "",id: null, power: null, accuracy: null}
    ]
    const movesLen = allPokeMoves.length
  if(movesLen < 4){
    pokeMoves[0].moveName = allPokeMoves[0].move.name
    pokeMoves[0].type = "normal"
    pokeMoves.forEach((move)=>{
      move.moveName = "headbutt" ,
      move.id =  29,
      move.type = "normal",
      move.power = 70,
      move.accuracy = 100
    });
    return pokeMoves 
  }else{
    const powerArrMoves = await getPowerArrMoves(allPokeMoves)
    
    const arrId = utilService.GenrateArrUniqeNum(powerArrMoves.length);
    // pokeMoves.forEach((move,index) => {
    //   move.moveName = powerArrMoves[arrId[index]].move.name
    // })
    // const [moveProps1,moveProps2,moveProps3,moveProps4] =
    // await Promise.all([
    //   generateMoveObj(powerArrMoves[arrId[index]]),
    //   generateMoveObj(powerArrMoves[arrId[index]]),
    //   generateMoveObj(powerArrMoves[arrId[index]]),
    //   generateMoveObj(powerArrMoves[arrId[index]])])
    // const [moveProps1,moveProps2,moveProps3,moveProps4] =
    // await Promise.all([
    //   getMovePropertiesByName(pokeMoves[0].moveName),
    //   getMovePropertiesByName(pokeMoves[1].moveName),
    //   getMovePropertiesByName(pokeMoves[2].moveName),
    //   getMovePropertiesByName(pokeMoves[3].moveName)])

      pokeMoves[0] = generateMoveObj(powerArrMoves[arrId[0]])
      pokeMoves[1] = generateMoveObj(powerArrMoves[arrId[1]])
      pokeMoves[2] = generateMoveObj(powerArrMoves[arrId[2]])
      pokeMoves[3] = generateMoveObj(powerArrMoves[arrId[3]])


      console.log('pokeMoves[0]: ',pokeMoves)
      return pokeMoves
  }
  } catch (error) {
    console.log(error)
    
  }
  
}
function generateMoveObj(move){

    let moveProps = {
      moveName: move.name ,
      id: move.id,
      type: move.type.name,
      power: move.power,
      accuracy: move.accuracy
    }
    return moveProps
    // console.log('moveProps: ',moveProps)
}
// async function getMovePropertiesByName(move){
//   try {
//     let result = await fetch(POKE_MOVE_URL + move);
//     let data = await result.json();
//     let moveProps = {
//       moveName: move ,
//       type: data.type.name,
//       power: data.power,
//       accuracy: data.accuracy
//     }
//     // console.log('moveProps: ',moveProps)
//     return moveProps
//   } catch (error) {
//     console.log(error)
//   }
// }

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

async function getPowerArrMoves(allPokeMoves){
  try {
    let arr = await Promise.all( allPokeMoves.map(async (move)=>{
      try {
        let result = await fetch(move.move.url);
        let data = await result.json();
        return data
      } catch (error) {
        console.log(error)
      }
      
    }));
    
    const powerArrMoves = arr.filter(move =>{
      return move.power > 5
    });
    console.log(powerArrMoves)
    return powerArrMoves
  } catch (error) {
    console.log(error)
  }  
}
