const express = require('express')
const router = express.Router()
const connection = require('../database').db
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const destinationDir = './public/images';
const fs = require('fs')
// Create the destination directory if it doesn't exist
if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,destinationDir)
    },
    filename: (req,file,cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage:storage
})
router.post('/createuser',(req,res) => {
    const {username,email,password,password2} = req.body
    let  passwCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if(!password || !username || !email) {
        return res.status(400).json({
            error: "Please fill all fields"
        })
    }else if(password.length < 6) {
        return res.status(400).json({
            error: "Password must be Atleast 6 Character"
        })
    }
    else if(password !== password2) {
        return res.status(400).json({
            error: "Password do not match"
        })
    }
    else if(!password.match(passwCheck)) {
        return res.status(400).json({
            error: " 1/numeric 1/Uppercase  1 lowercase"
        })
    }
    // check user

    const checkUser = `SELECT * FROM user WHERE username = ?`
    const checkEmail = `SELECT * FROM user WHERE email = ?`
    connection.query(checkEmail,[email] ,(err,eResult) => {
        if(err) {
            res.send("error")
        } else{
            if(eResult.length > 0) {
                return res.status(400).json({ error: 'Email already exists.' });
            } 
            connection.query(checkUser,[username] , (err,result) => {
                if(err) {
                    return  res.status(500).json({ error: 'An error occurred..' });
                } else {
                    if(result.length > 0) {
                        return res.status(400).json({ error: 'Username already exists.' });
                    } else {
                            // add user
                            bcrypt.hash(password,  10, (err, hash) => {
                            if(err) {
                                return res.status(500).json({ error: 'An error occurred while creating account.' });
                            }
                            
                            const sqlInsert = `INSERT INTO user (username,email,password) VALUES (?,?,?)`
                            connection.query(sqlInsert,[username,email,hash] , (err,result) => {
                                if(err) {
                                    return res.status(400).json({ error: 'An error occurred while creating account.' });
                                } else {
                                    const user_id = result.insertId
        
                                    const sqlInsertUserProfile = "INSERT INTO `user-profile` (`user`) VALUES (?)";
                                   
                                    connection.query(sqlInsertUserProfile, [user_id], (err, result) => {
                                      if (err) {
                                        
                                        return res.status(500).json({ error: `An error occurred while creating the user profile. ${user_id} ${err}` });
                                      } else {
                                        return res.status(200).json({ success: 'Account Successfully Created You can now Login' });
                                      }
                                    });
                                    
                                }
                            })
                            // add user
                        })
                    }
                }
            })
        }
    })




})

router.post('/login', (req, res, next) => {
    const {username,password}  = req.body
    const checkUser = `SELECT * FROM user WHERE username = ? `
    connection.query(checkUser,[username],(err,result) => {
        if(err) {
            res.send("err")
        }else {
            if(result.length === 0) {
                return res.status(400).json({error: "Invalid Credentials"})
            }
            // res.send("Success")
            console.log(result[0]['password'])
            console.log(result)
            const hashedPass = result[0]['password']
            console.log(hashedPass)
            bcrypt.compare(password,hashedPass,(bErr,bResult) => {
                console.log(typeof(bResult))
                if(bErr) {
                    res.send("bcrypt error")
                    return;
                } else {
                    if(bResult === false) {
                        return res.status(400).json({error: "Invalid Password"})
                    }
                    // password match
                    const token = jwt.sign(
                        {
                            username: result[0].username,
                            email: result[0].email,
                            userId: result[0].id
                        },
                        'SECRETKEY',
                        { expiresIn: '7d' }
                    );
                    res.cookie("token",token)
                    return res.send({
                        message: 'Logged in!',
                        token,
                        user: result[0],
                        });
                    // password match
                }
            })
        }
    })
  });

  router.post('/update_profile/:id', upload.single('image'), (req, res) => {
    console.log(req.file);
    const image = req.file.filename;
    const id = req.params.id;
    const {name,phonenumber} = req.body
    console.log(name,phonenumber)
    // const sqlImage = "UPDATE `user-profile` SET `image` = ?  WHERE `user-profile`.`user` = ?";
    const sqlUpdate = "UPDATE `user-profile` SET `name` = ?, `phonenumber` = ?, `image` = ? WHERE `user-profile`.`user` = ?"
    connection.query(sqlUpdate, [name,phonenumber,image, id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        console.log(result);
        res.json({ message: 'Profile image updated successfully' });
      }
    });
  });
router.get('/profile/:id',(req,res) => {
    const id = req.params.id
    const profileSql = 'SELECT * FROM `user-profile` WHERE user = ?'
    connection.query(profileSql,[id],(err,result) => {
        if(err) {
            console.log('err')
        }else {
            if (result.length > 0) {
                const user = result[0];
                res.send(user)
              } else {
                console.log('User not found');
                res.send("error")
              }
        }
    })
})
module.exports = router



