const express = require("express");
const router = express.Router();
const path=require("path");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const crypto = require('crypto'); 
const nodemailer = require('nodemailer');
router.use(bodyParser.urlencoded({ extended: true }));
const db = require('../data/db');
const User = require('../data/db');
const multer = require('multer');
const session = require('express-session');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
        // Parse the message
        const data = JSON.parse(message);

        // Broadcast incoming messages to all clients except the sender
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Connection closed');
    });
});



async function getAddressFromCoordinates(lat, lon) {
    const apiKey = '0c6656d228a94861bc67da1e06b6e584'; // Your OpenCage API key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;

    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(url);
        const data = await response.json();
       

        // Ensure we have results and at least one result has the 'formatted' field
        if (data.results && data.results.length > 0 && data.results[0].formatted) {
            return data.results[0].formatted; // Correct key for the formatted address
        } else {
            console.log("No results found or empty response.");
            return "No address found"; // Handle cases where no address is found
        }
    } catch (error) {
        console.error('Failed to fetch address:', error);
        return "Failed to fetch address"; // Handle fetch errors
    }
}


router.use(bodyParser.json());


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
    },
});

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './public/uploads');
    },
    filename: function(req, file, callback) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyBaawZ1mslCS6Ex39mPUcxfspIKcEsKfgQ");

