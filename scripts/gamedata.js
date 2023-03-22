console.log("Loading gamedata...");

var data = content;

function save() {
    console.log("Saving...");
    //JSON Replacer taken from https://stackoverflow.com/a/40876342
    localStorage.setItem("idlewarlordsave", JSON.stringify(data, function(key, val) {
        return (typeof val === 'function') ? '' + val : val;
    }));
    console.log("Saved");
}

//Taken from https://stackoverflow.com/a/12534361
function update(obj/*, …*/) {
    if(obj !== undefined) {
        for (var i=1; i<arguments.length; i++) {
            for (var prop in arguments[i]) {
                try {
                    var val = arguments[i][prop];
                    // console.log("Prop: " + prop);
                    if (typeof val == "object") // this also applies to arrays or null!
                        update(obj[prop], val);
                    else
                        obj[prop] = val;
                } catch(e) {
                    console.log("Caught error updating.")
                    console.log("Obj:");
                    console.log(obj);
                    console.log("Prop: " + prop);
                    console.error(e);
                }
            }
        }
    }
    return obj;
}

function load() {
    console.log("Loading save...");
    
    try {
        if(localStorage.getItem("idlewarlordsave") !== undefined) {
            //JSON Reviver taken from https://stackoverflow.com/a/40876342
            let save = JSON.parse(localStorage.getItem("idlewarlordsave"), function(key, val){
                // console.log(val);
                // Make sure the current value is not null (is a string)
                // and that the first characters are "function"
                if(typeof val === "string" && (val.includes("=>") || val.includes("function anonymous"))){
                    // console.log(key);
                    // console.log(val);
                
                    // Isolate the argument names list
                    var start = val.indexOf("(") + 1;
                    var end = val.indexOf(")");     
                    var argListString = val.substring(start,end).split(",");
                    
                    // Isolate the body of the function
                    var body = val.substring(val.indexOf("{"), val.length);
                    
                    // console.log(argListString);
                    // console.log(body);

                    // Construct a new function using the argument names and body
                    // stored in the string:
                    return new Function(argListString, body);
                    
                } else {
                    // Non-function property, just return the value
                    // console.log(val);
                    return val;
                } 
            });
            update(data, save);

            if(save.timers !== null)
                data.timers = save.timers;

            console.log("Loaded save");
        } else console.log("Did not find save");
    } catch(e) { console.log("Did not find save"); console.error(e); }
}

if(localStorage.getItem("idlewarlordsave") !== undefined) load();