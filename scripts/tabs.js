console.log("Loading tabs...");

const tabs = {
    population: 
        `
            <strong>Population</strong><br>
            Peasants: <span class="tracker" id="population peasants amt"></span><br>
            Artisans: <span class="tracker" id="population artisans amt"></span><br>
            Aristocrats: <span class="tracker" id="population aristocrats amt"></span><br>
        `
}

function swapTab(tab) {
    console.log("Swapping tab to " + tab);
    document.getElementById("tab").innerHTML = tabs[tab];
}