const express = require("express");
var bodyParser = require('body-parser')
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });;
const routes = require('./routes/routes')
// const middleware = require('./middleware');
// const nodemailer = require('nodemailer');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require("swagger-jsdoc");
// const swaggerDocument = require('./swagger.json');
const servicesRouter = require("./routes/routes");

const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
// app.use(middleware.decodeToken);
app.use(servicesRouter)

const options = {
  explorer: true,
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Home Services API",
			version: "1.0.0",
			description: "A simple Express Home Services API",
		},
    basePath: '/',
		servers: [
			{
				url: "https://home-services-backend.azurewebsites.net/",
			},
		],
	},
	apis: [`*/routes/*.js`, `*/model/*.js`],
};
// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/api-docs/swagger.json", (req, res) => res.json(swaggerDocument));



const db = require("./model");
db.sequelize.sync();

// get driver connection
// // const dbo = require("./db/conn");
// const adminController = require('./controllers/admin');
// const userController = require('./controllers/user')
// const workerController = require('./controllers/worker')
// const jobController = require('./controllers/job')
// const serviceController = require('./controllers/service');
// const reviewController = require('./controllers/review')

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});


