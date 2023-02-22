//define factory functions
function getRecipeFactory(recipes) {
  const recipeTemplate = new RecipeTemplate(recipes);

  const getAllRecipesDOM = () => {
    return recipes
      .map((r) => {
        return recipeTemplate.getRecipeCard(r.id);
      })
      .join("");
  };

  const getOneRecipeDOM = (id) => {
    return recipeTemplate.getRecipeCard(r.id);
  };

  const getAllIngredients = () => {
    return recipeTemplate.getAllIngredients();
  };
  const getAllAppareils = () => {
    return recipeTemplate.getAllAppareils();
  };
  const getAllUstensiles = () => {
    return recipeTemplate.getAllUstensiles();
  };

  return { getAllRecipesDOM, getOneRecipeDOM, getAllIngredients, getAllAppareils, getAllUstensiles };
}
