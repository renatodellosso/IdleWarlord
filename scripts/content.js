console.log("Loading content...");

let content = {
    stats: {
        level: {
            value: 0,
            options: [
                "Waystop",
                "Village",
                "Town",
                "Chiefdom"
            ]
        },
        tax: {
            rate: 1
        }
    },
    population: {
        peasants: {
            name: "Peasants",
            unlocked: true,
            amt: 10,
            tax: .1
        },
        artisans: {
            name: "Artisans",
            unlocked: true,
            amt: 3,
            tax: .2
        },
        nobles: {
            name: "Nobles",
            unlocked: true,
            amt: 1,
            tax: 5,
        }
    },
    resources: {
        money: {
            name: "Money",
            unlocked: true,
            amt: 0,
            max: {
                base: 25,
                add: {},
                mult: {}
            },
            update: (time) => {
                let tax = 0;

                let keys = Object.keys(data.population);
                keys.forEach(key => {
                    let pop = data.population[key];
                    tax += pop.tax * pop.amt;
                });

                tax *= data.stats.tax.rate * time / 60;
                data.resources.money.amt += tax;
            }
        }
    },
    buildings: {
        treasury: {
            name: "Treasury",
            desc: "Stores money",
            unlocked: true,
            upgrades: {
                lvl2: {
                    name: "Larger Storage Room",
                    desc: "Cost: 20 money; Time: 1m; Effect: +50 max money",
                    available: () => {return getData("buildings treasury upgrades lvl2 completed") === undefined},
                    costs: {
                        "resources money amt": 2
                    },
                    time: MIN,
                    benefits: {
                        "resources money max add": 50
                    }
                }
            }
        }
    }
};