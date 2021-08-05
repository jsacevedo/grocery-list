import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

// Import Components
import FormInput from '../components/FormInput';

// import Styles
import styles from '../styles/Home.module.scss';

const Home = () => {
  const [ingredientsList, setIngredientsList] = useState([{ ingredient: '' }]);

  const handleChange = (event, index) => {
    const { name, value } = event.target;

    const ingredients = [...ingredientsList];
    ingredients[index][name] = value;
    setIngredientsList(ingredients);
  };

  const addIngredient = () => {
    setIngredientsList([...ingredientsList, { ingredient: '' }]);
  };

  return (
    <>
      <form>
        <div className={styles.input}>
          <label htmlFor="recipe-name">What are you cooking?</label>
          <input id={styles.recipeName} type="text" name="recipe-name" />
        </div>

        {ingredientsList.map((x, index) => {
          return (
            <div className="ingredient" key={`${x}-${index}`}>
              <FormInput
                value={x.ingredient}
                onChange={(event) => handleChange(event, index)}
              />
            </div>
          );
        })}

        <button type="button" onClick={addIngredient}>
          Add Ingredient
        </button>
      </form>
    </>
  );
};

export default Home;
