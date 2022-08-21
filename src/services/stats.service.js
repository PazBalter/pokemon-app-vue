// https://pokeapi.co/api/v2/stat/  STAT_URL
// https://pokeapi.co/api/v2/pokemon/  POKE_URL
export const statsService = {
    CreateStatObject,
    BasePointsummary,
}
const IV = 8;
const LEVEL = 100;
const MAX_EV = 510;


function CreateStatObject(baseStats){
    const pokeStat = [
        {
            statName:'hp',
            points:0,
            max:0
        },
        {
            statName:'attack',
            points:0,
            max:0
        },
        {
            statName:'defense',
            points:0,
            max:0
        },
        {
            statName:'specialAttack',
            points:0,
            max:0
        },
        {
            statName:'specialDefense',
            points:0,
            max:0
        },
        {
            statName:'speed',
            points:0,
            max:0
        },
    ]
    const totalBP = BasePointsummary(baseStats)
    const EV = makeEVPoints(baseStats,totalBP)
    pokeStat.forEach((stat,index)=>{
        if(index === 0){
            stat.points = buildHPstat(baseStats[index].base_stat,EV[index].points)
            stat.max = buildHPstat(baseStats[index].base_stat,EV[index].points)
        }else{
            stat.points = buildOtherStat(baseStats[index].base_stat,EV[index].points)
            stat.max = buildHPstat(baseStats[index].base_stat,EV[index].points)
        }
    })
    return pokeStat
}


function buildHPstat(baseStat,EV){
    if(baseStat === 1){
        return 1;
    }
    return Math.floor((2*baseStat+IV+Math.floor(EV/4))*LEVEL/100)+LEVEL+10;
}

function buildOtherStat(baseStat,EV){
    return Math.floor((Math.floor((2*baseStat+IV+Math.floor(EV/4))*LEVEL/100)+5));
}

function BasePointsummary(baseStats){
    return baseStats.reduce( (acc, stat) => acc + stat.base_stat , 0);
}

function makeEVPoints(baseStats,totalBP){
    const ev = [
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
    ev.forEach((stat,index) =>{
        stat.points = Math.floor(MAX_EV*(baseStats[index].base_stat/totalBP)) 
    })
    return ev
    
}




