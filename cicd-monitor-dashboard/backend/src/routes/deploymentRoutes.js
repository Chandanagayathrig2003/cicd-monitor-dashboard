import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  res.json([
    {
      id: '1',
      projectName: 'payment-service',
      environment: 'production',
      status: 'RUNNING'
    }
  ]);
});

export default router;