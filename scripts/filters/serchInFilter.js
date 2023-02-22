const ingredientSearch = document.querySelector("#ingredient-filter-input");
const appareilSearch = document.querySelector("#appareil-filter-input");
const ustensileSearch = document.querySelector("#ustensile-filter-input");

//register events for each filter type
ingredientSearch.addEventListener("input", (e) => {
  handleIngredientSearch(e, "ingredient");
});
appareilSearch.addEventListener("input", (e) => {
  handleIngredientSearch(e, "appareil");
});
ustensileSearch.addEventListener("input", (e) => {
  handleIngredientSearch(e, "ustensile");
});

function handleIngredientSearch(e, type) {
  const filter = document.querySelector(`#${type}-filter`);
  const availableTags = Array.from(document.querySelectorAll(`#${type}-filters li`));
  const searchValue = e.target.value;
  availableTags.forEach((t) => {
    //display only available tags for each type
    if (!t.textContent.toLowerCase().includes(searchValue.toLowerCase())) {
      t.classList.add("hide-tag-filter");
    } else {
      t.classList.remove("hide-tag-filter");
    }
  });
  setOpenFiltersSize(filter);
}
