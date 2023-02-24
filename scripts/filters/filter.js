const selectedTagsContainer = document.querySelector("#selected-filters");
const mainSearchInput = document.querySelector("#main-text-search-input");
const noResult = document.querySelector("#no-result");

mainSearchInput.addEventListener("input", handleMainInputChange);

function handleMainInputChange(e) {
  displayAvailableRecipesAndTags();
}

const getRecipesByTags = () => {
  const allSelectedTags = Array.from(document.querySelectorAll("#selected-filters .tag"));
  const extractTagValuesByType = (type) => {
    return allSelectedTags
      .filter((st) => st.getAttribute("data-tagtype") === type)
      .map((t) => t.getAttribute("data-tagvalue"));
  };
  //get all selected tags
  const tagsObject = {
    ingredients: extractTagValuesByType("ingredient"),
    appareils: extractTagValuesByType("appareil"),
    ustensiles: extractTagValuesByType("ustensile")
  };
  //filter recipes with selected tags
  return recipesData
    .filter((r) => {
      const ingrs = r.ingredients.map((i) => i.ingredient);
      return tagsObject.ingredients.every((i) => ingrs.indexOf(i) !== -1) || tagsObject.ingredients.length === 0;
    })
    .filter((r) => tagsObject.appareils.includes(r.appliance) || tagsObject.appareils.length === 0)
    .filter((r) => tagsObject.ustensiles.every((u) => r.ustensils.indexOf(u) !== -1));
};

const getFiteredRecipes = (text) => {
  //if no text, filter only by tags
  if (text === undefined || text === "") {
    return getRecipesByTags();
  }
  text = text.toLowerCase();
  // const data = getRecipesByTags();
  // const res = [];
  // for (let i = 0; i < data.length; i++) {
  //   //ingredients
  //   let ingredientExists = false;
  //   for (let j = 0; j < data[i].ingredients.length; j++) {
  //     if (data[i].ingredients[j].ingredient.includes(text)) {
  //       ingredientExists = true;
  //     }
  //   }
  //   const nameExists = data[i].name.includes(text);
  //   const descriptionExists = data[i].description.includes(text);
  //   if (ingredientExists || nameExists || descriptionExists) {
  //     res.push(data[i]);
  //   }
  // }
  // return res;

  const filterFunction = (r) =>
    r.ingredients.some((i) => i.ingredient.toLowerCase().includes(text)) ||
    r.name.toLowerCase().includes(text) ||
    r.description.toLowerCase().includes(text);
  //filter recipes with both tags & text search bar
  const res = getRecipesByTags().filter((r) => filterFunction(r));
  return res;
};

function displayAvailableRecipesAndTags() {
  const openFilter = document.querySelector(".type-filter.filter-open");
  //get all recipes & tags from DOM to hide or display them
  const allRecipes = document.querySelectorAll(".recipe");
  const allTags = {
    ingredientTags: document.querySelectorAll("#ingredient-filters li"),
    appareilTags: document.querySelectorAll("#appareil-filters li"),
    ustensileTags: document.querySelectorAll("#ustensile-filters li")
  };
  const text = mainSearchInput.value;

  //define a function to set available tags when recipes are filtered
  const setAvailableTags = (recipes) => {
    const availableTags = {
      ingredientTags: [...new Set(recipes.map((r) => r.ingredients.map((i) => i.ingredient)).flat())],
      appareilTags: [...new Set(recipes.map((r) => r.appliance))],
      ustensileTags: [...new Set(recipes.map((r) => r.ustensils).flat())]
    };
    allTags.ingredientTags.forEach((it) => {
      availableTags.ingredientTags.includes(it.textContent)
        ? it.classList.remove("hide-tag")
        : it.classList.add("hide-tag");
    });
    allTags.appareilTags.forEach((it) => {
      availableTags.appareilTags.includes(it.textContent)
        ? it.classList.remove("hide-tag")
        : it.classList.add("hide-tag");
    });
    allTags.ustensileTags.forEach((it) => {
      availableTags.ustensileTags.includes(it.textContent)
        ? it.classList.remove("hide-tag")
        : it.classList.add("hide-tag");
    });
  };

  //only matching recipes
  const availableRecipes = getFiteredRecipes(text);
  const availableRecipesIds = availableRecipes.map((r) => r.id);
  allRecipes.forEach((r) => {
    if (availableRecipesIds.includes(parseInt(r.getAttribute("data-recipeid")))) {
      //if recipe id is in availableRecipesIds list
      r.classList.remove("hide-recipe");
    } else {
      //else hide recipe
      r.classList.add("hide-recipe");
    }
  });

  // if no result display error message
  if (availableRecipes.length === 0) {
    noResult.classList.add("display-no-result");
  } else {
    noResult.classList.remove("display-no-result");
  }
  //hide or display tags
  setAvailableTags(availableRecipes);
  if (openFilter) {
    // reset filter window size if open
    setOpenFiltersSize(openFilter);
  }
}

function registerFilterListEvents() {
  // get all tags in the 3 lists
  const tags = [
    ...ingredientsFilterList.querySelectorAll("li"),
    ...appareilFilterList.querySelectorAll("li"),
    ...ustensileFilterList.querySelectorAll("li")
  ];
  //add event listener on each one
  tags.forEach((t) => t.addEventListener("click", handleTagClick));
}

function handleTagClick(e) {
  const tagType = e.currentTarget.parentNode.getAttribute("id").split("-")[0];
  const tagValue = e.currentTarget.textContent;

  //   check if tag is already selected
  const allSelectedTags = Array.from(document.querySelectorAll("#selected-filters .tag"));
  if (allSelectedTags.some((t) => t.getAttribute("data-tagvalue") === tagValue)) {
    return;
  }
  if (allSelectedTags.some((t) => t.getAttribute("data-tagtype") === "appareil") && tagType === "appareil") {
    return;
  }

  //create child node
  const template = document.createElement("template");
  template.innerHTML = RecipeTemplate.getTag(tagType, tagValue);
  selectedTagsContainer.appendChild(template.content.firstChild);

  //add event listener for delete tag
  const allTags = document.querySelectorAll(".tag");
  const newTag = allTags[allTags.length - 1];
  newTag.addEventListener("click", handleDeleteTag);
  displayAvailableRecipesAndTags();
}

//on delete tag
function handleDeleteTag(e) {
  e.currentTarget.outerHTML = "";
  //recompute available recipes
  displayAvailableRecipesAndTags();
}
