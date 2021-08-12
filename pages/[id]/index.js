import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import dbConnect from '../../lib/dbConnect';
import Recipe from '../../models/Recipe';

const RecipePage = ({ recipe }) => {
  const router = useRouter();
  const [message, setMessage] = useState('');

  return (
    <div key={recipe._id}>
      {recipe.recipe_name}
      <ul>
        {recipe.ingredients.map((data, index) => (
          <li key={index}>{Object.values(data)}</li>
        ))}
      </ul>
      <Link href="/[id]/edit" as={`/${recipe._id}/edit`}>
        <button type="button">Edit</button>
      </Link>
      <button type="button">Delete</button>
      <button type="button">Add</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export async function getServerSideProps({ params }) {
  await dbConnect();

  const recipe = await Recipe.findById(params.id).lean();
  recipe._id = recipe._id.toString();

  return { props: { recipe } };
}

export default RecipePage;
