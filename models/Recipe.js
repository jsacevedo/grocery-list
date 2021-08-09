import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
  recipe_name: {
    type: String,
    required: [true, 'Please provide a name for the recipe.'],
  },
  creator_name: {
    type: String,
    // required: [true, 'You must be logged in to save a recipe.'],
  },
  ingredients: {
    type: Array,
  },
});

export default mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema);
