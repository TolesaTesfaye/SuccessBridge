import express from 'express'
import { PaymentService } from '../services/paymentService.js'
import { authMiddleware, requireRole } from '../middleware/auth.js'
import { uploadToB2 } from '../middleware/b2Upload.js'
import multer from 'multer'

const router = express.Router()
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit for payment screenshots
  },
  fileFilter: (req, file, cb) => {
    // Only allow image files for payment screenshots
    if (file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed for payment screenshots'))
    }
  },
})

/**
 * @route   POST /api/payments
 * @desc    Create a new payment request
 * @access  Private (Student)
 */
router.post('/', authMiddleware, upload.single('screenshot'), async (req, res, next) => {
  try {
    console.log('📝 Payment request received')
    console.log('🔍 Headers:', {
      authorization: req.headers.authorization ? 'Present' : 'Missing',
      contentType: req.headers['content-type'],
    })
    console.log('👤 User:', req.user ? `${req.user.id} (${req.user.role})` : 'UNDEFINED')
    console.log('📎 File:', req.file ? `${req.file.originalname} (${req.file.size} bytes)` : 'Missing')
    console.log('📦 Body keys:', Object.keys(req.body))
    console.log('📦 Body values:', {
      subjectId: req.body.subjectId,
      amount: req.body.amount,
      educationLevel: req.body.educationLevel,
      grade: req.body.grade,
    })

    if (!req.user) {
      console.error('❌ User not authenticated')
      return res.status(401).json({ success: false, error: 'Authentication required' })
    }

    if (!req.file) {
      console.error('❌ No file uploaded')
      return res.status(400).json({ success: false, error: 'Payment screenshot is required' })
    }

    console.log('📸 File details:', {
      fieldname: req.file.fieldname,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      hasBuffer: !!req.file.buffer,
    })

    // Upload screenshot to B2
    const screenshotUrl = await uploadToB2(req, req.file, 'payments')

    const paymentData = {
      userId: req.user.id,
      subjectId: req.body.subjectId,
      amount: parseFloat(req.body.amount),
      currency: req.body.currency || 'ETB',
      paymentMethod: req.body.paymentMethod,
      screenshotUrl,
      transactionReference: req.body.transactionReference,
      notes: req.body.notes,
      educationLevel: req.body.educationLevel,
      grade: req.body.grade,
      stream: req.body.stream,
      universityId: req.body.universityId,
      departmentId: req.body.departmentId,
    }

    console.log('💾 Creating payment with data:', {
      userId: paymentData.userId,
      subjectId: paymentData.subjectId,
      amount: paymentData.amount,
      educationLevel: paymentData.educationLevel,
    })

    const payment = await PaymentService.createPayment(paymentData)

    console.log('✅ Payment created successfully:', payment.id)

    res.status(201).json({
      success: true,
      data: payment,
      message: 'Payment request submitted successfully. Awaiting admin approval.',
    })
  } catch (error) {
    console.error('❌ Payment creation error:', error)
    next(error)
  }
})

/**
 * @route   GET /api/payments
 * @desc    Get payments (filtered)
 * @access  Private (Admin/Super Admin for all, Student for own)
 */
router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const filters: any = {
      page: req.query.page,
      limit: req.query.limit,
      status: req.query.status,
      subjectId: req.query.subjectId,
      educationLevel: req.query.educationLevel,
      universityId: req.query.universityId,
      departmentId: req.query.departmentId,
    }

    // Students can only see their own payments
    if (req.user!.role === 'student') {
      filters.userId = req.user!.id
    } else if (req.query.userId) {
      filters.userId = req.query.userId
    }

    const result = await PaymentService.getPayments(filters)

    res.json({
      success: true,
      ...result,
    })
  } catch (error) {
    next(error)
  }
})

/**
 * @route   GET /api/payments/stats
 * @desc    Get payment statistics
 * @access  Private (Admin/Super Admin)
 */
router.get('/stats', authMiddleware, requireRole('admin', 'super_admin'), async (req, res, next) => {
  try {
    const stats = await PaymentService.getPaymentStats()

    res.json({
      success: true,
      data: stats,
    })
  } catch (error) {
    next(error)
  }
})

/**
 * @route   GET /api/payments/my-payments
 * @desc    Get current user's payment history
 * @access  Private (Student)
 */
router.get('/my-payments', authMiddleware, async (req, res, next) => {
  try {
    const result = await PaymentService.getPayments({
      userId: req.user!.id,
      page: 1,
      limit: 100, // Get all user payments
    })

    res.json({
      success: true,
      data: result.data,
      total: result.total,
    })
  } catch (error) {
    next(error)
  }
})

/**
 * @route   GET /api/payments/access/check/:subjectId
 * @desc    Check if user has access to a subject
 * @access  Private (Student)
 */
router.get('/access/check/:subjectId', authMiddleware, async (req, res, next) => {
  try {
    const hasAccess = await PaymentService.checkSubjectAccess(req.user!.id, req.params.subjectId)

    res.json({
      success: true,
      data: { hasAccess },
    })
  } catch (error) {
    next(error)
  }
})

/**
 * @route   GET /api/payments/access/my-subjects
 * @desc    Get user's subject access list
 * @access  Private (Student)
 */
router.get('/access/my-subjects', authMiddleware, async (req, res, next) => {
  try {
    const accessList = await PaymentService.getUserSubjectAccess(req.user!.id)

    res.json({
      success: true,
      data: accessList,
    })
  } catch (error) {
    next(error)
  }
})

/**
 * @route   GET /api/payments/:id
 * @desc    Get a single payment by ID
 * @access  Private
 */
router.get('/:id', authMiddleware, async (req, res, next) => {
  try {
    const payment = await PaymentService.getPaymentById(req.params.id)

    // Students can only view their own payments
    if (req.user!.role === 'student' && payment.userId !== req.user!.id) {
      return res.status(403).json({ success: false, error: 'Access denied' })
    }

    res.json({
      success: true,
      data: payment,
    })
  } catch (error) {
    next(error)
  }
})

/**
 * @route   PUT /api/payments/:id/approve
 * @desc    Approve a payment request
 * @access  Private (Admin/Super Admin)
 */
router.put('/:id/approve', authMiddleware, requireRole('admin', 'super_admin'), async (req, res, next) => {
  try {
    const result = await PaymentService.approvePayment(req.params.id, req.user!.id)

    res.json({
      success: true,
      data: result,
      message: 'Payment approved and subject access granted',
    })
  } catch (error) {
    next(error)
  }
})

/**
 * @route   PUT /api/payments/:id/reject
 * @desc    Reject a payment request
 * @access  Private (Admin/Super Admin)
 */
router.put('/:id/reject', authMiddleware, requireRole('admin', 'super_admin'), async (req, res, next) => {
  try {
    const { rejectionReason } = req.body

    if (!rejectionReason) {
      return res.status(400).json({ success: false, error: 'Rejection reason is required' })
    }

    const payment = await PaymentService.rejectPayment(req.params.id, req.user!.id, rejectionReason)

    res.json({
      success: true,
      data: payment,
      message: 'Payment rejected',
    })
  } catch (error) {
    next(error)
  }
})

export default router
