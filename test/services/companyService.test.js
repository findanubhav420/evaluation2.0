const services = require('../../src/services/companyService')
const {Company} = require('../../database/models')

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
            ],
            'company_score': 0
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
            ],
            'company_score': 0
        }]
        jest.spyOn(Company, 'create').mockResolvedValue(data)
        const dataDb = await services.saveData('https://store-0001.s3.amazonaws.com/input.csv')
        expect(dataDb).toEqual(data)
    }, 40000)
})