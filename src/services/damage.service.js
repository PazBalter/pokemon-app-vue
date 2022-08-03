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
// calcDamage(move, lombre, vulpix)
async function calcDamage(move, attacker, defender) {
  try {
    const pokeMove = await movesService.getApiMoveById(move)
    console.log(pokeMove.accuracy)
    if (pokeMove.accuracy >= utilService.getRandomInt(0, 100)) {
      const [atk,def] = checkDmgClass(pokeMove,attacker.stats, defender.stats)
      const power = pokeMove.power;
      const critical = isCriticalHit();
      console.log(critical)
      const dmgRel = await damageRelations(pokeMove.type.name, defender.types);
      // const FF = checkTypeMove(move.type.name, attacker.types);
      // const damage = (((((2 * LEVEL) / 5 + 2) * power * atk) / def / 50) * FF + 2) *critical *dmgRel;
      
      // console.log('damage sum: ',damage);
    }else{
      console.log('missed attack! damage: ', 0);
    } 
  } catch (error) {
    console.log(error)
  }

}
function checkDmgClass(move,attackerStats,defenderStats) {
  console.log('move.damage: ',move.damage_class.name)

  if (move.damage_class.name === "physical") {
    var atk = attackerStats.find(stat => stat.statName === "attack")
    var def = attackerStats.find(stat => stat.statName === "defense")
  } else if (move.damage_class.name === "special") {
    var atk = attackerStats.find(stat => stat.statName === "specialAttack")
    var def = attackerStats.find(stat => stat.statName === "specialDefense")
  }
    console.log('succses: atk:,',atk)
    return [atk.points,def.points];
}
function isCriticalHit(){
  let num = utilService.getRandomInt(0, 100)
  if(num >= 93){
    return 1.1
  }else{
    return 1
  }
}
async function damageRelations(moveType , defenderType) {
  try {
    let dmgRel
  
    if(defenderType.length <2){
      const pokeType1 = await getApiTypeByName(defenderType) 
      dmgRel = calcTypeRatio(moveType,pokeType1)
    } 
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
function calcTypeRatio(moveType,pokeType1,pokeType2 = null){
  let damage;
  damage = pokeType1.damage_relations.double_damage_from.find(function(post, index) {
    if(post.name == 'moveType')
      return true;
  });
  console.log(damage)
  
  }
function checkTypeMove() {}