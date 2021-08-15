import dbConnect from '../../../lib/dbConnect';
import List from '../../../models/List';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    /* GET - Find all recipes in the database */
    case 'GET':
      try {
        const lists = await List.find({});
        res.status(200).json({ success: true, data: lists });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    /* POST - Create a new recipe in the database */
    case 'POST':
      try {
        const list = await List.create(req.body);
        res.status(201).json({ success: true, data: list });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
