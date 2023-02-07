const utils = require('../utils/companyUtils')
const {Company} = require('../../database/models')

const saveData = async (urlLink) => {
    const companies = await utils.parseToJSON(urlLink)
    for(const company of companies) {
        const companyId = company.company_id
        const companyData = await utils.getData(companyId)
        await Company.create({
            company_id:companyData.id,
            company_name:companyData.name,
            ceo_name:companyData.ceo,
            tags:companyData.tags,
            company_score:0
        })
    }
    for(const company of companies) {
        const company_sector = company.company_sector
        const companyData = await utils.getSectorData(company_sector)

        for(let i=0;i<companyData.length;i++){
            const score=((companyData[i].performanceIndex[0].value*10)+(companyData[i].performanceIndex[1].value/10000)+(companyData[i].performanceIndex[2].value*10)+companyData[i].performanceIndex[3].value)/4
            await Company.update({company_score:score,sector:company_sector},
                {  where: {company_id:companyData[i].companyId}
                })     
        }
       
    }
    return await Company.findAll({
        attributes:['company_id','company_name','company_score']
    })
}

const getCompanybySector=async (sector)=>{
    const response = await Company.findAll({
        where:{sector:sector},
        attributes:['company_id','company_name','ceo_name','company_score']
    })
    const rankList=utils.sortList(response)
    return rankList
}

const updateCompanyData=async(companyId,data)=>{
    return await Company.update(data,{
        where:{company_id:companyId}
    })
}

module.exports = {
    saveData,getCompanybySector,updateCompanyData
}

