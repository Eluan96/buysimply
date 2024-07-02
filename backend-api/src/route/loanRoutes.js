import { Router} from 'express';
import { deleteLoan, getAllLoans, getExpiredLoans, getLoansByStatus, getLoansByUserEmail } from '../controller/loanControllers.js';
import { auth } from '../middleware/auth.js';


const router = Router()

router.get('/get-all-loans', auth, getAllLoans)
router.get('/get-loans-by-status', auth, getLoansByStatus)
router.get('get-loans-by-email', auth, getLoansByUserEmail)
router.get('/get-loans-by-expiryDate', auth, getExpiredLoans)
router.delete('/delete-loan/:id', auth, deleteLoan)

export default router