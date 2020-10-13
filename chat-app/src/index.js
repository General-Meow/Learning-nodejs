const httpServer = require('./express-init')

const port = process.env.PORT || 3000

httpServer.listen(port, () => {
    console.log(`Express is now running on port ${port}`)
})