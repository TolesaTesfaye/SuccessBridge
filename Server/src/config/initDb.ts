import { Client } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

export const initializeDatabase = async () => {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: 'postgres',
  })

  try {
    await client.connect()
    console.log('Connected to PostgreSQL server')

    const dbName = process.env.DB_NAME || 'learning_platform'

    const result = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName],
    )

    if (result.rows.length === 0) {
      await client.query(`CREATE DATABASE ${dbName}`)
      console.log(`Database '${dbName}' created successfully`)
    } else {
      console.log(`Database '${dbName}' already exists`)
    }
  } catch (error) {
    console.error('Error initializing database:', error)
    throw error
  } finally {
    await client.end()
  }
}
