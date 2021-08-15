import Link from 'next/link';

export default function Recipes({ recipes }) {
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
    </>
  );
}
