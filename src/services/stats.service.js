// https://pokeapi.co/api/v2/stat/  STAT_URL
// https://pokeapi.co/api/v2/pokemon/  POKE_URL
export const statsService = {
    CreateStatObject,
}
const IV = 8;
const LEVEL = 100;
const MAX_EV = 510;
const STATOBJECT=[
    {
        statName:'hp',
        points:0
    },
    {
        statName:'attack',
        points:0
    },
    {
        statName:'defense',
        points:0
    },
    {
        statName:'specialAttack',
        points:0
    },
    {
        statName:'specialDefense',
        points:0
    },
    {
        statName:'speed',
        points:0
    },
]

function CreateStatObject(baseStats){
    var pokeStat = STATOBJECT 
    const maxBP = summaryMaxBasePoint(baseStats)
    const EV = makeEVPoints(baseStats,maxBP)
    pokeStat.forEach((stat,index)=>{
        if(index === 0){
            pokeStat[index].points = buildHPstat(baseStats[index].base_stat,EV[index].points)
        }else{
            pokeStat[index].points = buildOtherStat(baseStats[index].base_stat,EV[index].points)
        }
    })
    return pokeStat
}


function buildHPstat(baseStat,EV){
    if(baseStat === 1){
        return 1;
    }
    var hp = Math.floor((2*baseStat+IV+Math.floor(EV/4))*LEVEL/100)+LEVEL+10
    return hp
}

function buildOtherStat(baseStat,EV){
    var stat = Math.floor((Math.floor((2*baseStat+IV+Math.floor(EV/4))*LEVEL/100)+5))
    return stat
}
function summaryMaxBasePoint(baseStats){
    var maxBasePoints = 0
    baseStats.forEach(stat => {
        maxBasePoints = maxBasePoints + stat.base_stat
    });
    return maxBasePoints
}
function makeEVPoints(baseStats,maxBP){
    var ev = STATOBJECT
    ev.forEach((element,index) =>{
        element.points = Math.floor(MAX_EV*(baseStats[index].base_stat/maxBP)) 
    })
    return ev
    
}




