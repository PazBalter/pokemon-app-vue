import {utilService} from '@/services/util.service'

export const movesService = {
    createPokeMoves,
}


const POKE_API_URL= 'https://pokeapi.co/api/v2/pokemon/'

function createPokeMoves(id,numOfMoves = null){
    if(!numOfMoves){
        numOfMoves =  fetchData(id) 
    }
    const pokeMoves = {pokeId: id ,moves:[]}
    if (numOfMoves >= 4){
        pokeMoves.moves = utilService.GenrateArrUniqeNum(numOfMoves)
    }else{
        pokeMoves.moves = createArrLessMoves(numOfMoves)
    }
    return pokeMoves;
}

function createArrLessMoves(numOfMoves){
    var arr = []
    var moves = 0
    while(arr.length < 4){
        if(numOfMoves > moves){
            arr.push(moves)
            moves++
        }else{
            arr.push(null)
        }
    }
    return arr
}

async function fetchData(id){   
    let req = new Request(POKE_API_URL + id);
    fetch(req)
        .then((res) =>{
            if(res.status === 200)
            return res.json();
        })
        .then((pokemon) => {
            console.log('from service:',pokemon.moves.length)
            return pokemon.moves.length
        })
        .catch((error) =>{
            console.log(error);
        }) 
       
}
