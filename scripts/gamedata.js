console.log("Loading gamedata...");

let data = content;

function save() {
    console.log("Saving...");
    localStorage.setItem("idlewarlordsave", JSON.stringify(data));
    console.log("Saved");
}

//Taken from https://stackoverflow.com/a/12534361
function update(obj/*, …*/) {
    for (var i=1; i<arguments.length; i++) {
        for (var prop in arguments[i]) {
            var val = arguments[i][prop];
            if (typeof val == "object") { // this also applies to arrays or null!
                console.log(prop);
                update(obj[prop], val);
            } else {
                console.log(prop + " " + obj[prop] + " " + (obj[prop] instanceof Function));
                if(obj[prop] instanceof Function)
                    obj[prop] = val;
                else obj[prop] = eval(val);
            }
        }
    }
    return obj;
}

function load() {
    console.log("Loading save...");
    let save = JSON.parse(localStorage.getItem("idlewarlordsave"));
    
    data.timers = save.timers;

    update(data, save);

    console.log("Loaded save");
}

if(localStorage.getItem("idlewarlordsave") !== undefined) load();