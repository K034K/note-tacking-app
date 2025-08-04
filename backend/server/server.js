require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const url = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// Note schema
const Note = mongoose.model('Note', { title: String, content: String });

// Routes
app.get('/notes', async (req, res) => {
  const notes = await Note.find();
  res.json(notes);
});

app.post('/notes', async (req, res) => {
  const note = new Note(req.body);
  await note.save();
  res.json(note);
});

app.delete('/notes/:id', async (req, res) => {
  const { id } = req.params;
    await Note.findByIdAndDelete(id);
  res.json({ message: 'Note deleted' });
});

app.put('/notes/:id', async (req, res) => {
  const { id } = req.params;
  const updatedNote = await Note.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updatedNote);
});

app.listen(5000, () => console.log('Server running on port 5000'));