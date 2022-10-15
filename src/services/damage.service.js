import { utilService } from "@/services/util.service";
import { movesService } from "./moves.service";

const POKE_TYPES_URL = 'https://pokeapi.co/api/v2/type/';


export const damageService = {
  calcDamage,
  damageRelations

};



async function calcDamage(move, attacker, defender) {
  try {
    console.log('move:',move.moveName, )
    const pokeMove = await movesService.getApiMoveById(move.moveName)
    if ( pokeMove.accuracy === null || pokeMove.accuracy >= utilService.getRandomInt(0, 100)) {
      const [atk,def] = checkDmgClass(pokeMove,attacker.stats, defender.stats)
   
      const power = pokeMove.power;
   
      const critical = isCriticalHit();
    
      const dmgRel = await damageRelations(pokeMove.type.name, defender.types);
      const LEVEL = 100;
      const FF = isPokeTypeSameTo(pokeMove.type.name, attacker.types);
      
      const damage = Math.round((((((2 * LEVEL) / 5 + 2) * power * atk) / def / 50) * FF + 2) *critical *dmgRel);
      
      console.log('damage sum: ',damage);
      return damage
    }else{
      console.log('missed attack! damage: ', 0);
      return 0
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
