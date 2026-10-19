const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/smartphoneShop', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Create Smartphone Schema
const smartphoneSchema = new mongoose.Schema({
  nomTel: String,
  marque: String,
  caracteristiques: String,
  prix: Number,
  stock: Number,
  imageUrl: String
});

const Smartphone = mongoose.model('Smartphone', smartphoneSchema);

// Routes

app.get('/api/smartphones', async (req, res) => {
  try {
    const smartphones = await Smartphone.find();
    console.log("GET - Smartphones récupérés:", smartphones.length);
    res.json(smartphones);
  } catch (error) {
    console.error("GET - Erreur:", error);
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/smartphones/:id', async (req, res) => {
  try {
    const smartphone = await Smartphone.findById(req.params.id);
    if (!smartphone) {
      console.log("GET - Smartphone not found");
      return res.status(404).json({ message: 'Smartphone not found' });
    }
    console.log("GET - Smartphone retrieved:", smartphone);
    res.json(smartphone);
  } catch (error) {
    console.error("GET - Error:", error);
    res.status(500).json({ message: error.message });
  }
});

// Create a new smartphone
app.post('/api/smartphones', async (req, res) => {
  console.log("POST - Données reçues:", req.body);

  const smartphone = new Smartphone({
    nomTel: req.body.nomTel,
    marque: req.body.marque,
    caracteristiques: req.body.caracteristiques,
    prix: req.body.prix,
    stock: req.body.stock,
    imageUrl: req.body.imageUrl
  });

  try {
    const newSmartphone = await smartphone.save();
    console.log("POST - Smartphone sauvegardé:", newSmartphone);
    res.status(201).json(newSmartphone);
  } catch (error) {
    console.error("POST - Erreur:", error);
    res.status(400).json({ message: error.message });
  }
});

// Update a smartphone
app.put('/api/smartphones/:id', async (req, res) => {
  console.log(`PUT - ID: ${req.params.id}, Données:`, req.body);

  try {
    const smartphone = await Smartphone.findById(req.params.id);
    if (!smartphone) {
      console.log("PUT - Smartphone non trouvé");
      return res.status(404).json({ message: 'Smartphone not found' });
    }

    smartphone.nomTel = req.body.nomTel;
    smartphone.marque = req.body.marque;
    smartphone.caracteristiques = req.body.caracteristiques;
    smartphone.prix = req.body.prix;
    smartphone.stock = req.body.stock;
    smartphone.imageUrl = req.body.imageUrl;

    const updatedSmartphone = await smartphone.save();
    console.log("PUT - Smartphone mis à jour:", updatedSmartphone);
    res.json(updatedSmartphone);
  } catch (error) {
    console.error("PUT - Erreur:", error);
    res.status(400).json({ message: error.message });
  }
});

// Delete a smartphone
app.delete('/api/smartphones/:id', async (req, res) => {
  console.log("DELETE - ID:", req.params.id);

  try {
    const smartphone = await Smartphone.findById(req.params.id);
    if (!smartphone) {
      console.log("DELETE - Smartphone non trouvé");
      return res.status(404).json({ message: 'Smartphone not found' });
    }

    await smartphone.deleteOne();
    console.log("DELETE - Smartphone supprimé");
    res.json({ message: 'Smartphone deleted' });
  } catch (error) {
    console.error("DELETE - Erreur:", error);
    res.status(500).json({ message: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});