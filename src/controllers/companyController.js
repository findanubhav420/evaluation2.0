const services = require('../services/companyService')
const HTTPError = require('../utils/errors/error')

const saveDataController = async (req, res)=> {
    // try{
    const urlLink = req.body.urlLink
    console.log(urlLink)
    const saveCompanyData = await services.saveData(urlLink)
    // if(!saveCompanyData){
    //     throw new HTTPError('HTTP Error')
    // }
    res.status(201).send(saveCompanyData)
    // }catch(error){
    //     if(error instanceof HTTPError){
    //         res.status(400).send(error.message)
    //     }else{
    //         console.log(error)
    //         res.status(500).send('Internal server error')
    //     }
    // }
}
const saveCompanyScoreController=async(req,res)=>{
    const urlLink = req.body.urlLink
    const saveScore = await services.saveCompanyScore(urlLink)
    res.status(201).send(saveScore)
}
const getAllCompanyController= async(req,res)=>{
    const company =await services.getAllCompany()
    res.status(200).json(company)
}
module.exports = {
    saveDataController,saveCompanyScoreController,getAllCompanyController
}