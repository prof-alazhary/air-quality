const axios = require('axios');
const { getAirQuality, getMostPolluted } = require('../controllers/airQualityController');
const AirQuality = require('../models/airQualityModel');

describe('Air Quality Controller', () => {
    describe('getAirQuality', () => {
        it('should fetch air quality data correctly', async () => {
            const mockedResponse = {
                data: {
                    data: {
                        city: "paris",
                        current: {
                            pollution: {
                                ts: '2024-03-27T18:00:00.000Z',
                                aqius: 83,
                                mainus: 'p2',
                                aqicn: 39,
                                maincn: 'p2'
                            }
                        }
                    }
                }
            };

            sinon.stub(axios, 'get').resolves(mockedResponse);
            sinon.stub(AirQuality, 'create').returns(Promise.resolve());
            const req = { params: { latitude: '123', longitude: '456' } };
            const res = { json: sinon.stub() };
            await getAirQuality(req, res);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.firstCall.args[0]).to.deep.equal({ results: { pollution: mockedResponse.data.data.current.pollution } });
            AirQuality.create.restore();
            axios.get.restore();
        });
    });

    describe('getMostPolluted', () => {
        const mockedResponse = {
            pollution: {
                ts: '2024-03-27T18:00:00.000Z',
                aqius: 60,
                mainus: 'p2',
                aqicn: 4,
                maincn: 'p2',
                date: '2024-03-27T19:07:01.102Z'
            },
            city: 'paris',
            _id: '66046e55d947eae58a7e4328',
        };
        beforeEach(() => {

            sinon.stub(AirQuality, 'findOne').resolves(mockedResponse);
        })
        afterEach(() => {

            AirQuality.findOne.restore();
        })
        it('should return most polluted data when data is available', async () => {
            const req = { params: { city: 'paris' } };
            const res = { json: sinon.stub() };

            await getMostPolluted(req, res);

            expect(AirQuality.findOne.firstCall.args[0]).to.deep.equal({ city: 'paris' });
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.firstCall.args[0]).to.deep.equal({ mostPollutedData: mockedResponse });

        });
        it('should return most polluted data whenever the city param provided in capital letter cases', async () => {
            const req = { params: { city: 'PARIS' } };
            const res = { json: sinon.stub() };

            await getMostPolluted(req, res);

            expect(AirQuality.findOne.firstCall.args[0]).to.deep.equal({ city: 'paris' });
            expect(AirQuality.findOne.firstCall.args[0]).to.not.deep.equal({ city: 'PARIS' });
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.firstCall.args[0]).to.deep.equal({ mostPollutedData: mockedResponse });

        });
        it('should return most polluted data whenever the city param is not provided', async () => {
            const req = { params: {} };
            const res = { json: sinon.stub() };

            await getMostPolluted(req, res);

            expect(AirQuality.findOne.firstCall.args[0]).to.deep.equal({});
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.firstCall.args[0]).to.deep.equal({ mostPollutedData: mockedResponse });

        });
    });
});