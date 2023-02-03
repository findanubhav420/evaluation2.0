const express = require('express')
const router = express.Router()
const {saveDataController,saveCompanyScoreController, getAllCompanyController} = require('../controllers/companyController')

router.route('/save').post(saveDataController)
router.route('/save1').post(saveCompanyScoreController)
router.route('/company').get(getAllCompanyController)
module.exports= router

