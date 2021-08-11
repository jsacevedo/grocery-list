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
          {recipe.ingredients.map((data, index) => (
            <li key={index}>{Object.values(data)}</li>
          ))}
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
