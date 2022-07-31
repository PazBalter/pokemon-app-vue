import { utilService } from "@/services/util.service";

export const movesService = {
  createPokeMoves,
  getApiMoveById
};

const MOVES_LIST = [
  {moveName: '', type:""},
  {moveName: '', type:""},
  {moveName: '', type:""},
  {moveName: '', type:""}
  ]
const POKE_API_URL = "https://pokeapi.co/api/v2/pokemon/";
const POKE_MOVE_URL = "https://pokeapi.co/api/v2/move/";

async function createPokeMoves(allPokeMoves){
  try {
    const pokeMoves = MOVES_LIST
    const movesLen = allPokeMoves.length
  if(movesLen < 4){

  }else{
    const arrId = utilService.GenrateArrUniqeNum(movesLen);
      pokeMoves.forEach((move,index) => {
        move.moveName = allPokeMoves[arrId[index]].move.name
    })
    // [pokeMoves[0].type,pokeMoves[1].type,pokeMoves[2].type,pokeMoves[3].type] =
    // await Promise.all([
    //   getMoveTypeById(pokeMoves[0].moveName),
    //   getMoveTypeById(pokeMoves[1].moveName),
    //   getMoveTypeById(pokeMoves[2].moveName),
    //   getMoveTypeById(pokeMoves[3].moveName)])
    return pokeMoves
  }
  } catch (error) {
    console.log(error)
  }
  
}
async function getMoveTypeById(moveName){
  try {
    let result = await fetch(POKE_MOVE_URL + moveName);
    let data = await result.json();
    return data.type.name
  } catch (error) {
    console.log(error)
  }
}
// function createPokeMoves(pokeId, numOfMoves = null) {
//   if (!numOfMoves) {
//     numOfMoves = fetchData(pokeId);

//   }
  
//   const pokeMoves = MOVES_LIST
//   if (numOfMoves >= 4) {
//     const arrId = utilService.GenrateArrUniqeNum(numOfMoves);
//     pokeMoves.forEach((move,index) => {move.moveId = arrId[index]})
//   } else {
//     pokeMoves.forEach((move,index) => {if(numOfMoves >= index+1){
//       move.moveId = arrId[index+1]
//       console.log('numOfMoves: ',numOfMoves,'index:',index+1)
//     }})
//   }
//   return pokeMoves;
// }

// function createArrLessMoves(numOfMoves) {
//   // var arr = [];
//   // var moves = 0;
//   // while (arr.length < 4) {
//   //   if (numOfMoves > moves) {
//   //     arr.push(moves);
//   //     moves++;
//   //   } else {
//   //     arr.push(null);
//   //   }
//   // }
//   // return arr;

// }

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
