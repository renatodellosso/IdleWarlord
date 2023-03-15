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
            amt: 10,
            tax: .1
        },
        artisans: {
            amt: 3,
            tax: .2
        },
        aristocrats: {
            amt: 1,
            tax: 5
        }
    },
    resources: {
        money: {
            amt: 0,
            max: 100
        }
    },
};