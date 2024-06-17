import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';
import md5 from 'md5';

dotenv.config();
const app = express();


app.use(cors());

app.get('/characters/', async (req, res) => {
  const ts = Date.now()
  const apikey = process.env.APIKEY
  const secret = process.env.SECRET
  const hash = md5(ts + secret + apikey)
  const limit = 20
  const offset = req.query.offset || 0

  try {
    const response = await fetch(`${process.env.ENDPOINT_CHARACTERS}?limit=${limit}&offset=${offset}&ts=${ts}&apikey=${apikey}&hash=${hash}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error en el request ${response.status}');
    }
    const data = await response.json();
    const characters = data.data.results.map((character) => ({
      id: character.id,
      name: character.name,
      description: character.description,
      thumbnail: character.thumbnail
    }))
    res.json(characters);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});