
export const utilService = {
    delay,
    getRandomInt,
    makeId,
    GenrateArrUniqeNum
}

function delay(ms = 1500) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function GenrateArrUniqeNum(num){
    var arr = [];
    while(arr.length < 4){
        var r = Math.floor(Math.random() * num) + 0;
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr
}
