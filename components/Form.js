import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { mutate } from 'swr';

import FormInput from './FormInput';

const Form = ({ formId, recipeForm, forNewRecipe }) => {
  const router = useRouter();
  const contentType = 'application/json';

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const [form, setForm] = useState({
    recipe_name: recipeForm.recipe_name,
    creator_name: recipeForm.creator_name,
    ingredients: recipeForm.ingredients,
  });

  /* PUT - edit an existing entry in the mongodb database. */
  const putData = async (form) => {
    const { id } = router.query;

    try {
      const res = await fetch(`/api/recipes/${id}`, {
        method: 'PUT',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      });

      // throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      const { data } = await res.json();

      // Update the local data without a revalidation
      mutate(`/api/recipes/${id}`, data, false);
      router.push('/');
    } catch (error) {
      setMessage('Failed to update recipe');
    }
  };

  /* POST- adds a new entry in the mongodb database. */
  const postData = async (form) => {
    try {
      const res = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          Accept: contentType,
          'Content-Type': contentType,
        },
        body: JSON.stringify(form),
      });

      // Throw error with status code in case Fetch API req failed
      if (!res.ok) {
        throw new Error(res.status);
      }

      router.push('/success');
    } catch (error) {
      setMessage('Failed to add recipe');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({ ...form, [name]: value });
  };

  const handleIngredient = (event, index) => {
    const { name, value } = event.target;
    const ingredients = [...form.ingredients];
    ingredients[index][name] = value;

    setForm({ ...form, ingredients });
  };

  const removeIngredient = (index) => {
    const ingredients = [...form.ingredients];
    ingredients.splice(index, 1);

    setForm({ ...form, ingredients });
  };

  const addIngredient = () => {
    const ingredients = [...form.ingredients];
    ingredients.push({ ingredient: '' });

    setForm({ ...form, ingredients });
  };

  const createNewRecipe = (event) => {
    event.preventDefault();

    const errs = formValidate();

    if (Object.keys(errs).length === 0) {
      forNewRecipe ? postData(form) : putData(form);
    } else {
      setErrors({ ...errs });
    }
  };

  /* Makes sure recipe info is filled for recipe name */
  const formValidate = () => {
    let err = {};
    if (!form.recipe_name) err.recipe_name = 'Recipe name is required';
    return err;
  };

  return (
    <>
      <form id={formId} onSubmit={createNewRecipe}>
        <div>
          <label htmlFor="recipe-name">What are you cooking?</label>
          <input
            id="recipe-name"
            type="text"
            name="recipe_name"
            value={form.recipe_name}
            onChange={handleChange}
          />
        </div>

        {form.ingredients.map((item, index) => {
          return (
            <div className="ingredient" key={`${index}`}>
              <FormInput
                value={item.ingredient}
                onChange={(event) => handleIngredient(event, index)}
              />
              {form.ingredients.length !== 1 && (
                <button type="button" onClick={() => removeIngredient(index)}>
                  Remove Ingredient
                </button>
              )}
              {form.ingredients.length - 1 === index && (
                <button type="button" onClick={addIngredient}>
                  Add Ingredient
                </button>
              )}
            </div>
          );
        })}
        <button type="submit">Create Recipe</button>
      </form>
      <p>{message}</p>
      <ul>
        {Object.keys(errors).map((err, index) => (
          <li key={index}>{errors[err]}</li>
        ))}
      </ul>
    </>
  );
};

export default Form;