router.post('/api/message', async (req, res) => {
    console.log("Received body: ", JSON.stringify(req.body));  

    const userMessage = req.body.message;
    const checkRelevance = req.body.checkRelevance;
    console.log("relee" + req.body.checkRelevance);
    console.log('Received message:', userMessage, 'Check Relevance:', checkRelevance);
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
    let prompt;
    if (checkRelevance) {
        console.log("iff");
        prompt = `Evaluate relevance between section '${userMessage}' and topic 'disaster' on a scale of 1 to 10`;
    } else {
        console.log("elseee");
        prompt = userMessage;
    }

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();
        const relevanceScore = response.relevance;  

        console.log(`Response: ${text}, Relevance: ${relevanceScore}`);

        
        if (text < 5) {
            res.json({ message: "The response was not relevant enough to be displayed." });
        } else {
            const prompt = userMessage;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = await response.text();
            res.json({ message: text });
        }
    } catch (error) {
        console.error('Error handling the chatbot response:', error);
        res.status(500).json({ message: "Error processing your request" });
    }
});



    router.post('/api/add-comment/:id', async (req, res) => {
        if (!req.session.userId) {
            return res.status(401).send('User not authenticated');
        }
    
        try {
            const { comment } = req.body;
            const { id } = req.params;
    
            // Check if the current user is the creator of the data
            const [rows] = await db.execute('SELECT userId FROM Disasters WHERE id = ?', [id]);
            if (rows.length > 0 && rows[0].userId === req.session.userId) {
                // Update the 'needs' column with the comment
                await db.execute('UPDATE Disasters SET needs = ? WHERE id = ?', [comment, id]);
                res.redirect('/currentdisasters');
            } else {
                res.status(403).send('Unauthorized to add comment');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
            res.status(500).send('Failed to add comment');
        }
    });
    

    router.post('/api/add-location', async (req, res) => {
        const { latitude, longitude } = req.body;
    
        try {
            const address = await getAddressFromCoordinates(latitude, longitude); // Fetch the address using the coordinates
            const [result] = await db.execute(
                'INSERT INTO Disasters (latitude, longitude, userId, address) VALUES (?, ?, ?, ?)',
                [latitude, longitude, req.session.userId, address] // Include address in the insert query
            );
            res.json({ success: true, address: address, latitude: latitude, longitude: longitude, id: result.insertId });
        } catch (error) {
            console.error('Error adding location:', error);
            res.status(500).json({ success: false });
        }
    });
    
    
    
    router.delete('/api/delete-location/:id', async (req, res) => {
        try {
            // Check that the user is logged in and matches the userId for the data
            const [rows] = await db.execute('SELECT userId FROM Disasters WHERE id = ?', [req.params.id]);
            if (rows.length > 0 && rows[0].userId === req.session.userId) {
                await db.execute('DELETE FROM Disasters WHERE id = ?', [req.params.id]);
                res.json({ success: true });
            } else {
                res.status(403).json({ success: false, message: "Unauthorized" });
            }
        } catch (error) {
            console.error('Error deleting location:', error);
            res.status(500).json({ success: false });
        }
    });
    


    router.post('/message/:messageId/delete', isLoggedIn, async (req, res) => {
        const messageId = req.params.messageId;
        const userId = req.session.userId; 
        const topicId = req.params.topicId;  
    
        try {
            const [results] = await db.query('SELECT memberId, topicID FROM messages WHERE messagesId = ?', [messageId]);
            if (results.length === 0) {
                return res.status(404).send('Message not found.');
            }
            const messageOwner = results[0].memberId;
            const topicId = results[0].topicID; 
    
            if (parseInt(userId, 10) !== parseInt(messageOwner, 10)) {
                return res.status(403).send('Unauthorized: You cannot delete this message.');
            }
    
            await db.query('DELETE FROM messages WHERE messagesId = ?', [messageId]);
    
            
            const updateRepliesSql = 'UPDATE konular SET replies = replies - 1 WHERE id = ? AND replies > 0';
            await db.query(updateRepliesSql, [topicId]);
    
            res.redirect('back'); 
        } catch (error) {
            console.error('Error deleting message:', error);
            res.status(500).send('An error occurred while deleting the message.');
        }
    });
    


router.post('/message/:topicId/add', isLoggedIn, async (req, res) => {
    const topicId = req.params.topicId;
    const memberId = req.session.userId; 
    const { message } = req.body;

    try {
        const sql = 'INSERT INTO messages (memberID, message, time, topicID) VALUES (?, ?, NOW(), ?)';
        await db.query(sql, [memberId, message, topicId]);
        const updateRepliesSql = 'UPDATE konular SET replies = replies + 1 WHERE id = ?';
        await db.query(updateRepliesSql, [topicId]);
        res.redirect('back');
    } catch (error) {
        console.error('Error posting message:', error);
        res.status(500).send('An error occurred while posting your message.');
    }
});


router.get('/supportgroups/support/:id', async (req, res) => {
    const topicId = req.params.id; 

    try {
        const [topics] = await db.query('SELECT * FROM konular WHERE id = ? AND section = "Support"', [topicId]);
        const [users] = await db.query('SELECT * FROM uyeler WHERE id = (SELECT memberId FROM konular WHERE id = ?)', [topicId]);
        const [messages] = await db.query('SELECT m.*, u.nickname, u.namee, u.surname, u.birth, u.address, u.images FROM messages m JOIN uyeler u ON m.memberId = u.id WHERE m.topicId = ?', [topicId]);

        
        const currentUserId=req.session.userId;
       
        
        if(topics.length > 0 && users.length > 0) {
            res.render('users/SupportGroups/Topics/details', {
                topic: topics[0],
                user: users[0],
                messagee: messages,
                isLoggedIn: req.session.isLoggedIn, 
                currentUserId:currentUserId,
                isTopicOwner:currentUserId===topics[0].memberID
            });
        } else {
            res.status(404).send('Topic or user not found.');
        }
    } catch (error) {
        console.error('Error fetching topic and user details:', error);
        res.status(500).send('An error occurred while fetching topic and user details.');
    }
});


router.get('/supportgroups/storm/:id', async (req, res) => {
    const topicId = req.params.id; 
    try {
        const [topics] = await db.query('SELECT * FROM konular WHERE id = ? AND section = "Storm"', [topicId]);
        const [users] = await db.query('SELECT * FROM uyeler WHERE id = (SELECT memberId FROM konular WHERE id = ?)', [topicId]);
        const [messages] = await db.query('SELECT m.*, u.nickname, u.namee, u.surname, u.birth, u.address, u.images FROM messages m JOIN uyeler u ON m.memberId = u.id WHERE m.topicId = ?', [topicId]);

        
        const currentUserId=req.session.userId;
  
        
        if(topics.length > 0 && users.length > 0) {
            res.render('users/SupportGroups/Topics/details', {
                topic: topics[0],
                user: users[0],
                messagee: messages,
                isLoggedIn: req.session.isLoggedIn, 
                currentUserId:currentUserId,
                isTopicOwner:currentUserId===topics[0].memberID
            });
        } else {
            res.status(404).send('Topic or user not found.');
        }
    } catch (error) {
        console.error('Error fetching topic and user details:', error);
        res.status(500).send('An error occurred while fetching topic and user details.');
    }
});

router.get('/supportgroups/off-topic/:id', async (req, res) => {
    const topicId = req.params.id; 
    try {
        const [topics] = await db.query('SELECT * FROM konular WHERE id = ? AND section = "Off-Topic"', [topicId]);
        const [users] = await db.query('SELECT * FROM uyeler WHERE id = (SELECT memberId FROM konular WHERE id = ?)', [topicId]);
        const [messages] = await db.query('SELECT m.*, u.nickname, u.namee, u.surname, u.birth, u.address, u.images FROM messages m JOIN uyeler u ON m.memberId = u.id WHERE m.topicId = ?', [topicId]);

        
        const currentUserId=req.session.userId;
     
        
        if(topics.length > 0 && users.length > 0) {
            res.render('users/SupportGroups/Topics/details', {
                topic: topics[0],
                user: users[0],
                messagee: messages,
                isLoggedIn: req.session.isLoggedIn, 
                currentUserId:currentUserId,
                isTopicOwner:currentUserId===topics[0].memberID
            });
        } else {
            res.status(404).send('Topic or user not found.');
        }
    } catch (error) {
        console.error('Error fetching topic and user details:', error);
        res.status(500).send('An error occurred while fetching topic and user details.');
    }
});

router.get('/supportgroups/landslide/:id', async (req, res) => {
    const topicId = req.params.id; 

    try {
        const [topics] = await db.query('SELECT * FROM konular WHERE id = ? AND section = "Landslide"', [topicId]);
        const [users] = await db.query('SELECT * FROM uyeler WHERE id = (SELECT memberId FROM konular WHERE id = ?)', [topicId]);
        const [messages] = await db.query('SELECT m.*, u.nickname, u.namee, u.surname, u.birth, u.address, u.images FROM messages m JOIN uyeler u ON m.memberId = u.id WHERE m.topicId = ?', [topicId]);

        
        const currentUserId=req.session.userId;
        
        
        if(topics.length > 0 && users.length > 0) {
            res.render('users/SupportGroups/Topics/details', {
                topic: topics[0],
                user: users[0],
                messagee: messages,
                isLoggedIn: req.session.isLoggedIn,
                currentUserId:currentUserId,
                isTopicOwner:currentUserId===topics[0].memberID
            });
        } else {
            res.status(404).send('Topic or user not found.');
        }
    } catch (error) {
        console.error('Error fetching topic and user details:', error);
        res.status(500).send('An error occurred while fetching topic and user details.');
    }
});

router.get('/supportgroups/flood/:id', async (req, res) => {
    const topicId = req.params.id; 

    try {
        const [topics] = await db.query('SELECT * FROM konular WHERE id = ? AND section = "Flood"', [topicId]);
        const [users] = await db.query('SELECT * FROM uyeler WHERE id = (SELECT memberId FROM konular WHERE id = ?)', [topicId]);
        const [messages] = await db.query('SELECT m.*, u.nickname, u.namee, u.surname, u.birth, u.address, u.images FROM messages m JOIN uyeler u ON m.memberId = u.id WHERE m.topicId = ?', [topicId]);   
        const currentUserId=req.session.userId;
     
        
        
        if(topics.length > 0 && users.length > 0) {
            res.render('users/SupportGroups/Topics/details', {
                topic: topics[0],
                user: users[0],
                messagee: messages,
                isLoggedIn: req.session.isLoggedIn, 
                currentUserId:currentUserId,
                isTopicOwner:currentUserId===topics[0].memberID
            });
        } else {
            res.status(404).send('Topic or user not found.');
        }
    } catch (error) {
        console.error('Error fetching topic and user details:', error);
        res.status(500).send('An error occurred while fetching topic and user details.');
    }
});

router.get('/supportgroups/fire/:id', async (req, res) => {
    const topicId = req.params.id;

    try {
        const [topics] = await db.query('SELECT * FROM konular WHERE id = ? AND section = "Fire"', [topicId]);
        const [users] = await db.query('SELECT * FROM uyeler WHERE id = (SELECT memberId FROM konular WHERE id = ?)', [topicId]);
        const [messages] = await db.query('SELECT m.*, u.nickname, u.namee, u.surname, u.birth, u.address, u.images FROM messages m JOIN uyeler u ON m.memberId = u.id WHERE m.topicId = ?', [topicId]);     
        const currentUserId = req.session.userId;
      
        
        if(topics.length > 0 && users.length > 0) {
            res.render('users/SupportGroups/Topics/details', {
                topic: topics[0],
                user: users[0],
                messagee: messages,
                isLoggedIn: req.session.isLoggedIn, 
                currentUserId:currentUserId,
                isTopicOwner:currentUserId===topics[0].memberID
            });
        } else {
            res.status(404).send('Topic or user not found.');
        }
    } catch (error) {
        console.error('Error fetching topic and user details:', error);
        res.status(500).send('An error occurred while fetching topic and user details.');
    }
});


router.get('/supportgroups/earthquake/:id', async (req, res) => {
    const topicId = req.params.id; 

    try {
        const [topics] = await db.query('SELECT * FROM konular WHERE id = ? AND section = "Earthquake"', [topicId]);
        const [users] = await db.query('SELECT * FROM uyeler WHERE id = (SELECT memberId FROM konular WHERE id = ?)', [topicId]);
        const [messages] = await db.query('SELECT m.*, u.nickname, u.namee, u.surname, u.birth, u.address, u.images FROM messages m JOIN uyeler u ON m.memberId = u.id WHERE m.topicId = ?', [topicId]);
        const currentUserId=req.session.userId;
   
        
        if(topics.length > 0 && users.length > 0) {
            res.render('users/SupportGroups/Topics/details', {
                topic: topics[0],
                user: users[0],
                messagee: messages,
                isLoggedIn: req.session.isLoggedIn,
                currentUserId:currentUserId,
                isTopicOwner:currentUserId===topics[0].memberID
            });
        } else {
            res.status(404).send('Topic or user not found.');
        }
    } catch (error) {
        console.error('Error fetching topic and user details:', error);
        res.status(500).send('An error occurred while fetching topic and user details.');
    }
});


router.get('/supportgroups/avalanche/:id', async (req, res) => {
    const topicId = req.params.id; 
    try {
   
        const [topics] = await db.query('SELECT * FROM konular WHERE id = ? AND section = "Avalanche"', [topicId]);
        const [users] = await db.query('SELECT * FROM uyeler WHERE id = (SELECT memberId FROM konular WHERE id = ?)', [topicId]);
        const [messages] = await db.query('SELECT m.*, u.nickname, u.namee, u.surname, u.birth, u.address, u.images FROM messages m JOIN uyeler u ON m.memberId = u.id WHERE m.topicId = ?', [topicId]);

        const currentUserId = req.session.userId;
      
        
        
     

        if(topics.length > 0 && users.length > 0) {
            res.render('users/SupportGroups/Topics/details', {
                topic: topics[0],
                user: users[0],
                messagee: messages,
                isLoggedIn: req.session.isLoggedIn,
                currentUserId:currentUserId,
                isTopicOwner:currentUserId===topics[0].memberID
            });
          

        } else {
            res.status(404).send('Topic or user not found.');
        }
    } catch (error) {
        console.error('Error fetching topic and user details:', error);
        res.status(500).send('An error occurred while fetching topic and user details.');
    }
});

function isLoggedIn(req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        console.log('User is not logged in.');
        res.status(401).send("User is not logged in.");
    }
}

