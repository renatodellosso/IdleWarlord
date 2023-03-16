console.log("Loading tabs...");

let currentTab;

const tabs = {
    Resources: () => {
        let html = "<h2>Resources</h2><br>";

        const keys = Object.keys(data.resources);
        keys.forEach(key => {
            let resource = data.resources[key];

            html += `<span class="tracker" id="resources ` + key + ` name"></span>: `;
            html += `<span class="tracker" id="resources ` + key + ` amt"></span>`;
            if(resource.max !== undefined) html += `/<span class="tracker" id="resources ` + key + ` max value"></span>`;
            html += "<br>";
        })

        return html;
    },
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

                        html += `<button class="upgrade" id='buildings ` + key + ` upgrades ` +  uKey + `'>` + upgrades[uKey].name +
                            ":<br>" + (data.timers[uKey] === undefined || data.timers[uKey].finish === undefined ? 
                                upgrades[uKey].desc : 
                                `<span class="tracker" id="timers ` + uKey + ` finish timer"></span>`) + "</button><br>";
                    }
                });
            }
        });

        return html;
    }
}

function generateEventListeners() {
    let elements = document.getElementsByClassName("upgrade");
    for(let i = 0; i < elements.length; i++)
        elements.item(i).addEventListener('click', function() { upgrade(elements.item(i).id); });
}

function swapTab(tab) {
    console.log("Swapping tab to " + tab);
    currentTab = tab;
    document.getElementById("tab").innerHTML = tabs[tab]();
    generateEventListeners();
}

function refreshTab() {
    swapTab(currentTab);
}

let tabList = document.getElementById("tabList");
Object.keys(tabs).forEach(tab => {
    tabList.innerHTML += `<button onclick='swapTab("` + tab + `")'>` + tab + `</button>`
})
tabList.innerHTML += "<hr>";