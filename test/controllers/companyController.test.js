const controllers = require('../../src/controllers/companyController')
const services = require('../../src/services/companyService')

describe('creating database', () => {
    it('should fetch the data and create the database', async () => {
        const data = [{
            id: 'ad36a7f5-7630-496e-8628-e70981179668',
            name: 'Company ABC',
            score: 67.45
        }, {
            id: 'f6827fd2-656b-4264-b0cf-f449ab7a131d',
            name: 'Company DEF',
            score: 52.45
        }]
        jest.spyOn(services, 'saveData').mockResolvedValue(data)
        const mockReq = {
            body: {
                urlLink: 'http://abc.com'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await controllers.saveDataController(mockReq, mockRes)
        expect(mockRes.status).toBeCalledWith(201)
        expect(mockRes.json).toBeCalledWith(data)
    })
    it('should throw an error there is no data', async () => {
        jest.spyOn(services, 'saveData').mockResolvedValue(null)
        const mockReq = {
            body: {
                urlLink: 'http://abc.com'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await controllers.saveDataController(mockReq, mockRes)
        expect(mockRes.status).toBeCalledWith(400)
        expect(mockRes.json).toBeCalledWith({message: 'Error in saving data' })
    })
    it('should throw a server error', async () => {
        jest.spyOn(services, 'saveData').mockRejectedValue(null)
        const mockReq = {
            body: {
                urlLink: 'http://abc.com'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await controllers.saveDataController(mockReq, mockRes)
        expect(mockRes.status).toBeCalledWith(500)
        expect(mockRes.json).toBeCalledWith({message: 'Internal server error' })
    })
})
describe('get sector wise data', () => {
    it('should get the data of a particular sector', async () => {
        const data = [{
            id: 'ad36a7f5-7630-496e-8628-e70981179668',
            name: 'Company ABC',
            ceo: 'Some person name',
            score: 67.45
        }, {
            id: 'ad36a7f5-7630-496e-8628-e70981179668',
            name: 'Company DEF',
            ceo: 'Some person name',
            score: 62.45
        }]
        jest.spyOn(services, 'getCompanybySector').mockResolvedValue(data)
        const mockReq = {
            query: {
                sector: 'abc'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await controllers.getCompanybySectorController(mockReq, mockRes)
        expect(mockRes.status).toBeCalledWith(200)
        expect(mockRes.json).toBeCalledWith(data)
    })
    it('should throw an error there is no data', async () => {
        jest.spyOn(services, 'getCompanybySector').mockResolvedValue(null)
        const mockReq = {
            query: {
                sector: 'abc'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await controllers.getCompanybySectorController(mockReq, mockRes)
        expect(mockRes.status).toBeCalledWith(400)
        expect(mockRes.json).toBeCalledWith({message: 'Error in fetching data' })
    })
    it('should throw a server error', async () => {
        jest.spyOn(services, 'getCompanybySector').mockRejectedValue(null)
        const mockReq = {
            query: {
                sector: 'abc'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await controllers.getCompanybySectorController(mockReq, mockRes)
        expect(mockRes.status).toBeCalledWith(500)
        expect(mockRes.json).toBeCalledWith({message: 'Internal server error' })
    })
})
describe('edit company details', () => {
    it('should edit the details of a company', async () => {
        const data = [{
            id: 'ad36a7f5-7630-496e-8628-e70981179668',
            name: 'Company ABC',
            ceo: 'Changed name',
            score: 67.45
        }]
        jest.spyOn(services, 'updateCompanyData').mockResolvedValue(data)
        const mockReq = {
            params: {
                company_id: 'ad36a7f5-7630-496e-8628-e70981179668'
            },
            body: {
                ceo_name: 'Changed name'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await controllers.updateCompanyDataController(mockReq, mockRes)
        expect(mockRes.status).toBeCalledWith(200)
        expect(mockRes.json).toBeCalledWith(data)
    })
    it('should throw an error there is no data', async () => {
        jest.spyOn(services, 'updateCompanyData').mockResolvedValue(null)
        const mockReq = {
            params: {
                company_id: 'ad36a7f5-7630-496e-8628-e70981179668'
            },
            body: {
                ceo_name: 'Changed name'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await controllers.updateCompanyDataController(mockReq, mockRes)
        expect(mockRes.status).toBeCalledWith(400)
        expect(mockRes.json).toBeCalledWith({message: 'Error in fetching data' })
    })
    it('should throw a server error', async () => {
        jest.spyOn(services, 'updateCompanyData').mockRejectedValue(null)
        const mockReq = {
            params: {
                company_id: 'ad36a7f5-7630-496e-8628-e70981179668'
            },
            body: {
                ceo_name: 'Changed name'
            }
        }
        const mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await controllers.updateCompanyDataController(mockReq, mockRes)
        expect(mockRes.status).toBeCalledWith(500)
        expect(mockRes.json).toBeCalledWith({message: 'Internal server error'})
    })
})
  