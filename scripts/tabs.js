console.log("Loading tabs...");

let currentTab;

const tabs = {
    Population: () => {
        let html = "<h2>Population</h2><br>";

        const popKeys = Object.keys(data.population);
        popKeys.forEach(key => {
            const pop = data.population[key];
            if(pop.unlocked)
                html += pop.name + ': <span class="tracker" id="population ' + key + ' amt"></span><br>';
        });

        return html;
    },
    Capital: () => {
        let html = "<h2>Capital</h2><br>";

        const buildingKeys = Object.keys(data.buildings);
        buildingKeys.forEach(key => {
            const building = data.buildings[key];
            if(building.unlocked) {
                html += `<strong>` + building.name + '</strong>  - ' + building.desc + '<br>';
                
                const upgrades = building.upgrades;
                let addedHeader = false;
                Object.keys(upgrades).forEach(uKey => {
                    if((upgrades[uKey].available() || upgrades[uKey].startTime !== undefined) && 
                        (upgrades[uKey].completed === undefined || !upgrades[uKey].completed)) {
                        
                        if(!addedHeader) {
                            html += "<em>Upgrades</em><br>";
                            addedHeader = true;
                        }

                        html += `<button onclick="upgrade('buildings ` + key + ` upgrades ` +  uKey + `')">` + upgrades[uKey].name +
                            ": " + (upgrades[uKey].startTime === undefined ? 
                                upgrades[uKey].desc : 
                                upgrades[uKey].startTime + upgrades[uKey].time - new Date().getTime()) + "</button><br>";
                    }
                });
            }
        });

        return html;
    }
}

function swapTab(tab) {
    console.log("Swapping tab to " + tab);
    currentTab = tab;
    document.getElementById("tab").innerHTML = tabs[tab]();
}

function refreshTab() {
    swapTab(currentTab);
}

let tabList = document.getElementById("tabList");
Object.keys(tabs).forEach(tab => {
    tabList.innerHTML += `<button onclick='swapTab("` + tab + `")'>` + tab + `</button>`
})
tabList.innerHTML += "<hr>";