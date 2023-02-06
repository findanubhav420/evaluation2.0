const express = require('express')
const router = express.Router()
const {saveDataController,getCompanybySectorController,updateCompanyDataController} = require('../controllers/companyController')

router.route('/save').post(saveDataController)
router.route('/companies').get(getCompanybySectorController)
router.route('/companies/:id').put(updateCompanyDataController)

module.exports= router

