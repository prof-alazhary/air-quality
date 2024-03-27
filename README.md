# Air Quality Service

This project serves as the backend for retrieving air quality information via RESTful APIs. It integrates with external air quality data sources to provide real-time pollution data for various locations.

## Installation:

All what you need to do is:

```bash
> docker-compose up --build
```

## APIs:

#### 1) `GET /api/air-quality/:latitude/:longitude`:
 Retrieves air quality data for a given latitude and longitude.

```json
{
    "results": {
        "pollution": {
            "ts": "2024-03-27T18:00:00.000Z",
            "aqius": 83,
            "mainus": "p2",
            "aqicn": 39,
            "maincn": "p2"
        }
    }
}
```

#### 2) `GET /api/most-polluted/:city`:
 Retrieves data about the most polluted air time for a specific city.
```json
// you can perform any of these APIs:
// GET api/most-polluted/
// GET api/most-polluted/paris
// GET api/most-polluted/PARIS

{
    "mostPollutedData": {
        "pollution": {
            "ts": "2024-03-27T18:00:00.000Z",
            "aqius": 60,
            "mainus": "p2",
            "aqicn": 4,
            "maincn": "p2",
            "date": "2024-03-27T19:07:01.102Z"
        },
        "_id": "66046e55d947eae58a7e4328",
        "city": "paris",
        "__v": 0
    }
}
```

## Framework and Necessary Packages:
- Tech: Nodejs
- Framework: Express.js
- Packages: Mongoose (for MongoDB interactions), Axios (for making HTTP requests)

## Code Folder Structure:
```bash
air-quality/
│
├── config/              # Configuration files
├── controllers/         # Controllers for handling API requests
├── models/              # MongoDB models
├── routes/              # API route definitions
├── tests/               # Unit tests
├── .gitignore
├── package.json
├── server.js            # Entry point of the application
└── README.md            # This README file

```

## Unit Test:
```bash
npm run test
```



## License

[MIT](https://choosealicense.com/licenses/mit/)