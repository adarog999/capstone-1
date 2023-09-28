const express = require('express')
const router = express.Router()
const axios = require('axios');
const request = require('request')
const { getChart } = require('billboard-top-100')
const SpotifyWebApi = require("spotify-web-api-node")

const qs = require('qs')

router.get('/',async (req,res) => {
    const options = {
        method: 'GET',
        url: 'https://spotify23.p.rapidapi.com/search/',
        params: {
          q: 'Philippines',
          type: 'multi',
          offset: '0',
          limit: '10',
          numberOfTopResults: '5'
        },
        headers: {
          'X-RapidAPI-Key': '0e6631cb71msh89af0bed2653003p1ee4fcjsn7d6287cd5a50',
          'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data.artist);
          res.send(response.data.artist)
      } catch (error) {
          console.error(error);
      }
      
})



const getToken = async () => {
//   const clientId = '35d1441c9453418e9ffde36056b7e18a';
// const clientSecret = '09d4b0eb20ea49e1b10c81a4838208e4';
const clientId = '19fbdf7da84944f9b97c09fd3fd72c01';
const clientSecret = 'ccfeac71ce444879ab7160c17dead119';
// Function to request an access token
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  const data = {
    grant_type: 'client_credentials',
  };
  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      qs.stringify(data),
      {
        headers,
        auth: {
          username: clientId,
          password: clientSecret,
        },
      }
    );
    return response.data.access_token;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Function to get artist data using the access token
const getArtistData = async (accessToken, artistId) => {
  try {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };
    const { data } = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/related-artists`,
      { headers }
    );
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
const getArtistMusic = async (accessToken, artistId) => {
  try {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };
    const { data } = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}`,
      { headers }
    );
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const mainMusic = async (url,accessToken) => {
  try {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };
    const { data } = await axios.get(url,
      { headers }
    );
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const getRecommended = async (accessToken) => {
  try {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };
    const { data } = await axios.get(
      `https://api.spotify.com/v1/recommendations?limit=15&seed_artists=3nZa8vRD64ueq3d0JNYTsl&seed_genres=opm%2Cpinoy&seed_tracks=5pbdyhkEpMobD6Fs6h729Q`,
      { headers }
    );
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
router.get('/token', async (req, res) => {
  let artist = ["5pbdyhkEpMobD6Fs6h729Q","0jarApAsbmiCkYhz0590mE","4RA4PC3WHM9OHZLExirTcU"]
  try {
    // Get the access token
    const accessToken = await getToken();
    // Use the access token to get artist data
    const artistData = await getArtistData(accessToken, artist[Math.floor(Math.random() * 3 )]);
    console.log(accessToken)
    // const recommend = await getRecommended(accessToken)
    // const recommended = await mainMusic(`https://api.spotify.com/v1/recommendations?seed_artists=${artist[Math.floor(Math.random() * 3 )]}&seed_genres=opm&seed_tracks=${artist[Math.floor(Math.random() * 3 )]}`,accessToken)
    res.cookie("accessToken",accessToken)
    res.json({artistData});
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.get('/music/:id' ,async(req,res) => {
  const id = req.params.id
  try {
    // Get the access token
    const accessToken = await getToken();
    // Use the access token to get artist data
    const datMusic = await mainMusic(`https://api.spotify.com/v1/search?q=${id}&type=track`,accessToken)
    // const artistMusic = await getArtistMusic(accessToken, id);
    res.json({datMusic});
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
// router.get("/selected/:select",async(req,res) => {
//   const {select} = req.params
//   try {
//     const accessToken = await getToken()
//     const selected = await mainMusic(`https://api.spotify.com/v1/tracks/${select}`,accessToken)
//     res.json(selected)
//   }catch(error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// })
router.get("/search/:search",async (req,res) => {
  const {search} = req.params
  console.log(search)
  try {
    const accessToken = await getToken()
    const datMusic = await mainMusic(`https://api.spotify.com/v1/search?q=${search}&type=track&limit=20`,accessToken)
    console.log(accessToken)
    res.json(datMusic)
  }catch(error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
router.get('/selected_tracks/:id',async (req,res) => {  
  const {id} = req.params
  console.log(id)
  try {
    const accessToken = await getToken()
  const tracks_s = await mainMusic(`https://api.spotify.com/v1/tracks/${id}`,accessToken)
    res.json(tracks_s)
  }catch(error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


router.get("/home_tracks",async (req,res) => {
  try {
    const accessToken = await getToken()
    const datMusic = await mainMusic(`https://api.spotify.com/v1/recommendations?limit=20&seed_artists=4clfDrcEBdZQt3aSTfAWIf&seed_genres=opm&seed_tracks=2S80c51YXgJQhkhX603fMA`,accessToken)
    res.json(datMusic)
  }catch(error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
})
router.get("/top10",async (req,res) => {
  try {
    const accessToken = await getToken()
    const datMusic = await mainMusic(`https://api.spotify.com/v1/recommendations?limit=10&seed_artists=6Qu3IBOhGT1QsxWuZ9u0Yq&seed_genres=opm&seed_tracks=3d3DdkP8ocnDIxZZuzzwIc`,accessToken)
    res.json(datMusic)
  }catch(error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


router.get("/myList/:list",async(req,res) => {
  const {list} = req.params
  try {
    const accessToken = await getToken()
    const datMusic = await mainMusic(`https://api.spotify.com/v1/tracks?ids=${list}`,accessToken)
    res.json(datMusic)
  }catch(e) {
    res.status(500).json({ error: 'Internal Server Error' });

  }
})
module.exports = router


