import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export default async function handler(req, res) {
    if (req.method === 'GET'){
      const response = await fetch('https://nextjs.desafiolab.com/api/tutorials', {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'GET',
      });
      const objeto = await response.json()
      return res.status(200).json(objeto)
    }
  }
  

  (async () => {
    // open the database
    const db = await open({
      filename: '/tmp/database.db',
      driver: sqlite3.Database
    })
    await db.exec('CREATE TABLE tutorials (id int primary key, titulo varchar, url varchar, img varchar, content varchar)');
    await db.exec('INSERT INTO tutorials (id, titulo, url, content) VALUES (1, "titulo 1", "url-one", "## title markdown one \n (contenido markdown)")')
    await db.exec('INSERT INTO tutorials (id, titulo, url, content) VALUES (2, "titulo 2", "url-two", "## title markdown two \n (contenido markdown)")')
    await db.exec('INSERT INTO tutorials (id, titulo, url, content) VALUES (3, "titulo 3", "url-three", "## title markdown three \n (contenido markdown)")')
    await db.exec('INSERT INTO tutorials (id, titulo, url, content) VALUES (4, "titulo 4", "url-four", "## title markdown four \n (contenido markdown)")')

    const result = await db.all('SELECT * FROM tutorials')
    console.log(result)
  })()
  
  // this is a top-level await 
