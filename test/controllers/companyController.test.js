const controllers = require('../../src/controllers/companyController')
const services = require('../../src/services/companyService')

describe('saves company data to the database', ()=>{
    it('should save company data', async()=>{
        const data=[    {
            'id': '95b5a067-808a-44a9-a490-b4ef8a045f61',
            'name': 'Volkswagen',
            'ceo': 'Mr. Kim Carter',
            'tags': [
                'distributed',
                'bricks-and-clicks',
                'ubiquitous',
                'bleeding-edge',
                'seamless',
                'sticky',
                'transparent',
                'front-end',
                'holistic'
            ]
        },
        {
            'id': '46e1d061-e39d-4d5c-8e0e-3fa5d45d9efc',
            'name': 'Apple',
            'ceo': 'Lena Kunde',
            'tags': [
                'holistic',
                'intuitive',
                '24/365',
                'innovative',
                'cross-platform',
                'out-of-the-box',
                'ubiquitous',
                'sticky',
                'bleeding-edge'
            ]
        }]
        const mockReq = {
            body: {
                urlLink: 'http://xyz.com'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }
        jest.spyOn(services, 'saveData').mockResolvedValue(data)
        await controllers.saveDataController(mockReq, mockRes)
        expect(mockRes.status).toBeCalledWith(201)
        expect(mockRes.send).toBeCalledWith(data)
    })
})

describe('saves company score to the database', ()=>{
    it('should save company score', async()=>{
        const mockReq = {
            body: {
                urlLink: 'http:/xyz.com'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }
        jest.spyOn(services, 'saveCompanyScore').mockResolvedValue([])
        await controllers.saveCompanyScoreController(mockReq, mockRes)
        expect(mockRes.status).toBeCalledWith(201)
        expect(mockRes.send).toBeCalledWith([])
    })
})

describe('returns list of all companies with required details', ()=>{
    it('should give company details', async()=>{
        const data = [{
            company_id: 123,
            company_name: 'harsh',
            company_score: 29,
        },{
            company_id: 124,
            company_name: 'anubhav',
            company_score: 30,
        }]

        jest.spyOn(services, 'getAllCompany').mockResolvedValue(data)

        const mockReq = {}
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await controllers.getAllCompanyController(mockReq, mockRes)

        expect(mockRes.status).toBeCalledWith(200)
        expect(mockRes.json).toBeCalledWith(data)
    })
})