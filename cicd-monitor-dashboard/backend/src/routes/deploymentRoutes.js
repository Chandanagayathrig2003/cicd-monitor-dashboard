import express from 'express';

const router = express.Router();

// Mock deployment data
let deployments = [
  {
    id: '1',
    projectName: 'payment-service',
    environment: 'production',
    status: 'RUNNING'
  },
  {
    id: '2',
    projectName: 'auth-service',
    environment: 'staging',
    status: 'SUCCESS'
  },
  {
    id: '3',
    projectName: 'notification-service',
    environment: 'production',
    status: 'FAILED'
  }
];

// GET all deployments
router.get('/', async (req, res) => {
  res.json(deployments);
});

// Retry deployment
router.put('/:id/retry', async (req, res) => {
  const { id } = req.params;

  deployments = deployments.map((deployment) => {
    if (deployment.id === id) {
      return {
        ...deployment,
        status: 'RUNNING'
      };
    }

    return deployment;
  });

  res.json({
    success: true,
    message: 'Deployment restarted'
  });
});

export default router;
