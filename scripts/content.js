console.log("Loading content...");

var content = {
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
      desc: "Requires 0.05 food",
      amt: 3,
      tax: .2,
      update: (time) => {
        data.resources.food.amt -= data.population.peasants.amt * time * .05;
      },
      needsMet: () => {
        return data.resources.food.amt > 0;
      },
      train: {
        text: "Costs 5 money, takes 10 secs",
        inProgress: 0,
        costs: {
          "resources money amt": 5,
        },
        time: 10 * SEC,
        onComplete: () => {
          data.population.peasants.amt++;
          data.population.peasants.train.inProgress--;
        }
      },
    },
    artisans: {
      name: "Artisans",
      unlocked: true,
      desc: "Requires 0.05 food",
      amt: 2,
      tax: .8,
      update: (time) => {
        data.resources.food.amt -= data.population.artisans.amt * time * .05;
      },
      needsMet: () => {
        return data.resources.food.amt > 0;
      },
      train: {
        text: "Costs 20 money, takes 1 min",
        inProgress: 0,
        costs: {
          "resources money amt": 20,
        },
        time: MIN,
        onComplete: () => {
          data.population.artisans.amt++;
          data.population.artisans.train.inProgress--;
        }
      },
    },
    nobles: {
      name: "Nobles",
      unlocked: true,
      desc: "Requires 0.1 food and 0.1 meat",
      amt: 1,
      tax: 8,
      update: (time) => {
        data.resources.food.amt -= data.population.nobles.amt * time * .1;
        data.resources.meat.amt -= data.population.nobles.amt * time * .1;
      },
      needsMet: () => {
        return data.resources.food.amt > 0 && data.resources.meat.amt > 0;
      },
      train: {
        text: "Costs 100 money, takes 1 hr",
        inProgress: 0,
        costs: {
          "resources money amt": 100,
        },
        time: HOUR,
        onComplete: () => {
          data.population.nobles.amt++;
          data.population.nobles.train.inProgress--;
        }
      },
    },
    farmers: {
      name: "Farmers",
      desc: "Produces " + tracker("population farmers production food") + " food and " + tracker("population farmers production meat") + " meat",
      unlocked: true,
      amt: 5,
      tax: .75,
      production: {
        food: .1,
        meat: .01,
      },
      update: (time) => {
        data.resources.food.amt += data.population.farmers.amt * time * data.population.farmers.production.food;
        data.resources.meat.amt += data.population.farmers.amt * time * data.population.farmers.production.meat;
      },
      needsMet: () => {
        return data.resources.food.amt > 0;
      },
      train: {
        text: "Costs 2 money and 1 peasant, takes 10s",
        inProgress: 0,
        costs: {
          "resources money amt": 2,
          "population peasants amt": 1
        },
        time: 10 * SEC,
        onComplete: () => {
          data.population.farmers.amt++;
          data.population.farmers.train.inProgress--;
        }
      },
      untrain: {
        text: "Gives 1 peasant back",
        onTrigger: () => {
          data.population.peasants.amt++;
          data.population.farmers.amt--;
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
          if(pop.needsMet()) tax += pop.tax * pop.amt;
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
          name: "Extra Large Storage Room",
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
        },
        tax1: {
          name: "Tax Ledgers",
          desc: "Cost: <br>-30 money<br>Time: 1m<br>Effect: +20% tax revenue",
          available: () => { 
            return !checkBool(data.buildings.treasury.upgrades.tax1.completed);
          },
          costs: {
            "resources money amt": 30
          },
          time: MIN,
          onComplete: () => {
            data.buildings.treasury.upgrades.tax1.completed = true;
            data.stats.tax.rate += .2;

            refreshTab();
          }
        },
        tax2: {
          name: "Legible Ledgers",
          desc: "Cost: <br>-75 money<br>Time: 10m<br>Effect: +20% tax revenue",
          available: () => { 
            return checkBool(data.buildings.treasury.upgrades.tax1.completed) && !checkBool(data.buildings.treasury.upgrades.tax2.completed);
          },
          costs: {
            "resources money amt": 75
          },
          time: 10 * MIN,
          onComplete: () => {
            data.buildings.treasury.upgrades.tax2.completed = true;
            data.stats.tax.rate += .2;

            refreshTab();
          }
        }
      }
    },
    fields: {
      name: "Fields",
      desc: "Farmers farm here",
      unlocked: true,
      upgrades: {
        lvl2: {
          name: "Tilling",
          desc: "Cost: <br>-10 money<br>Time: 25s<br>Effect: +0.1 food production",
          available: () => { 
            return !checkBool(data.buildings.fields.upgrades.lvl2.completed);
          },
          costs: {
            "resources money amt": 10
          },
          time: 25 * SEC,
          onComplete: () => {
            data.buildings.fields.upgrades.lvl2.completed = true;
            data.population.farmers.production.food += .1;

            refreshTab();
          }
        },
        lvl3: {
          name: "Extra Tilling",
          desc: "Cost: <br>-50 money<br>Time: 5m<br>Effect: +0.1 food production",
          available: () => { 
            return checkBool(data.buildings.fields.upgrades.lvl2.completed) && !checkBool(data.buildings.fields.upgrades.lvl3.completed);
          },
          costs: {
            "resources money amt": 50
          },
          time: 5 * MIN,
          onComplete: () => {
            data.buildings.fields.upgrades.lvl3.completed = true;
            data.population.farmers.production.food += .1;

            refreshTab();
          }
        }
      }
    },
  }
};