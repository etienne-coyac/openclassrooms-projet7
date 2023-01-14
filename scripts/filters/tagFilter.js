const selectedTagsContainer = document.querySelector("#selected-filters");

function filterRecipesByTags() {
  const allSelectedTags = Array.from(document.querySelectorAll("#selected-filters .tag"));
  const allRecipes = document.querySelectorAll(".recipe");

  const extractTagValuesByType = (type) => {
    return allSelectedTags
      .filter((st) => st.getAttribute("data-tagtype") === type)
      .map((t) => t.getAttribute("data-tagvalue"));
  };

  const getRecipeIdsByTags = (tagsObject) => {
    return recipesData
      .filter(
        (r) =>
          r.ingredients.map((i) => i.ingredient).some((i) => tagsObject.ingredients.includes(i)) ||
          tagsObject.ingredients.length === 0
      )
      .filter((r) => tagsObject.appareils.includes(r.appliance) || tagsObject.appareils.length === 0)
      .filter((r) => tagsObject.ustensiles.every((u) => r.ustensils.indexOf(u) !== -1))
      .map((r) => r.id);
  };

  const sortedTags = {
    ingredients: extractTagValuesByType("ingredient"),
    appareils: extractTagValuesByType("appareil"),
    ustensiles: extractTagValuesByType("ustensile"),
  };

  const availableRecipesIds = getRecipeIdsByTags(sortedTags);
  allRecipes.forEach((r) => {
    if (availableRecipesIds.includes(parseInt(r.getAttribute("data-recipeid")))) {
      r.classList.remove("hide-recipe");
    } else {
      r.classList.add("hide-recipe");
    }
  });
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
