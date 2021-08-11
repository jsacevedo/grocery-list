import dbConnect from '../../../lib/dbConnect';

import Pet from '../../../models/Recipe';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    /* Get a model by its ID */
    case 'GET':
      try {
        const recipe = await Recipe.findById(id);

        if (!recipe) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: recipe });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
