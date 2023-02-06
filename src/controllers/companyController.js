const services = require('../services/companyService')
const {HTTPError} = require('../utils/errors/error')

const saveDataController = async (req, res)=> {
    try{
        const urlLink = req.body.urlLink
        console.log(urlLink)
        const saveCompanyData = await services.saveData(urlLink)
        if(!saveCompanyData){
            throw new HTTPError({message: 'Error in saving data'})
        }
        res.status(201).json(saveCompanyData)
    }catch(error){
        if(error instanceof HTTPError){
            res.status(400).json(error.message)
        }else{
            console.log(error)
            res.status(500).json({message: 'Internal server error'})
        }
    }
}

const getCompanybySectorController=async(req,res)=>{
    try{
        const {sector} = req.query
        const company = await services.getCompanybySector(sector)
        if(!company){
            throw new HTTPError({message: 'Error in fetching data'})
        }
        res.status(200).json(company)
    }catch(error){
        if(error instanceof HTTPError){
            res.status(400).json(error.message)
        }else{
            console.log(error)
            res.status(500).json({message: 'Internal server error'})
        }
    }
}

const updateCompanyDataController=async(req,res)=>{
    try{
        const {id} = req.params
        const data= req.body
        const company = await services.updateCompanyData(id,data)
        if(!company){
            throw new HTTPError({message: 'Error in fetching data'})
        }

        res.status(200).json(company)

    }catch(error){
        if(error instanceof HTTPError){
            res.status(400).json(error.message)
        }else{
            console.log(error)
            res.status(500).json({message: 'Internal server error'})
        }
    }
}


module.exports = {
    saveDataController,getCompanybySectorController,updateCompanyDataController
}
//