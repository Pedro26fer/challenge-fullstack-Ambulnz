import express from 'express'
import { AppDataSource } from './data-source'

AppDataSource.initialize()
    .then(() => {
        const app = express()

        app.use(express.json())
        
        return app.listen(process.env.PORT || 3000)
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })