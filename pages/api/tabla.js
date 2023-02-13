
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

  export default async function handler(req, res) {
    (async () => {
        // open the database
        const db = await open({
          filename: './ProcessedOrders.db',
          driver: sqlite3.Database
        })
        const result = await db.all('SELECT * FROM tutorials')
        console.log(result)
        // const db2 = new sqlite3.Database(':memory:');
        return res.status(200).json(result)
    })()
  }
