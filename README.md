# doctor-case-label
Web app for reviewing and labeling EHRs.

## Running the application

### Setup

#### Mongo DB

The applicatoin requires a Mongo DB server. Just export the uri to MONGODB_URI environment variable before start,

#### Sample Data

If you need sample data to test the app, you can populate the DB by calling the provided `load_sample_data` script, that will add the fixtures used for testing to the DB.

```
$ bin/load_sample_data
```

### Starting the server

After the setup is done, you can start the server with:
```
$ npm start
```

## Development

The project includes tests for the backend, which can be run with:
```
$ npm testwatch
```
