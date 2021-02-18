import express, {Express} from 'express'
import { userRouter, imageRouter } from './src/router/router'
import cors from 'cors'
import dotenv from 'dotenv'
import { createTables } from './src/services/mySqlSetup'
dotenv.config()


/**************************** CONFIG ******************************/
const app: Express = express()
app.use(express.json())
app.use(cors())


/**************************** SQL SETUP ***************************/
createTables.createTables()


/**************************** ENDPOINTS ***************************/
app.use('/user', userRouter)
app.use('/image', imageRouter)



/**************************** SERVER INIT *************************/
app.listen(process.env.PORT || process.env.LOCAL_PORT, () => {
    console.log(`Server running on port ${process.env.PORT || process.env.LOCAL_PORT}`)
})
