console.log("Loading main.ts...");

let lastUpdate = new Date().getTime();

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
    path = path.split(" ");
    let j = 0;
    let currentNode = data[path[j]];
    while(currentNode !== undefined && currentNode.constructor == Object && path[j+1] != "array" && j+1 < path.length) {
        // console.log(path[j]);
        j++;
        currentNode = currentNode[path[j]];
    }

    if(path[j+1] == "array") {
        currentNode = currentNode.options[currentNode.value];
    }

    return currentNode;
}

function updateDisplay() {
    // console.log("Updating display...");

    let trackers = document.getElementsByClassName("tracker");

    // console.log("Found " + trackers.length + " trackers");
    for(let i = 0; i < trackers.length; i++) {
        let tracker = trackers.item(i);
        // console.log("Updating tracker: " + tracker.id);

        tracker.innerHTML = getData(tracker.id);  ;
    }
}

function checkMaxes() {
    // console.log("Checking maxes...");
    let resourceKeys = Object.keys(data.resources);
    resourceKeys.forEach(key => {
        let max = data.resources[key].max;

        max.value = max.base;
        Object.values(max.add).forEach(x => {max.value += x});
        Object.values(max.mult).forEach(x => {max.value *= 1 + x});

        data.resources[key].amt = Math.round(Math.min(data.resources[key].amt, max.value)*100)/100;
    });
}

function updateResources(time) {
    // console.log("Updating resources...");

    const keys = Object.keys(data.resources);
    keys.forEach(key => {
        let resource = data.resources[key];
        // console.log("Updating resource: " + resource.name);
        resource.update(time);
    });
}

function updatePops(time) {
    // console.log("Updating pops...");

    const keys = Object.keys(data.population);
    keys.forEach(key => {
        let pop = data.population[key];
        // console.log("Updating pop: " + pop.name);
        if(pop.update !== undefined) pop.update(time);
    });
}

function update() {
    let time = (new Date().getTime() - lastUpdate)/100;
    lastUpdate = new Date().getTime();
    // console.log("Updating... Time Since Last Update: " + time + "s");

    updateResources(time);
    updatePops(time);
    checkMaxes();
    refreshTab();
    updateDisplay();

    // console.log("Finished update. Time Taken: " + ((new Date().getTime() - lastUpdate)/100) + "s");
}

swapTab("Population");
setInterval(update, 100);