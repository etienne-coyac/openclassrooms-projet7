const selectedTagsContainer = document.querySelector("#selected-filters");

function filterRecipesByTags() {
  const openFilter = document.querySelector(".type-filter.filter-open");
  const allSelectedTags = Array.from(document.querySelectorAll("#selected-filters .tag"));
  const allRecipes = document.querySelectorAll(".recipe");
  const allTags = {
    ingredientTags: document.querySelectorAll("#ingredient-filters li"),
    appareilTags: document.querySelectorAll("#appareil-filters li"),
    ustensileTags: document.querySelectorAll("#ustensile-filters li"),
  };
  const extractTagValuesByType = (type) => {
    return allSelectedTags
      .filter((st) => st.getAttribute("data-tagtype") === type)
      .map((t) => t.getAttribute("data-tagvalue"));
  };

  const getRecipeByTags = (tagsObject) => {
    return recipesData
      .filter((r) => {
        const ingrs = r.ingredients.map((i) => i.ingredient);
        return tagsObject.ingredients.every((i) => ingrs.indexOf(i) !== -1) || tagsObject.ingredients.length === 0;
      })
      .filter((r) => tagsObject.appareils.includes(r.appliance) || tagsObject.appareils.length === 0)
      .filter((r) => tagsObject.ustensiles.every((u) => r.ustensils.indexOf(u) !== -1));
  };

  const setAvailableTags = (recipes) => {
    const availableTags = {
      ingredientTags: [...new Set(recipes.map((r) => r.ingredients.map((i) => i.ingredient)).flat())],
      appareilTags: [...new Set(recipes.map((r) => r.appliance))],
      ustensileTags: [...new Set(recipes.map((r) => r.ustensils).flat())],
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

  const sortedTags = {
    ingredients: extractTagValuesByType("ingredient"),
    appareils: extractTagValuesByType("appareil"),
    ustensiles: extractTagValuesByType("ustensile"),
  };

  //let only matching recipes
  const availableRecipes = getRecipeByTags(sortedTags);
  const availableRecipesIds = availableRecipes.map((r) => r.id);
  allRecipes.forEach((r) => {
    if (availableRecipesIds.includes(parseInt(r.getAttribute("data-recipeid")))) {
      r.classList.remove("hide-recipe");
    } else {
      r.classList.add("hide-recipe");
    }
  });
  setAvailableTags(availableRecipes);
  if (openFilter) {
    setOpenFiltersSize(openFilter);
  }
}

function registerFilterListEvents() {
  // get all tags in the 3 lists
  const tags = [
    ...ingredientsFilterList.querySelectorAll("li"),
    ...appareilFilterList.querySelectorAll("li"),
    ...ustensileFilterList.querySelectorAll("li"),
  ];
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
  filterRecipesByTags();
}

function handleDeleteTag(e) {
  e.currentTarget.outerHTML = "";
  filterRecipesByTags();
}
