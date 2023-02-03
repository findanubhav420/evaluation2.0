const axios = require('axios')
const {Company} = require('../../database/models')

function csvJSON(csvStr){
    var lines=csvStr.split('\n')
    var result = []
    var headers=lines[0].split(',')
    for(var i=1;i<lines.length;i++){
        var obj = {}
        var currentline=lines[i].split(',')
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j]
        }
        result.push(obj)
    }
    return result //JavaScript object
}
const parseToJSON = async (urlLink) => {
    const response = await axios.get(urlLink)
    const file = response.data
    const fileObj = csvJSON(file)
    return fileObj
}
const saveData = async (urlLink) => {
    const companies = await parseToJSON(urlLink)
    const companyDataDB = []
    for(const company of companies) {
        const companyId = company.company_id
        const data = await axios.get(`http://54.167.46.10/company/${companyId}`)

        // console.log(data.performanceIndex)
        const companyData = await data.data
        console.log(companyData)
        delete companyData.description
        companyDataDB.push(companyData)

        await Company.create({
            company_id:companyData.id,
            company_name:companyData.name,
            ceo_name:companyData.ceo,
            tags:companyData.tags,
            company_score:0
        })
    }
    // console.log(tempCompanyData)
    return companyDataDB
}

const saveCompanyScore = async (urlLink) => {
    const companies = await parseToJSON(urlLink)
    const companyDataDB = []
    for(const company of companies) {
        const company_sector = company.company_sector
        console.log(company_sector)
        const data = await axios.get(`http://54.167.46.10/sector?name=${company_sector}`)

        // console.log(data)
        const companyData = data.data
        // console.log(companyData)

        // companyDataDB.push(companyData)
        
        for(let i=0;i<companyData.length;i++){
            const score=((companyData[i].performanceIndex[0].value*10)+(companyData[i].performanceIndex[1].value/10000)+(companyData[i].performanceIndex[2].value*10)+companyData[i].performanceIndex[3].value)/4
            // console.log('*******', Company, companyData[i])
            console.log(score)
            await Company.update({company_score:score},
                {  where: {company_id:companyData[i].companyId}
                })
            // console.log(comp)
            // comp.company_score=((companyData[i].performanceIndex[0].value*10)+(companyData[i].performanceIndex[1].value/10000)+(companyData[i].performanceIndex[2].value*10)+companyData[i].performanceIndex[3].value)/4
            // await comp.save()
            
        }
       
    }
    // console.log(tempCompanyData)
    return companyDataDB
}

const getAllCompany=async ()=>{
    return await Company.findAll({
        attributes:['company_id','company_name','company_score']
    })
}
module.exports = {
    saveData,saveCompanyScore,getAllCompany
}

