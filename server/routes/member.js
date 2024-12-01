import { Router } from 'express';
import { getMemberInfo } from '../services/member.js';

const router = Router();

router.get('/test/:custId', async (req, res) => {
  try {
    const { custId } = req.params;
    console.log('Testing member info for customer:', custId);
    
    const memberInfo = await getMemberInfo(custId);
    console.log('Member info:', memberInfo);
    
    res.json({ 
      success: true,
      data: memberInfo
    });
  } catch (error) {
    console.error('API test error:', error);
    res.status(500).json({ 
      error: 'API test failed',
      message: error.message
    });
  }
});

export default router;