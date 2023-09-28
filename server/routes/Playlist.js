const express = require('express')
const router = express.Router()
const connection = require('../database').db


router.post("/playlist",(req,res) => {
    const { user, playlist } = req.body;
  
    const addPlaylist = "INSERT INTO `playlist` (`playlist_name`, `user`) VALUES (?, ?)";
    connection.query(addPlaylist, [playlist, user], (err, results) => {
      if (err) {
        console.error(err); // Log the error for debugging purposes
        return res.status(500).json({ error: `An error occurred while creating the user profile.` });
      } else {
        return res.status(200).json({ success: 'Successfully Added' });
      }
    });
})

router.get("/my_list/:id",(req,res) => {
    const {id} = req.params
    const sqlPlaylist= "SELECT * FROM `playlist` WHERE user = ? "
   connection.query(sqlPlaylist,[id],(err,result) => {
    if(err) {
        console.log('err')
    }else {
        if (result.length > 0) {
            res.send(result)
          } else {
            res.send("err")
          }
    }
   }) 
})
router.post("/add_track",(req,res) => {
  const {playlist,track} = req.body
  console.log(playlist,track)
  const sqlTrack = "INSERT INTO `playlist_track` ( `playlist`, `track`) VALUES (?, ?);"
  connection.query(sqlTrack,[playlist,track],(err,result) => {
    if(err) {
        console.log('err')
    }else {
      return res.status(200).json({ success: 'Successfully Added' });
    }
   }) 
})
router.get("/my_list_tracks/:id",(req,res) => {
  const {id} = req.params
  const sqlPlaylist= "SELECT * FROM `playlist_track` WHERE playlist = ? "
 connection.query(sqlPlaylist,[id],(err,result) => {
  if(err) {
      console.log('err')
  }else {
      if (result.length > 0) {
          res.send(result)
        } else {
          res.send("err")
        }
  }
 }) 
})
module.exports = router
