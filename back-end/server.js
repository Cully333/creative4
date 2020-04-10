const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const recipeSchema = new mongoose.Schema({
  recipeName: String,
  description: String,
  ingredientList: String,
  path: String,
});

const staffSchema = new mongoose.Schema({
  staffName: String,
  about: String,
  favoriteRecipe: String,
  path: String,
});

recipeSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });

recipeSchema.set('toJSON', {
  virtuals: true
});

staffSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });

staffSchema.set('toJSON', {
  virtuals: true
});

const Recipe = mongoose.model('Recipe', recipeSchema);

const Staff = mongoose.model('Staff', staffSchema);

// connect to the database
mongoose.connect('mongodb://localhost:27017/creative4', {
  useNewUrlParser: true
});

app.listen(3000, () => console.log('Server listening on port 3000!'));

app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

app.post('/api/recipes', async (req, res) => {
  const recipe = new Recipe({
    recipeName: req.body.recipeName,
    path: req.body.path,
    description: req.body.description,
    ingredientList: req.body.ingredientList,
  });
  try {
    await recipe.save();
    res.send(recipe);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/recipes', async (req, res) => {
  try {
    let recipes = await Recipe.find();
    res.send(recipes);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/recipes/:id', async (req, res) => {
  try {
    await Recipe.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/recipes/:id', async (req, res) => {
  try {
    let recipe = new Recipe;
    recipe = await Recipe.findOne({
      _id: req.params.id
    });
    recipe.recipeName = req.body.recipeName;
    recipe.description = req.body.description;
    recipe.ingredientList = req.body.ingredientList;
    recipe.save();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.post('/api/staffs', async (req, res) => {
  const staff = new Staff({
    staffName: req.body.staffName,
    path: req.body.path,
    about: req.body.about,
    favoriteRecipe: req.body.favoriteRecipe,
  });
  try {
    await staff.save();
    res.send(staff);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/staffs', async (req, res) => {
  try {
    let staffs = await Staff.find();
    res.send(staffs);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/staffs/:id', async (req, res) => {
  try {
    await Staff.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/staffs/:id', async (req, res) => {
  try {
    let staff = new Staff;
    staff = await Staff.findOne({
      _id: req.params.id
    });
    staff.staffName = req.body.staffName;
    staff.about = req.body.about;
    staff.favoriteRecipe = req.body.favoriteRecipe;
    staff.save();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
