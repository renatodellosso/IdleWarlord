function upgrade(path) {
    console.log("Attempting upgrade: " + path);
    let upgrade = getData(path);
    console.log(upgrade);

    let canTrigger = upgrade.startTime === undefined;
    const costKeys = Object.keys(upgrade.costs);
    costKeys.forEach(key => {
        if(getData(key) < upgrade.costs[key])
            canTrigger = false;
    });

    if(canTrigger) {
        costKeys.forEach(key => {
            console.log(key);
            console.log(getData(key));
            getData(key) -= upgrade.costs[key];
        });

        upgrade.startTime = new Date().getTime;

        refreshTab();
    }
}