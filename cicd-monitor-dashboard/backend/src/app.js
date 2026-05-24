import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import deploymentRoutes from './routes/deploymentRoutes.js';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.use('/api/deployments', deploymentRoutes);

export default app;