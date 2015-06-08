function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

function getIndexOfId(array, id) {
    for (var i=0; i<array.length; i++) {
        if (array[i].id==id) return array[i];
    }
    return -1;
}

function getIndexOfIdCnt(array, id) {
    for (var i=0; i<array.length; i++) {
        if (array[i].id==id) return i;
    }
    return -1;
}

function removeIndexOfId(array, id) {
    for (var i=0; i<array.length; i++) {
        if (array[i].id==id) return array.remove[i];
    }
}