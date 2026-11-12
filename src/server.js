
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/status', (req, res) => {
  res.status(200).json({
    mensagem: 'Lena’s Bakery API funcionando!',
    status: 'online'
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
