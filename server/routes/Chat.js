const express = require('express')
const router = express.Router()
const connection = require('../database').db
const bcrypt = require('bcrypt')


router.post('/send_msg',(req,res) => {
    const {userId,message} = req.body

    const chatInsert = `INSERT INTO chat (user,message) VALUES (?,?)`
    
    connection.query(chatInsert,[userId,message],(err,result) => {
        if(err) {
            return res.status(400).json({error:"An error Occur"})
        }else {
            return res.status(200).json({success:'message sent'})
        }
    })
})

router.get('/get_msg',(req,res) => {
    const getData = `SELECT * FROM chat`
    connection.query(getData,(err,result) => {
        if(err) {
            return res.status(400).json({error:"cannot fetchData"})
        }else {
            return res.status(200).json(result)
        }
    })
})

module.exports = router