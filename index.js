import express from 'express';

const APP = express();
const PORT = 3000;

APP.get('/', (req, res) => {
  res.send('Hola gente de yutup!');
});

APP.listen(PORT, () => {
  console.log(`🟢 Server running on port ${PORT} 🟢`);
});
