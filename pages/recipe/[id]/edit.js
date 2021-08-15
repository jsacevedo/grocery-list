import { useRouter } from 'next/router';
import Head from 'next/head';
import useSWR from 'swr';

// Import components
import Form from '../../../components/Form';

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data);

const EditRecipe = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: recipe, error } = useSWR(
    id ? `/api/recipes/${id}` : null,
    fetcher
  );

  if (error) return <p>Failed to load</p>;
  if (!recipe) return <p>Loading...</p>;

  const recipeForm = {
    recipe_name: recipe.recipe_name,
    creator_name: recipe.creator_name,
    ingredients: recipe.ingredients,
  };

  return (
    <>
      <Head>
        <title>Grocery List | {recipe.recipe_name}</title>
      </Head>
      <Form
        formId="edit-recipe-form"
        recipeForm={recipeForm}
        forNewRecipe={false}
      />
    </>
  );
};

export default EditRecipe;
