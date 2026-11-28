require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const logger = require('./middlewares/logger');

const encomendaRoutes = require('./routes/encomendaRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORTA = 3000;


app.use(express.json());
app.use(cookieParser());
app.use(logger);


app.use(express.static(path.join(__dirname, '../frontend')));


app.use(authRoutes);


app.use(encomendaRoutes);


app.get('/status', (req, res) => {
    res.json({
        mensagem: 'Servidor Lena Bakery funcionando!'
    });
});


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});