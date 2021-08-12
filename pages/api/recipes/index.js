import dbConnect from '../../../lib/dbConnect';
import Recipe from '../../../models/Recipe';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    /* GET - Find all recipes in the database */
    case 'GET':
      try {
        const recipes = await Recipe.find({});
        res.status(200).json({ success: true, data: recipes });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    /* POST - Create a new recipe in the database */
    case 'POST':
      try {
        const recipe = await Recipe.create(req.body);
        res.status(201).json({ success: true, data: recipe });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
