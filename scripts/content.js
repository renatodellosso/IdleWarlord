console.log("Loading content...");

let content = {
  timers: {},
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
      amt: 3,
      tax: .1,
      update: (time) => {
        data.resources.food.amt -= data.population.peasants.amt * time * .05;
      }
    },
    artisans: {
      name: "Artisans",
      unlocked: true,
      amt: 2,
      tax: .2,
      update: (time) => {
        data.resources.food.amt -= data.population.artisans.amt * time * .05;
      }
    },
    nobles: {
      name: "Nobles",
      unlocked: true,
      amt: 1,
      tax: 5,
      update: (time) => {
        data.resources.food.amt -= data.population.nobles.amt * time * .1;
        data.resources.meat.amt -= data.population.nobles.amt * time * .1;
      }
    },
    farmers: {
      name: "Farmers",
      desc: "Produces food and meat",
      unlocked: true,
      amt: 5,
      tax: .5,
      production: {
        food: .1,
        meat: .01,
      },
      update: (time) => {
        data.resources.food.amt += data.population.farmers.amt * time * data.population.farmers.production.food;
        data.resources.meat.amt += data.population.farmers.amt * time * data.population.farmers.production.meat;
      },
      train: {
        text: "Costs 2 money, takes 10s",
        costs: {
          "resources money amt": 2
        },
        time: 10 * SEC,
        onComplete: () => {
          data.population.farmers.amt++;
        }
      },
      untrain: {
        text: "Takes 10s",
        time: SEC,
        onComplete: () => {
          data.population.peasants.amt++;
        }
      }
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
    },
    food: {
      name: "Food",
      unlocked: true,
      amt: 20,
      max: {
        base: 40,
        add: {},
        mult: {}
      }
    },
    meat: {
      name: "Meat",
      unlocked: true,
      amt: 5,
      max: {
        base: 10,
        add: {},
        mult: {}
      }
    },
  },
  buildings: {
    treasury: {
      name: "Treasury",
      desc: "Stores money",
      unlocked: true,
      upgrades: {
        lvl2: {
          name: "Larger Storage Room",
          desc: "Cost: <br>-5 money<br>Time: 5s<br>Effect: +50 max money",
          available: () => { 
            return !checkBool(data.buildings.treasury.upgrades.lvl2.completed);
          },
          costs: {
            "resources money amt": 5
          },
          time: 5 * SEC,
          onComplete: () => {
            data.buildings.treasury.upgrades.lvl2.completed = true;
            data.resources.money.max.add.treasury = 50;

            refreshTab();
          }
        },
        lvl3: {
          name: "Even Larger Storage Room",
          desc: "Cost: <br>-70 money<br>Time: 5m<br>Effect: +150 max money",
          available: () => { 
            return checkBool(data.buildings.treasury.upgrades.lvl2.completed) && !checkBool(data.buildings.treasury.upgrades.lvl3.completed);
          },
          costs: {
            "resources money amt": 70
          },
          time: 5 * MIN,
          onComplete: () => {
            data.buildings.treasury.upgrades.lvl3.completed = true;
            data.resources.money.max.add.treasury = 200;

            refreshTab();
          }
        }
      }
    }
  }
};