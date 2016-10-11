/* Company Confidential, Copyright (c) 2016 CRF Box, Ltd. All Rights Reserved. */
import express from 'express';
import getAllServices from '../queries.js';

const router = express.Router();

/* GET home page */
router.get('/services', getAllServices);

module.exports = router;
