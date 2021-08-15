import mongoose from 'mongoose';

const ListSchema = new mongoose.Schema({
  list_name: {
    type: String,
    required: [true, 'Please provide a name for the list.'],
  },
  list_creator: {
    type: String,
    // required: [true, 'You must be logged in to save a recipe.'],
  },
  list_meals: {
    type: Array,
  },
});

export default mongoose.models.List || mongoose.model('List', ListSchema);
