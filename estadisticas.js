const fs = require('fs');


function reiniciarDatos(){
    let data = {inventario: {}, cash:0};
    if(fs.existsSync('data.json')){
        const rawData = fs.readFileSync('data.json','utf-8');
        data = JSON.parse(rawData);
    }

    let historial = {tandas: []};
    if(fs.existsSync('datos.json')){
        const rawHistorial = fs.readFileSync('datos.json','utf-8');
        historial = JSON.parse(rawHistorial);
        if(!Array.isArray(historial.tandas)){
            historial.tandas = [];
        }
    }

    const numeroTanda = historial.tandas.length + 1;


    historial.tandas.push({
        numero : numeroTanda,
        dinero : data.cash,
        fecha: new Date().toLocaleDateString('es-AR'),
    });

    fs.writeFileSync('datos.json',JSON.stringify(historial, null, 2));

    data.cash = 0;
    for(const key in data.inventario){
        data.inventario[key].cantidad = 0;
    }
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
}


module.exports ={
   
    reiniciarDatos,
};
