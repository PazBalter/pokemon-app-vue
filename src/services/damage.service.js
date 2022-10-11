import { utilService } from "@/services/util.service";
import { movesService } from "./moves.service";

const POKE_TYPES_URL = 'https://pokeapi.co/api/v2/type/';


export const damageService = {
  calcDamage,
};

const LEVEL = 100;
const lombre = {
  id: 271,
  moves:{
    "pokeId": 271,
    "moves": [55,35,7,2]
  }, 
  name:"lombre",
  stats:[
    {
        "statName": "hp",
        "points": 260
    },
    {
        "statName": "attack",
        "points": 131
    },
    {
        "statName": "defense",
        "points": 131
    },
    {
        "statName": "specialAttack",
        "points": 155
    },
    {
        "statName": "specialDefense",
        "points": 179
    },
    {
        "statName": "speed",
        "points": 131
    }
  ],
  types:[
    "grass",
    "water"
  ]
}
const vulpix = {
    "id": 37,
    "name": "vulpix",
    "stats": [
        {
            "statName": "hp",
            "points": 237
        },
        {
            "statName": "attack",
            "points": 215
        },
        {
            "statName": "defense",
            "points": 108
        },
        {
            "statName": "specialAttack",
            "points": 215
        },
        {
            "statName": "specialDefense",
            "points": 108
        },
        {
            "statName": "speed",
            "points": 96
        }
    ],
    "moves": {
      "pokeId": 37,
      "moves": [71,79,21,67]
      },
    "types": [
        "fire"
    ]
}
var move = 55
calcDamage(move,lombre, vulpix )
async function calcDamage(move, attacker, defender) {
  try {
    const pokeMove = await movesService.getApiMoveById(move)
    if (pokeMove.accuracy >= utilService.getRandomInt(0, 100)) {
      const [atk,def] = checkDmgClass(pokeMove,attacker.stats, defender.stats)
      const power = pokeMove.power;
      const critical = isCriticalHit();
     
      const dmgRel = await damageRelations(pokeMove.type.name, defender.types);
     
      const FF = isPokeTypeSameTo(pokeMove.type.name, attacker.types);

      const damage = Math.round((((((2 * LEVEL) / 5 + 2) * power * atk) / def / 50) * FF + 2) *critical *dmgRel);
      
      console.log('damage sum: ',damage);
      // return damage
    }else{
      console.log('missed attack! damage: ', 0);
    } 
  } catch (error) {
    console.log(error)
  }

}
function isPokeTypeSameTo(moveType,pokeType ) {
  if(pokeType.indexOf(moveType) > -1){
    return 2
  }else{
    return 1
  }
}
function checkDmgClass(move,attackerStats,defenderStats) {
  if (move.damage_class.name === "physical") {
    var atk = attackerStats.find(stat => stat.statName === "attack")
    var def = defenderStats.find(stat => stat.statName === "defense")
  } else if (move.damage_class.name === "special") {
    var atk = attackerStats.find(stat => stat.statName === "specialAttack")
    var def = defenderStats.find(stat => stat.statName === "specialDefense")
  }
    return [atk.points,def.points];
}
function isCriticalHit(){
  let num = utilService.getRandomInt(0, 100)
  if(num >= 93){
    return 2
  }else{
    return 1
  }
  // return (num >=93) ?  2 :  1;
}
async function damageRelations(moveType , defenderType) {
  try {
      const pokeMove = await getApiTypeByName(moveType) 
      return calcTypeRatio(pokeMove,defenderType);
  } catch (error) {
    console.log(error)
  }

}
async function getApiTypeByName(str){
  try {
    let result = await fetch( POKE_TYPES_URL+ str);
    let data = await result.json();
    return data;
  } catch (error) { 
    console.log(error)
  }
}
function calcTypeRatio(moveType,defenderType){
  let damage = 1;
  defenderType.forEach(type => {
    moveType.damage_relations.half_damage_to.some( moveType =>{
    if(moveType.name === type){ damage = damage/2 }
    })
    moveType.damage_relations.double_damage_to.some( moveType =>{
    if(moveType.name === type){ damage = damage*2 }
    })
    moveType.damage_relations.no_damage_to.some( moveType =>{
    if(moveType.name === type){ damage = damage*0 }
    })
  });
  return damage
  }
