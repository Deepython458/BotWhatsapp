const fs = require('fs');
const path = require('path');

const ruta = path.join(__dirname, 'data.json');

function cargarDatos() {
    if (fs.existsSync(ruta)) {
        const data = fs.readFileSync(ruta, 'utf8');
        return JSON.parse(data);
    } else {
        return { inventario: {}, cash: 0 };
    }
}

function guardarDatos(data) {
    fs.writeFileSync(ruta, JSON.stringify(data, null, 2));
}

let datos = cargarDatos();

function agregarInventario(letra, cantidad) {
    if (!datos.inventario[letra]) return false;
    datos.inventario[letra].cantidad += cantidad;
    guardarDatos(datos);
    return true;
}

function registrarVenta(letra, precio) {
    if (!datos.inventario[letra] || datos.inventario[letra].cantidad <= 0) return false;
    datos.inventario[letra].cantidad--;
    datos.cash += precio;
    guardarDatos(datos);
    return true;
}

function obtenerInventario() {
    return datos.inventario;
}

function obtenerCash() {
    const inversionBase = 130000;

    let data = { cash: 0 };

    if (fs.existsSync(ruta)) {
        const raw = fs.readFileSync(ruta, 'utf-8');
        data = JSON.parse(raw);
    }

    const ganancia = data.cash > inversionBase ? (data.cash - inversionBase) : 0;
    return { total: data.cash, ganancia };
}

module.exports = {
    agregarInventario,
    registrarVenta,
    obtenerInventario,
    obtenerCash
};
