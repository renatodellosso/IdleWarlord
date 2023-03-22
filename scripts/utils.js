const SEC = 1000;
const MIN = SEC * 60;
const HOUR = MIN * 60;
const DAY = HOUR * 4;

function getParent(path) {
    path = path.split(" ");
    let j = 0;
    let currentNode = data[path[j]];
    while(currentNode !== undefined && currentNode.constructor == Object && path[j+1] != "array" && j+2 < path.length) {
        // console.log(path[j]);
        j++;
        currentNode = currentNode[path[j]];
    }

    if(path[j+1] == "array") {
        currentNode = currentNode.options[currentNode.value];
    }

    return currentNode;
}

function getData(path) {
    const specials = [
        "array",
        "timer"
    ];

    path = path.split(" ");
    let j = 0;
    let currentNode = data[path[j]];
    while(currentNode !== undefined && currentNode.constructor == Object && j+1 < path.length && !specials.includes(path[j+1])) {
        // console.log(path[j]);
        j++;
        currentNode = currentNode[path[j]];
    }

    if(path[j+1] == "array") {
        currentNode = currentNode.options[currentNode.value];
    } else if(path[j+1] == "timer") {
        currentNode = formatTime(currentNode - new Date().getTime());
    }

    return currentNode;
}

function getParentID(path) {
    return path.split(" ")[path.split(" ").length-2];
}

function getDataID(path) {
    return path.split(" ")[path.split(" ").length-1];
}

function formatTime(time) {
    let text = "";
    let date = new Date(time);
    date.setD
    // console.log(date);

    if(date.getDay()-3 > 0) text += (date.getDay()-3) + "d";
    if(date.getHours()-19 > 0) text += (date.getHours()-19) + "h";
    if(date.getMinutes() > 0) text += date.getMinutes() + "m";
    if(date.getSeconds() > 0) text += date.getSeconds() + "s";

    return text;
}

function checkBool(bool) {
    return bool !== undefined && bool;
}

function clearSave() {
    let accept = confirm("Are you sure you want to wipe your save? This cannot be undone!")
    if(accept) {
        localStorage.removeItem("idlewarlordsave");
        location.reload();
    }
}

function tracker(path) {
    return `<span class="tracker" id="` + path + `"></span>`;
}