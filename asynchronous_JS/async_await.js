let stocks = {
    fruits: ["apple", "banana", "graps", "orange"],
    liquid: ["water", "ice"],
    flavour: ["chokotate", "milk", "peanute"]
};

let is_shop_open = true;

function time(ms){
    return new Promise((resolve, reject) => {
        if(is_shop_open){
            setTimeout(resolve, ms)
        }
        else{
            reject(console.log("Shop is closed"));
        }
    });
}

async function kitchen (){
    try{
        await time(2000);
        console.log(`${stocks.fruits[1]}`);

        console.log("Start the work");

        await time(2000);
        console.log("fruit is cutting");
    }
    catch(err){
        console.log("Customer left");
    }
}

kitchen()