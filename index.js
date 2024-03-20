require('dotenv/config');

const express = require('express');
const expressListRoutes = require('express-list-routes');
const cors = require('cors')
const bodyParser = require('body-parser');
const errorHandler = require('./src/middlewares/error')
const { color, log, red, green, cyan, cyanBright } = require('console-log-colors');

const app = express();

// Body parser
app.use(bodyParser.json());

// Set security headers
// app.use(helmet())

// Prevent XSS attacks
// app.use(xss())

// Rate limiting
// const limiter = rateLimit({
//     windowMs: 10 * 60 * 100, // 10 mins
//     max: 100
// })
// app.use(limiter)

// Prevent http param pollution
// app.use(hpp())

// Enable CORS
app.use(cors())

// Public static file
app.use(express.static('src/images/public'))

// Mount routes
require('./src/routers/routers')(app);

// Middleware error handler
app.use(errorHandler)

// List all routes
expressListRoutes(app)

app.listen(process.env.PORT || '4000', () => {
    console.log(green(`Server is running on port: ${process.env.PORT || '3000'}`));
})

