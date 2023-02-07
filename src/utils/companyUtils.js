const axios =require ('axios')

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
    return result
}

const parseToJSON = async (urlLink) => {
    const response = await axios.get(urlLink)
    const file = response.data
    const fileObj = csvJSON(file)
    return fileObj
}

const getData=async (companyId)=>{
    const data = await axios.get(`http://localhost:4000/company/${companyId}`)
    return data.data
}

const getSectorData=async (company_sector)=>{
    const data = await axios.get(`http://localhost:4000/sector?name=${company_sector}`)
    return data.data
}

const sortList=(list)=>{
    const rankList=list.sort((a,b)=>b.company_score-a.company_score)
    for(let res of rankList){
        Object.assign(res.dataValues,{ranking:rankList.indexOf(res)+1})
    }
    return rankList
}

module.exports = {
    parseToJSON,getData,getSectorData,sortList
}