router.post('/create-topic', isLoggedIn, upload.none(), async (req, res) => {
    const { section, topic, message } = req.body;
    const memberID = req.session.userId;
    const replies = 0;
    const activity = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // Formulate the prompt for the chatbot API
    const prompt = `Evaluate relevance between section '${section}' and topic '${topic}' on a scale of 1 to 10`;

    try {
        // Call to chatbot API
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const relevanceScore = parseInt(response.text().trim());

        // Check relevance score
        if (relevanceScore <= 4) {
            console.log('Topic creation blocked due to low relevance.');
            res.redirect(`/supportgroups/write?error=Topic creation blocked due to low relevance.`);
            return;
        }

        // If relevance is acceptable, proceed to insert into the database
        const sqlQuery = `
            INSERT INTO konular (section, topic, memberID, replies, activity, message)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        await db.execute(sqlQuery, [section, topic, memberID, replies, activity, message]);
        res.redirect('/supportgroups');

    } catch (error) {
        console.error('Error in creating new topic or communicating with chatbot:', error);
        // Redirect to the form with a more generic error message that can be understood by users
        res.redirect(`/supportgroups/write?error=Error communicating with AI services. Please try again later.`);
    }
});



router.post('/delete-account', isLoggedIn, async (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(403).send("You must be logged in to perform this action.");
    }

    try {
        // Delete user data from the database
        await db.query('DELETE FROM konular WHERE memberID = ?', [userId]);
        await db.query('DELETE FROM uyeler WHERE id = ?', [userId]);
        
        // Destroy the user session after deleting the account
        req.session.destroy(() => {
            res.clearCookie('connect.sid'); // Adjust this according to your session cookie name
            res.redirect('/homepage'); // Redirect to a goodbye or account deleted page
        });
    } catch (error) {
        console.error('Error deleting user account:', error);
        res.status(500).send('Failed to delete your account due to an internal error.');
    }
});



router.post('/remove-profile-picture', isLoggedIn, async (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(400).send("User ID is missing. Please log in again.");
    }

    try {
        // Assuming 'default.png' is your default image when no profile picture is available
        const sqlQuery = "UPDATE uyeler SET images = '' WHERE id = ?";
        await db.execute(sqlQuery, [userId]);
        res.redirect('/profile'); // Redirect back to profile page after removal
    } catch (error) {
        console.error('Error removing profile picture:', error);
        res.status(500).send('An error occurred while removing the profile picture.');
    }
});


router.post('/update-profile', isLoggedIn, upload.single('images'), async (req, res) => {
    const userId = req.session.userId; 
    if (!userId) {
        return res.status(400).send("User ID is missing. Please log in again.");
    }

    const { membertype, nickname, name, surname, birth, address, email, password , description } = req.body;

    let updates = [];
    let params = [];

    if (membertype) updates.push(`membertype = ?`), params.push(membertype);
    if (nickname) updates.push(`nickname = ?`), params.push(nickname);
    if (name) updates.push(`namee = ?`), params.push(name);
    if (surname) updates.push(`surname = ?`), params.push(surname);
    if (birth) updates.push(`birth = ?`), params.push(birth);
    if (address) updates.push(`address = ?`), params.push(address);
    if (email) updates.push(`email = ?`), params.push(email);
    if (description) updates.push(`description = ?`), params.push(description);
    
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10); 
        updates.push(`password = ?`), params.push(hashedPassword);
    }


    if (req.file) {
        updates.push(`images = ?`), params.push(`${req.file.filename}`);
    }


    params.push(userId);

    if (updates.length > 0) {
        const sqlQuery = `UPDATE uyeler SET ${updates.join(', ')} WHERE id = ?`;
        try {
            await db.execute(sqlQuery, params);
            res.redirect('/profile');
        } catch (error) {
            console.error('Error updating user profile:', error);
            res.status(500).send('An error occurred while updating the profile.');
        }
    } else {
        res.status(400).send('No fields were provided for update.');
    }
});


function isLoggedIn(req, res, next) {
    if (req.session.isLoggedIn) {
        next();
    } else {
        res.redirect('/login');
    }
}

router.get('/log-outt', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.status(500).send("Error logging out.");
        }
        res.redirect('/login');
    });
});


router.get('/profilee', (req, res) => {
    if (req.session.isLoggedIn) {
        res.redirect('/profile');
    } else {
        res.redirect('/login');
    }
});


router.post('/register', async (req, res) => {
    try {
        if (req.body.password !== req.body.confirmPassword) {
            return res.send('Passwords do not match.');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const query = 'INSERT INTO uyeler (email, password, namee, surname,nickname) VALUES (?, ?, ?, ?,?)';
        const [rows] = await db.execute(query, [req.body.email, hashedPassword, req.body.firstName, req.body.lastName,req.body.nickname]);

        res.redirect('/login');
    } catch (error) {
        console.error("Error in /register route: ", error);
        res.status(500).send('Error registering new user.');
    }
});



router.post('/login', async (req, res) => {
    try {
        const query = 'SELECT * FROM uyeler WHERE email = ?';
        const [users] = await db.execute(query, [req.body.email]);

        if(users.length > 0) {
            const user = users[0];
            if (await bcrypt.compare(req.body.password, user.password)) { 
                req.session.isLoggedIn = true;
                req.session.userId = user.id; 
                res.redirect('/homepage');
            
            } else {
                res.redirect('/login?error=incorrectLogin');
            }

        } else {
            res.send('User not found');
        }

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Login error');
    }
});

router.post('/forgot', async (req, res) => {
    try {
        const email = req.body.email;
        const token = crypto.randomBytes(20).toString('hex');
        const expireTime = new Date(Date.now() + 3600000);
        const expireTimeString = expireTime.toISOString().slice(0, 19).replace('T', ' ');
        const query = 'UPDATE uyeler SET resetPasswordToken = ?, resetPasswordExpires = ? WHERE email = ?';
        await db.execute(query, [token, expireTimeString, email]);

    } catch (error) {
        console.error("Forgot password error:", error);
        res.status(500).send('Error on password reset process.');
    }
});

router.get("/forgot", function(req, res) {
    res.render("users/LoginRegister/forgot", {
        isLoggedIn: req.session.isLoggedIn 
    });
});

router.post('/create-topic', isLoggedIn, upload.none(), async (req, res) => {
    const { section, topic, message } = req.body;
    const memberID = req.session.userId; 
    const fetchNicknameQuery = `SELECT nickname FROM uyeler WHERE id = ?`;
    let memberName;

    try {
        const [users] = await db.execute(fetchNicknameQuery, [memberID]);
        if (users.length > 0) {
            memberName = users[0].nickname; 
        } else {
            throw new Error('User not found.');
        }
    } catch (error) {
        console.error('Error fetching user nickname:', error);
        return res.status(500).send('An error occurred while fetching user information.');
    }

    const replies = 0; 
    const activity = new Date().toISOString().slice(0, 19).replace('T', ' '); 

    const sqlQuery = `
        INSERT INTO konular (section, topic, memberID, replies, activity, message, memberName)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    try {
        await db.execute(sqlQuery, [section, topic, memberID, replies, activity, message, memberName]);
        res.redirect('/supportgroups');
    } catch (error) {
        console.error('Error creating new topic:', error);
        res.status(500).send('An error occurred while creating the topic.');
    }
});
router.get("/login", function(req, res) {
    res.render("users/LoginRegister/login", {
        isLoggedIn: req.session.isLoggedIn 
    });
});

router.use("/login",function(req,res){
    res.sendFile(path.join(__dirname,"../views/users/LoginRegister","login.html"));
})

router.get("/register", function(req, res) {
    res.render("users/LoginRegister/register", {
        isLoggedIn: req.session.isLoggedIn 
    });
});

router.get("/informations/storm", function(req, res) {
    res.render("users/Education/Informations/storm", {
        isLoggedIn: req.session.isLoggedIn 
    });
});

router.get("/informations/landslide", function(req, res) {
    res.render("users/Education/Informations/landslide", {
        isLoggedIn: req.session.isLoggedIn 
    });
});

router.get("/informations/flood", function(req, res) {
    res.render("users/Education/Informations/flood", {
        isLoggedIn: req.session.isLoggedIn 
    });
});

router.get("/informations/fire", function(req, res) {
    res.render("users/Education/Informations/fire", {
        isLoggedIn: req.session.isLoggedIn 
    });
});

router.get("/informations/earthquake", function(req, res) {
    res.render("users/Education/Informations/earthquake", {
        isLoggedIn: req.session.isLoggedIn 
    });
});
router.get("/informations/avalanche", function(req, res) {
    res.render("users/Education/Informations/avalanche", {
        isLoggedIn: req.session.isLoggedIn 
    });
});


router.get("/quizzes/storm", function(req, res) {
    res.render("users/Education/Quizzes/storm", {
        isLoggedIn: req.session.isLoggedIn 
    });
});

router.get("/quizzes/landslide", function(req, res) {
    res.render("users/Education/Quizzes/landslide", {
        isLoggedIn: req.session.isLoggedIn 
    });
});

router.get("/quizzes/flood", function(req, res) {
    res.render("users/Education/Quizzes/flood", {
        isLoggedIn: req.session.isLoggedIn 
    });
});

router.get("/quizzes/fire", function(req, res) {
    res.render("users/Education/Quizzes/fire", {
        isLoggedIn: req.session.isLoggedIn 
    });
});
router.get("/quizzes/earthquake", function(req, res) {
    res.render("users/Education/Quizzes/earthquake", {
        isLoggedIn: req.session.isLoggedIn 
    });
});


router.get("/quizzes/avalanche", function(req, res) {
    res.render("users/Education/Quizzes/avalanche", {
        isLoggedIn: req.session.isLoggedIn 
    });
});

router.get("/informations", function(req, res) {
    res.render("users/Education/informations", {
        isLoggedIn: req.session.isLoggedIn 
    });
});
router.use("/informations",function(req,res){
    res.sendFile(path.join(__dirname,"../views/users/Education","informations.html"));
})

router.get("/quizzes", function(req, res) {
    res.render("users/Education/quizzes", {
        isLoggedIn: req.session.isLoggedIn 
    });
});


router.get("/education", function(req, res) {
    res.render("users/Education/education", {
        isLoggedIn: req.session.isLoggedIn 
    });
});




  router.use("/supportgroups/support", async (req, res) => {
    try {
        const [topics] = await db.query(`
            SELECT k.id, k.topic, k.replies, k.activity, u.nickname
            FROM konular k
            JOIN uyeler u ON k.memberID = u.id
            WHERE k.section LIKE 'Support'
        `);

        res.render("users/SupportGroups/Topics/support", {
            topics: topics,
            isLoggedIn: req.session.isLoggedIn
        });
    } catch (err) {
        console.error("Database query error:", err.message);
        res.status(500).send("An error occurred while fetching data from the database.");
    }
});




router.use("/supportgroups/storm",async function(req,res){
    try {
      const [rows, fields] = await db.query("SELECT topic,replies,activity FROM konular where section like 'Storm' ");
      const[rowss] = await db.query("SELECT u.nickname  FROM uyeler u  WHERE u.id IN ( SELECT k.memberID  FROM konular k WHERE k.memberID = u.id and section like 'Storm')");
      const [links]= await db.query("SELECT id from konular where section like 'Storm'");
      res.render("users/SupportGroups/Topics/storm", { 
        topics: rows ,
        isLoggedIn: req.session.isLoggedIn ,
        topicss:rowss,
        topicsss:links
    });
    } catch (err) {
        console.error("Database query error:", err.message);
        res.status(500).send("An error occurred while fetching data from the database.");
    }
  })

router.use("/supportgroups/off-topic",async function(req,res){
    try {
      const [rows, fields] = await db.query("SELECT topic,replies,activity FROM konular where section like 'Off-Topic' ");
      const[rowss] = await db.query("SELECT u.nickname  FROM uyeler u  WHERE u.id IN ( SELECT k.memberID  FROM konular k WHERE k.memberID = u.id and section like 'Off-Topic')");
      const [links]= await db.query("SELECT id from konular where section like 'Off-Topic'");
      res.render("users/SupportGroups/Topics/off-topic", { 
        topics: rows ,
        isLoggedIn: req.session.isLoggedIn ,
        topicss:rowss,
        topicsss:links
    });
    } catch (err) {
        console.error("Database query error:", err.message);
        res.status(500).send("An error occurred while fetching data from the database.");
    }
  })

router.use("/supportgroups/landslide",async function(req,res){
    try {
      const [rows, fields] = await db.query("SELECT topic,replies,activity FROM konular where section like 'Landslide' ");
      const[rowss] = await db.query("SELECT u.nickname  FROM uyeler u  WHERE u.id IN ( SELECT k.memberID  FROM konular k WHERE k.memberID = u.id and section like 'Landslide')");
      const [links]= await db.query("SELECT id from konular where section like 'Landslide'");
      res.render("users/SupportGroups/Topics/landslide", { 
        topics: rows ,
        isLoggedIn: req.session.isLoggedIn ,
        topicss:rowss,
        topicsss:links
    });
    } catch (err) {
        console.error("Database query error:", err.message);
        res.status(500).send("An error occurred while fetching data from the database.");
    }
  })

router.use("/supportgroups/flood",async function(req,res){
    try {
      const [rows, fields] = await db.query("SELECT topic,replies,activity FROM konular where section like 'Flood' ");
      const[rowss] = await db.query("SELECT u.nickname  FROM uyeler u  WHERE u.id IN ( SELECT k.memberID  FROM konular k WHERE k.memberID = u.id and section like 'Flood')");
      const [links]= await db.query("SELECT id from konular where section like 'Flood'");
      res.render("users/SupportGroups/Topics/flood", { 
        topics: rows ,
        isLoggedIn: req.session.isLoggedIn ,
        topicss:rowss,
        topicsss:links
    });
    } catch (err) {
        console.error("Database query error:", err.message);
        res.status(500).send("An error occurred while fetching data from the database.");
    }
  })

router.use("/supportgroups/fire",async function(req,res){
    try {
      const [rows, fields] = await db.query("SELECT topic,replies,activity FROM konular where section like 'Fire' ");
      const[rowss] = await db.query("SELECT u.nickname  FROM uyeler u  WHERE u.id IN ( SELECT k.memberID  FROM konular k WHERE k.memberID = u.id and section like 'Fire')");
      const [links]= await db.query("SELECT id from konular where section like 'Fire'");
      res.render("users/SupportGroups/Topics/fire", { 
        topics: rows ,
        isLoggedIn: req.session.isLoggedIn ,
        topicss:rowss,
        topicsss:links
    });
    } catch (err) {
        console.error("Database query error:", err.message);
        res.status(500).send("An error occurred while fetching data from the database.");
    }
  })

  router.use("/supportgroups/earthquake", async (req, res) => {
    try {
      const [rows, fields] = await db.query("SELECT topic,replies,activity FROM konular where section like 'Earthquake' ");
      const[rowss] = await db.query("SELECT u.nickname  FROM uyeler u  WHERE u.id IN ( SELECT k.memberID  FROM konular k WHERE k.memberID = u.id and section like 'Earthquake')");
      const [links]= await db.query("SELECT id from konular where section like 'Earthquake'");
      res.render("users/SupportGroups/Topics/earthquake", { 
        topics: rows ,
        isLoggedIn: req.session.isLoggedIn ,
        topicss:rowss ,
        topicsss:links
    });
    } catch (err) {
        console.error("Database query error:", err.message);
        res.status(500).send("An error occurred while fetching data from the database.");
    }
  });

  router.use("/supportgroups/avalanche", async (req, res) => {
    try {
        const [topics] = await db.query(`
            SELECT k.id, k.topic, k.replies, k.activity, u.nickname
            FROM konular k
            JOIN uyeler u ON k.memberID = u.id
            WHERE k.section LIKE 'Avalanche'
        `);

        res.render("users/SupportGroups/Topics/avalanche", {
            topics: topics,
            isLoggedIn: req.session.isLoggedIn
        });
    } catch (err) {
        console.error("Database query error:", err.message);
        res.status(500).send("An error occurred while fetching data from the database.");
    }
});

router.post('/topic/:id/delete', async (req, res) => {
    const topicId = req.params.id;

    if (!req.session.isLoggedIn) {
        return res.status(403).send('You must be logged in to perform this action.');
    }

    try {
        const [topic] = await db.query('SELECT memberId FROM konular WHERE id = ?', [topicId]);
        if (req.session.userId !== topic[0].memberId) {
            return res.status(403).send('Unauthorized: Only the topic owner can delete the topic.');
        }

        // First delete all messages related to the topic
        await db.query('DELETE FROM messages WHERE topicID = ?', [topicId]);

        // Then delete the topic
        await db.query('DELETE FROM konular WHERE id = ?', [topicId]);

        res.redirect('/supportgroups/avalanche'); 
    } catch (error) {
        console.error('Error deleting the topic:', error);
        res.status(500).send('Failed to delete the topic due to an internal error.');
    }
});



  router.use("/supportgroups/members", async function(req, res) {
    const perPage = 30; 
    let page = req.query.page || 1; 
    let nicknameSearch = req.query.nickname; 

    try {
        const offset = (page - 1) * perPage; 

        let query = "SELECT images, nickname, namee, surname, address ,membertype ,description FROM uyeler";
        let queryParams = [];
        
        if (nicknameSearch) {
            query += " WHERE nickname LIKE ?";
            queryParams.push('%' + nicknameSearch + '%');
        }

        query += " LIMIT ?,?";
        queryParams.push(offset, perPage);

        const [rows, fields] = await db.query(query, queryParams);
        const [count] = await db.query("SELECT COUNT(*) AS totalCount FROM uyeler" + (nicknameSearch ? " WHERE nickname LIKE ?" : ""), nicknameSearch ? ['%' + nicknameSearch + '%'] : []);
        const totalPages = Math.ceil(count[0].totalCount / perPage);

        res.render("users/SupportGroups/members", {
            topics: rows,
            totalPages: totalPages,
            currentPage: parseInt(page),
            isLoggedIn: req.session.isLoggedIn ,
            currentSearch: nicknameSearch || ""
        });
    } catch (err) {
        console.error("Database query error:", err.message);
        res.status(500).send("An error occurred while fetching data from the database.");
    }
});

router.get("/supportgroups/write", function(req, res) {
    res.render("users/SupportGroups/Topics/write", {
        isLoggedIn: req.session.isLoggedIn ,
        query: req.query 
    });
});


router.get("/supportgroups", function(req, res) {
    res.render("users/SupportGroups/supportgroups", {
        isLoggedIn: req.session.isLoggedIn
    });
});

router.get("/donation", function(req, res) {
    res.render("users/Donation/donation", {
        isLoggedIn: req.session.isLoggedIn
    });
});


router.get("/psysupport", function(req, res) {
    res.render("users/PsychologicalSupport/psysupport", {
        isLoggedIn: req.session.isLoggedIn
    });
});

router.get("/currentdisasters", async function(req, res) {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10; 
    const offset = (page - 1) * limit;

    try {
        const countQuery = 'SELECT COUNT(*) AS count FROM Disasters';
        const [[{ count }]] = await db.execute(countQuery);

        const dataQuery = 'SELECT id, latitude, longitude, userId ,needs,time FROM Disasters LIMIT ? OFFSET ?';
        const [locations] = await db.execute(dataQuery, [`${limit}`, `${offset}`]);

        await Promise.all(locations.map(async location => {
            location.address = await getAddressFromCoordinates(location.latitude, location.longitude);
        }));

        const totalPages = Math.ceil(count / limit);

        res.render("users/CurrentDisasters/currentdisasters", {
            isLoggedIn: req.session.isLoggedIn || false,
            locations: locations,
            currentUserId: req.session.userId || null,
            currentPage: page,
            totalPages: totalPages
        });
    } catch (error) {
        console.error('Failed to fetch paginated locations or addresses:', error);
        res.render("users/CurrentDisasters/currentdisasters", {
            isLoggedIn: req.session.isLoggedIn || false,
            locations: [],
            currentUserId: null,
            currentPage: 1,
            totalPages: 0
        });
    }
});



router.get("/psysupport2", async function(req, res) {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10; // Ensure these are integers
    const offset = (page - 1) * limit;

    try {
        const countQuery = 'SELECT COUNT(*) AS count FROM Disasters';
        const [[{ count }]] = await db.execute(countQuery);

        // Fetch a page of locations using template literals to ensure integer context
        const dataQuery = 'SELECT id, latitude, longitude, userId ,needs FROM Disasters LIMIT ? OFFSET ?';
        const [locations] = await db.execute(dataQuery, [`${limit}`, `${offset}`]);

        await Promise.all(locations.map(async location => {
            location.address = await getAddressFromCoordinates(location.latitude, location.longitude);
        }));

        const totalPages = Math.ceil(count / limit);

        res.render("users/PsychologicalSupport/psysupport2", {
            isLoggedIn: req.session.isLoggedIn || false,
            locations: locations,
            currentUserId: req.session.userId || null,
            currentPage: page,
            totalPages: totalPages
        });
    } catch (error) {
        console.error('Failed to fetch paginated locations or addresses:', error);
        res.render("users/PsychologicalSupport/psysupport2", {
            isLoggedIn: req.session.isLoggedIn || false,
            locations: [],
            currentUserId: null,
            currentPage: 1,
            totalPages: 0
        });
    }
});






router.get("/profile", function(req, res) {
    if (req.session.isLoggedIn) {
        const user = req.session.user;
        
        res.render("users/profile", {
            isLoggedIn: req.session.isLoggedIn, 
            user: user 
        });
    } else {
        res.redirect('/login');
    }
});




router.get("/homepage", function(req, res) {

    res.render("users/homepage", {
        isLoggedIn: req.session.isLoggedIn 
    });
});

router.get("/", function(req, res) {

    res.render("users/homepage", {
        isLoggedIn: req.session.isLoggedIn 
    });
});
module.exports=router;