console.log("Loading main.ts...");

let lastUpdate = new Date().getTime();

function updateDisplay() {
    console.log("Updating display...");

    let trackers = document.getElementsByClassName("tracker");

    console.log("Updated display.");
}

function update() {
    let time = (new Date().getTime() - lastUpdate)/100;
    lastUpdate = new Date().getTime();
    console.log("Updating... Time Since Last Update: " + time + "s");

    updateDisplay();

    console.log("Finished update. Time Taken: " + ((new Date().getTime() - lastUpdate)/100) + "s");
}

setInterval(update, 100)