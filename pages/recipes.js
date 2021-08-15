import Head from 'next/head';

// Import components
import Recipes from '../components/Recipes';

// Import models
import Recipe from '../models/Recipe';

// Import libs
import dbConnect from '../lib/dbConnect';

export default function RecipesPage({ recipes }) {
  return (
    <>
      <Head>
        <title>Grocery List | Recipes</title>
      </Head>
      <Recipes recipes={recipes} />
    </>
  );
}

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
