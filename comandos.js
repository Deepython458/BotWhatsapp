const { agregarInventario, registrarVenta, obtenerInventario, obtenerCash } = require('./inventario');
const { obtenerDolarBlue } = require('./dolar');


function mostrarOpciones() {
    return `𝐂𝐎𝐌𝐀𝐍𝐃𝐎𝐒 𝐃𝐈𝐒𝐏𝐎𝐍𝐈𝐁𝐋𝐄𝐒:

/𝐨𝐩𝐜𝐢𝐨𝐧𝐞𝐬 - Mostrar comandos 💬

/𝐢𝐧𝐯𝐞𝐧𝐭𝐚𝐫𝐢𝐨 - Ver inventario 👁️

/𝐚𝐠𝐫𝐞𝐠𝐚𝐫 - Agregar inventario ✅ (indicando letra y cantidad)

/𝐯𝐞𝐧𝐭𝐚 - Registrar venta ❎ (indicando letra y precio)

/𝐜𝐚𝐬𝐡 - Ver plata obtenida 💰`;
}

 async function manejarMensaje(numero, mensaje, estados) {
    mensaje = mensaje.toLowerCase().trim();

    if (!estados[numero]) estados[numero] = { paso: null }; // ✅ CORREGIDO

    if (estados[numero].paso === 'agregar') {
        const [letra, cantidadStr] = mensaje.split(' ');
        const cantidad = parseInt(cantidadStr, 10);

        if (agregarInventario(letra, cantidad)) { // ✅ estaba mal escrito "agregarInvetario"
            estados[numero].paso = null;
            return `✅ Se agregaron ${cantidad} unidades de ${obtenerInventario()[letra].sabor}. Total: ${obtenerInventario()[letra].cantidad}`;
        } else {
            return 'Formato incorrecto o sabor inválido. Escribí letra y cantidad, ej: a 5';
        }
    }

    else if (estados[numero].paso === 'venta') {
        const [letra, precioStr] = mensaje.split(' ');
        const precio = parseFloat(precioStr);

        if (registrarVenta(letra, precio)) {
            estados[numero].paso = null;
            return `✅ Venta registrada: 1 unidad de ${obtenerInventario()[letra].sabor} a $${precio}. Inventario restante: ${obtenerInventario()[letra].cantidad}`;
        } else {
            return 'No hay unidades disponibles o formato incorrecto. Escribí letra y precio.';
        }
    }

    else {
        if (mensaje === '/opciones') {
            return mostrarOpciones();
        }
        else if (mensaje === '/inventario') {
            const inv = obtenerInventario();
            let texto = 'ɪɴᴠᴇɴᴛᴀʀɪᴏ :\n';
            for (const letra in inv) {
                texto += `${letra} - ${inv[letra].sabor}: ${inv[letra].cantidad}\n`;
            }
            return texto;
        }
        else if (mensaje === '/agregar') {
            estados[numero].paso = 'agregar';
            return 'Escribí la letra y la cantidad que querés agregar, ej: a 5'; // ✅ corregido ":" por ";"
        }
        else if (mensaje === '/venta') {
            estados[numero].paso = 'venta';
            return 'Escribí la letra del sabor y el precio, ej: b 150';
        }
        else if (mensaje === '/cash') {
            const { total, ganancia } = obtenerCash();
            let respuesta = `💵 Plata recaudada: $${total.toLocaleString('es-AR', { minimumFractionDigits: 2 })}\n`;

            if (ganancia > 0) {
                respuesta += `🎉 Ganancia: $${ganancia.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`;
            } else {
                respuesta += `📉 Aún no hay ganancia.`;
            }

            return respuesta;
        }
        else if (mensaje === '/dolar') {
            return obtenerDolarBlue();
        }
        else {
            return 'No entendí. Escribí /opciones para ver los comandos genio.';
        }
    }
}

module.exports = { manejarMensaje }; 
