function upgrade(path) {
    console.log("Attempting upgrade: " + path);
    let upgrade = getData(path);
    console.log(upgrade);

    let canTrigger = data.timers[getDataID(path)] === undefined;
    const costKeys = Object.keys(upgrade.costs);
    costKeys.forEach(key => {
        if(getData(key) < upgrade.costs[key])
            canTrigger = false;
    });
    
    console.log("Triggering Upgrade: " + canTrigger);
    if(canTrigger) {
        costKeys.forEach(key => {
            // console.log(key);
            // console.log(getData(key));
            getParent(key)[key.split(" ")[key.split(" ").length-1]] -= upgrade.costs[key];
        });

        data.timers[getDataID(path)] = {
            finish: new Date().getTime() + upgrade.time,
            onComplete: upgrade.onComplete
        };

        refreshTab();
    }
}