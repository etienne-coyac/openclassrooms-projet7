const recipesSection = document.querySelector("#recipes");
const ingredientsFilterList = document.querySelector("#ingredient-filters");
const appareilFilterList = document.querySelector("#appareil-filters");
const ustensileFilterList = document.querySelector("#ustensile-filters");

function init() {
  const recipeFactory = getRecipeFactory(recipesData);
  recipesSection.innerHTML = recipeFactory.getAllRecipesDOM();
  ingredientsFilterList.innerHTML = recipeFactory.getAllIngredients();
  appareilFilterList.innerHTML = recipeFactory.getAllAppareils();
  ustensileFilterList.innerHTML = recipeFactory.getAllUstensiles();
  registerFilterListEvents();
}

init();
