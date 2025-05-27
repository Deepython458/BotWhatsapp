const express = require('express');
const app = express();
const { manejarMensaje } = require('./comandos');

app.use(express.urlencoded({ extended: false }));

const estados = {};

app.post('/', async(req, res) => {
  const mensaje = req.body.Body || '';
  const numero = req.body.From;

  const respuesta = await manejarMensaje(numero, mensaje, estados);

  res.set('Content-Type', 'text/xml');
  res.send(`
    <Response>
      <Message>${respuesta}</Message>
    </Response>
  `);
});

app.listen(3000, () => {
  console.log('Bot escuchando activo en http://localhost:3000');
});
