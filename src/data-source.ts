import {DataSource} from 'typeorm'
import dotenv from 'dotenv'
import 'reflect-metadata'
import path from 'path'


dotenv.config()

const entitiesPath: string = path.join(__dirname, './entities/**.{ts,')
const migrationPath: string = path.join(__dirname, './migrations/**.{ts,')

export const AppDataSource  = 
process.env.NODE_ENV === "test"
? new DataSource({
    type: "sqlite",
    database: ":memory:",
    entities: ["src/entities/**/*.ts"],
    synchronize: true,
  })
: new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: [entitiesPath],
    migrations: [migrationPath],
  });






