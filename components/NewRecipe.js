import Form from './Form';

const NewRecipe = () => {
  const recipeForm = {
    recipe_name: '',
    creator_name: 'Default',
    ingredients: [{ ingredient: '' }],
  };

  return <Form formId="add-new-recipe" recipeForm={recipeForm} />;
};

export default NewRecipe;
