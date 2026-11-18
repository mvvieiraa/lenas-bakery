
const express = require('express');

const encomendaRoutes = require('./routes/encomendaRoutes');

const app = express();
const PORTA = 3000;

app.use(express.json());

// Rotas
app.use(encomendaRoutes);

// Rota de teste
app.get('/status', (req, res) => {
    res.json({
        mensagem: 'Servidor Lena Bakery funcionando!'
    });
});

app.get('/', (req, res) => {
    res.send('Lena Bakery API está funcionando!');
});

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`);
});
