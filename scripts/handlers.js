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

        data.timers[ path.split(' ')[path.split(' ').length-3] + "-" + getDataID(path)] = {
            finish: new Date().getTime() + upgrade.time,
            onComplete: upgrade.onComplete
        };

        refreshTab();
    }
}

function train(key) {
    console.log("Attempting to train " + key);
    let pop = data.population[key];

    let canTrigger = true;
    const costKeys = Object.keys(pop.train.costs);
    costKeys.forEach(key => {
        if(getData(key) < pop.train.costs[key])
            canTrigger = false;
    });

    if(canTrigger) {
        console.log("Training " + key);

        pop.train.inProgress++;

        costKeys.forEach(key => {
            getParent(key)[key.split(" ")[key.split(" ").length-1]] -= pop.train.costs[key];
        });

        data.timers[getDataID(key) + " train " + Math.random()] = {
            finish: new Date().getTime() + pop.train.time,
            onComplete: pop.train.onComplete
        };

    }
}

function untrain(key) {
    console.log("Untraining " + key);
    if(data.population[key].amt > 0)
        data.population[key].untrain.onTrigger();
}