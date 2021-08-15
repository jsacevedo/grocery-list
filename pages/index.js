import Link from 'next/link';

import dbConnect from '../lib/dbConnect';

import Recipe from '../models/Recipe';

// Import Components
import NewRecipe from '../components/NewRecipe';

// import Styles
import styles from '../styles/Home.module.scss';

const Home = ({ recipes }) => {
  return (
    <>
      {recipes.map((recipe) => (
        <div key={recipe._id}>
          {recipe.recipe_name}
          <ul>
            {recipe.ingredients.map((data, index) => (
              <li key={index}>{Object.values(data)}</li>
            ))}
          </ul>
          <Link href="/recipe/[id]/edit" as={`/recipe/${recipe._id}/edit`}>
            <button type="button">Edit</button>
          </Link>
          <Link href="/recipe/[id]" as={`/recipe/${recipe._id}`}>
            <button type="button">View</button>
          </Link>
          <button type="button">Add</button>
        </div>
      ))}
      <NewRecipe />
    </>
  );
};

export async function getServerSideProps() {
  await dbConnect();

  const result = await Recipe.find({});
  const recipes = result.map((doc) => {
    const recipe = doc.toObject();
    recipe._id = recipe._id.toString();
    return recipe;
  });

  return { props: { recipes: recipes } };
}

export default Home;
