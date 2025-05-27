const axios = require('axios');

async function obtenerDolarBlue() {
    try{
        const response = await axios.get('https://api.bluelytics.com.ar/v2/latest');
        const dolarBlue = response.data.blue;
        return `💵 Dólar Blue hoy:\nCompra: $${dolarBlue.value_buy}\nVenta: $${dolarBlue.value_sell}`;
    } catch(error){
        console.error('Error al obtener el dolar:', error.message);
        return '❌ No se pudo obtener el valor del dólar blue en este momento.';
    }
        
}

module.exports = { obtenerDolarBlue };