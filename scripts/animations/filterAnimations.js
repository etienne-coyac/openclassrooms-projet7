// document.addEventListener("click", handleClickOutsideTagLists);

// function handleClickOutsideTagLists(e) {
//   const ingredientsFilter = document.querySelector("#ingredient-filter");
//   const appareilsFilter = document.querySelector("#appareil-filter");
//   const ustensilesFilter = document.querySelector("#ustensile-filter");
//   const selectedTags = document.querySelectorAll("#selected-filters .tag");
//   console.log(selectedTags, e.target);
//   if (!ingredientsFilter.contains(e.target)) toggleCollapseFilter(ingredientsFilter);
//   if (!appareilsFilter.contains(e.target)) toggleCollapseFilter(appareilsFilter);
//   if (!ustensilesFilter.contains(e.target)) toggleCollapseFilter(ustensilesFilter);
//   console.log(e.target);
//   if (!selectedTags.contains(e.target)) {
//     toggleCollapseFilter(ingredientsFilter);
//     toggleCollapseFilter(appareilsFilter);
//     toggleCollapseFilter(ustensilesFilter);
//   }
// }

//register events
const typeFilters = document.querySelectorAll(".type-filter-title");

typeFilters.forEach((t) => {
  t.addEventListener("click", (e) => {
    handleFilterClick(e);
  });
});

function handleFilterClick(e) {
  const filter = e.currentTarget.parentNode;
  const clickTarget = e.target;
  //close tag filter if click outside text input
  if (filter.classList.contains("filter-open")) {
    if (clickTarget.localName !== "input") {
      toggleCollapseFilter(filter);
    }
  } else {
    //close others if open -> only 1 open at a time
    const alreadyOpen = document.querySelector(".filter-open");
    if (alreadyOpen) {
      toggleCollapseFilter(alreadyOpen);
    }
    toggleOpenFilter(filter);
  }
}

function toggleOpenFilter(filter) {
  filter.classList.add("filter-open");
  const input = filter.querySelector(".filter-input");
  setOpenFiltersSize(filter);
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", `Rechercher un ${input.getAttribute("data-text").toLowerCase().slice(0, -1)}...`);
  input.setAttribute("value", "");
  input.focus();
}
function toggleCollapseFilter(filter) {
  filter.classList.remove("filter-open");
  const input = filter.querySelector(".filter-input");
  //reset tags filters search
  Array.from(filter.querySelectorAll(".hide-tag-filter")).forEach((t) => t.classList.remove("hide-tag-filter"));
  setClosedFiltersSize(filter);
  input.removeAttribute("placeholder");
  input.setAttribute("type", "button");
  input.setAttribute("value", input.getAttribute("data-text"));
}

function setOpenFiltersSize(filter) {
  //compute filter window size to properly fit content
  const wrapper = filter.querySelector(".filter-list-wrapper");
  wrapper.style.overflowY = "hidden";
  const content = filter.querySelector(".type-filter-content");
  const contentHeight = content.scrollHeight + 15;
  const contentWidth = content.scrollWidth;
  wrapper.style.height = `${contentHeight > 500 ? 500 : contentHeight}px`;
  wrapper.style.width = `${contentWidth < 280 ? 280 : contentWidth}px`;
  filter.style.width = `${contentWidth < 280 ? 280 : contentWidth}px`;

  //delay to avoid text clip
  setTimeout(function () {
    wrapper.style.overflowY = "auto";
  }, 400);
}

function setClosedFiltersSize(filter) {
  const wrapper = filter.querySelector(".filter-list-wrapper");
  //reset size to default (hidden)
  wrapper.style.height = "0px";
  wrapper.style.width = "170px";
  filter.style.width = "170px";
}
