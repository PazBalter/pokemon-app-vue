import { utilService } from "@/services/util.service";
import { movesService } from "./moves.service";

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
const move = movesService.getApiMoveById(55)
// calcDamage(move, lombre, vulpix)
function calcDamage(move, attacker, defender) {
  if (move.accuracy >= utilService.getRandomInt(0, 100)) {
    // const atk = checkDmgClass(move, attacker.stats);
    // const def = checkDmgClass(move, defender.stats);
    const [atk,def] = checkDmgClass(move,attacker.stats, defender.stats)
    const power = move.power;
    const critical = 1;
    const dmgRel = damageRelations(move.type.name, defender.types);
    const FF = checkTypeMove(move.type.name, attacker.types);
    const damage = (((((2 * LEVEL) / 5 + 2) * power * atk) / def / 50) * FF + 2) *critical *dmgRel;
    
    console.log('damage sum: ',damage);
  }else{
    console.log('missed attack! damage: ', 0);
  }
}
function checkDmgClass(move,attackerStats,defenderStats) {
  if (move.damage_class.name === "physical") {
    return [attackerStats.attack,defenderStats.defense];
  } else if (move.damage_class.name === "special") {
    return [attackerStats.attack,defenderStats.defense];
  }
}
function checkTypeMove() {}
function damageRelations() {}
