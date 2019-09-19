const express = require('express');
const RecordController = require('../controllers/record');

const router = express.Router();

/**
 * @swagger
 * /api/record/getRecords:
 *   post:
 *     tags:
 *       - Record
 *     description: Get records
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: startDate
 *         description: Start date as YYYY-MM-DD
 *         in: formData
 *         required: true
 *         type: string
 *       - name: endDate
 *         description: End date as YYYY-MM-DD
 *         in: formData
 *         required: true
 *         type: string
 *       - name: minCount
 *         description: minimum sum of counts
 *         in: formData
 *         required: true
 *         type: number
 *       - name: maxCount
 *         description: maximum sum of counts
 *         in: formData
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: success, returns records
 *       404:
 *         description: no record found
 */

router.post('/getRecords', async (req, res) => { await RecordController.getRecords(req, res); });

module.exports = router;
