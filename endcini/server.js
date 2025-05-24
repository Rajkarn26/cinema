const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const Movie = require('./models/Movie');
const Contact = require('./models/Contact');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const uploadDir = path.join(__dirname, 'uploads');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// app.use(cors());
// app.use(bodyParser.json());

const FRONTEND_URL = process.env.APPLICATION_URL;

// const cors = require('cors');
app.use(cors({
  origin: process.env.APPLICATION_URL,
  credentials: true,
}));

if(!fs.existsSync(uploadDir)) 
{
  fs.mkdirSync(uploadDir);
}

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//srajkumar2026
//RQ62JZLNbxg42VsQ

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

app.post('/login_api', async (req, res) =>{
  const { username, password } = req.body;

    try 
    {
      const user = await User.findOne({username});
      if(!user || user.password !== password) 
      {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      res.json({ message: 'Login successful' });
    } 
    catch(err) 
    {
      res.status(500).json({ message: 'Server error' });
    }
});

app.post('/register_api', async (req, res) => {
const { username, email, password } = req.body;
  try 
  {
    const existingUser = await User.findOne({ username });
    if(existingUser) 
    {
      return res.status(409).json({ message:'Username already exists'});
    }
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.json({ message:'User registered successfully'});
  } 
  catch(err) 
  {
    res.status(500).json({ message:'Server error'});
  }
});

app.post('/forgot_password_api', async (req, res) => {
  const { username, newPassword } = req.body;
  try 
  {
    const user = await User.findOne({ username });
    if(!user) 
    {
        return res.status(404).json({ message: 'Username does not exist' });
    }
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } 
  catch(err) 
  {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/movie_register_api', upload.single('image'), async (req, res) => {
  try 
  {
    const {
      movieName,
      movieNumber,
      actorName,
      directorName,
      email,
      countryCode,
      mobile,
      releaseDate,
      description,
    } = req.body;

    const warnings = [];
    
    const nameExists = await Movie.findOne({ movieName });
    const numberExists = await Movie.findOne({ movieNumber });
    if(nameExists) 
    {
      warnings.push('⚠️ Warning: Movie name already exists.');
    }

    else if(numberExists) 
    {
      warnings.push('⚠️ Warning: Movie number already exists.');
    }

    if(warnings.length > 0) 
    {
      return res.status(200).json({ warnings });
    }

    if(!req.file) 
    {
      return res.status(200).json({ warnings: ['⚠️ Warning: Image is required.'] });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    const newMovie = new Movie({
      movieName,
      movieNumber,
      actorName,
      directorName,
      email,
      countryCode,
      mobile,
      releaseDate,
      imageUrl,
      description,
    });

    await newMovie.save();

    return res.status(201).json({
      message: '✅ Movie registered successfully!',
      movie: newMovie
    });
  } 
  catch(err) 
  {
    console.error('Movie Register Error:', err);
    return res.status(500).json({ message: '❌ Server error. Please try again.' });
  }
});

app.get('/get_all_movies_api', async (req, res) => {
  try
  {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.status(200).json(movies);
  } 
  catch(err) 
  {
    res.status(500).json({ message: 'Server error while fetching movies' });
  }
});


app.delete('/delete_movie_api/:id', async (req, res) => {
  try 
  {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if(!movie) 
    {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const imagePath = path.join(__dirname, movie.imageUrl);
    if(fs.existsSync(imagePath)) 
    {
      fs.unlinkSync(imagePath);
    }

    res.status(200).json({ message: 'Movie deleted successfully' });
  } 
  catch(err) 
  {
    res.status(500).json({ message: 'Server error while deleting movie' });
  }
});


app.put('/update_movie_api/:id', upload.single('image'), async (req, res) => {
  try 
  {
    const updateFields = req.body;

    if(req.file) 
    {
      updateFields.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    if(!updatedMovie) 
    {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json({ message: 'Movie updated successfully', movie: updatedMovie });
  } 
  catch(err) 
  {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Server error while updating movie' });
  }
});

app.put('/update_movie_api/:id', upload.single('image'), async (req, res) => {
  try 
  {
    const updateFields = req.body;
    if(req.file) 
    {
      updateFields.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    if(!updatedMovie) 
    {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json({ message: 'Movie updated successfully', movie: updatedMovie });
  } 
  catch(err) 
  {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Server error while updating movie' });
  }
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 's.rajkumar2026@gmail.com',
    pass: 'enjavxbwubfdutvq'
  }
});

app.post('/contact_api', async (req, res) => {
  const { name, email, message } = req.body;

  try 
  {
    const contact = new Contact({ name, email, message });
    await contact.save();

    await transporter.sendMail({
      from: '"BlueStar Contact" <yourgmail@gmail.com>', 
      to: 's.rajkumar2026@gmail.com',
      subject: 'New Contact Message',
      html: `
        <h3>New Contact Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });

    res.status(201).json({ message: '😍 Message sent successfully' });
  } 
  catch(err) 
  {
    console.error('Contact Error:', err);
    res.status(500).json({ message: '😍 Server error' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
