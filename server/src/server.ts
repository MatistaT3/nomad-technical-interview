import express from 'express';
import cartRoutes from './routes/cart.routes';

const app = express();
const PORT = 4000;

app.use(express.json());

app.use(cartRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});