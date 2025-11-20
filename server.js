const express = require('express');
const cors = require('cors');

const pessoajuridicaRoutes = require('./src/routes/pessoajuridicaRoutes');
const pessoafisicaRoutes = require('./src/routes/pessoafisicaRoutes');

const Port = 3000;
const app = express();

// === APLICAR CORS NO SERVIDOR CERTO ===
app.use(cors({
   origin: '*',
   methods: 'GET,POST,PUT,DELETE',
   allowedHeaders: 'Content-Type'
}));

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

function testeServidor(req, resp) {
   resp.send({
      servidor: "localhost",
      status: "ok", databaseType: "mysql"
   });
}

app.get('/api', (req, res) => {
   res.send({ msg: "API funcionando!" });
});

app.get('/servidor', (req, resp) => testeServidor(req, resp));

app.use('/api/pessoajuridica', pessoajuridicaRoutes);
app.use('/api/pessoafisica', pessoafisicaRoutes);

app.listen(Port, () => { 
    console.log(`servidor rodando na porta: ${Port} !`);
});
