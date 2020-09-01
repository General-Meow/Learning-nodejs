const app = require('./app')

const port = process.env.PORT
const inMaintenanceMode = process.env.IN_MAINTENANCE_MODE == 'true' || false

//example of express middleware configured and executing for all routes
// app.use((req, resp, next) => {
//     if(inMaintenanceMode) {
//         return resp.status(503).send("Site is currently in maintenance mode")
//     }
//     next()
// })


app.listen(port, () => {
    console.log("server is up on port", port)
})
