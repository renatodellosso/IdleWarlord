console.log("Loading main.ts...");

let lastUpdate = new Date().getTime();

function updateDisplay() {
    console.log("Updating display...");

    let trackers = document.getElementsByClassName("tracker");

    console.log("Found " + trackers.length + " trackers");
    for(let i = 0; i < trackers.length; i++) {
        let tracker = trackers.item(i);
        console.log("Updating tracker: " + tracker.id);

        let path = tracker.id.split(" ");
        let j = 0;
        let currentNode = data[path[j]];
        while(currentNode.constructor == Object && path[j+1] != "array") {
            // console.log(path[j]);
            j++;
            currentNode = currentNode[path[j]];
        }

        if(path[j+1] == "array") {
            currentNode = currentNode.options[currentNode.value];
        }

        tracker.innerHTML = currentNode;
    }
}

function checkMaxes() {
    console.log("Checking maxes...");
}

function update() {
    let time = (new Date().getTime() - lastUpdate)/100;
    lastUpdate = new Date().getTime();
    console.log("Updating... Time Since Last Update: " + time + "s");

    let tax = 0;
    tax += data.population.peasants.amt * data.population.peasants.tax;
    tax += data.population.artisans.amt * data.population.artisans.tax;
    tax += data.population.aristocrats.amt * data.population.aristocrats.tax;
    tax *= data.stats.tax.rate * time / 60;
    data.resources.money.amt += tax;

    checkMaxes();
    updateDisplay();

    console.log("Finished update. Time Taken: " + ((new Date().getTime() - lastUpdate)/100) + "s");
}

swapTab("population");
setInterval(update, 100);