const express = require('express');
const blockchainController = require('../controllers/blockchainController')

const router = express.Router();

router.get('/:wallet/:limit', blockchainController.apiGetCall);

module.exports = router;