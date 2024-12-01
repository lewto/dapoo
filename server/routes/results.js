import { Router } from 'express';
import { searchResults } from '../services/results.js';

const router = Router();

router.get('/:custId', async (req, res) => {
  try {
    const { custId } = req.params;
    const { startDate, endDate } = req.query;
    
    console.log('Fetching results for customer:', custId);
    const results = await searchResults(
      custId,
      startDate ? new Date(startDate) : undefined,
      endDate ? new Date(endDate) : undefined
    );
    
    res.json(results);
  } catch (error) {
    console.error('Error fetching race results:', error);
    res.status(500).json({ 
      error: 'Failed to fetch race results',
      message: error.message 
    });
  }
});

export default router;