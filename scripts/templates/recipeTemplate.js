class RecipeTemplate {
  constructor(recipes) {
    this.recipes = recipes;
  }

  getRecipeCard(id) {
    const recipe = this.recipes.find((r) => r.id === id);
    const { name, servings, ingredients, time, description, appliance, ustensils } = recipe;
    return `<article class="recipe" data-recipeid="${id}">
    <div class="image-placeholder"></div>
    <div class="recipe-content">
      <div class="recipe-title">
        <h4>${name}</h4>
        <div class="recipe-time">
          <i class="fa-regular fa-clock"></i>
          <span>${time} min</span>
        </div>
      </div>
      <div class="recipe-description">
        <ul class="recipe-ingredients">
          ${ingredients
            .map(
              (i) =>
                `<li><b>${i.ingredient}${i.quantity ? ":" : ""}</b> ${i.quantity ? i.quantity : ""}${
                  i.unit ? (i.unit.length > 2 ? ` ${i.unit}` : i.unit) : ""
                }</li>`
            )
            .join("")}
        </ul>
        <p class="recipe-text">
          ${description.slice(0, 200)}${description.length > 200 ? "..." : ""}
        </p>
      </div>
    </div>
  </article>`;
  }

  getAllIngredients() {
    return [...new Set(this.recipes.map((r) => r.ingredients.map((i) => i.ingredient)).flat())]
      .map((i) => `<li>${i}</li>`)
      .join("");
  }
  getAllAppareils() {
    return [...new Set(this.recipes.map((r) => r.appliance))].map((i) => `<li>${i}</li>`).join("");
  }
  getAllUstensiles() {
    return [...new Set(this.recipes.map((r) => r.ustensils).flat())].map((i) => `<li>${i}</li>`).join("");
  }

  static getTag(type, value) {
    return `<li class="${type}-color tag" data-tagvalue="${value}" data-tagtype="${type}">
    ${value}<span><i class="fa-solid fa-xmark"></i></span>
  </li>`;
  }
}
