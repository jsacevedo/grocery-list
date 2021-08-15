import dbConnect from '../../../lib/dbConnect';

import List from '../../../models/List';

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
        const list = await List.findById(id);

        if (!list) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, data: list });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    /* Edit a model by its ID */
    case 'PUT':
      try {
        const list = await List.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!list) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: list });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    /* Delete a model by its ID */
    case 'DELETE':
      try {
        const deletedList = await List.deleteOne({ _id: id });
        if (!deletedList) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
