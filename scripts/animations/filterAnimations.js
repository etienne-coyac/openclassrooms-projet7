document.addEventListener("click", handleClickOutsideTagLists);

function handleClickOutsideTagLists(e) {
  const ingredientsFilter = document.querySelector("#ingredient-filter");
  const appareilsFilter = document.querySelector("#appareil-filter");
  const ustensilesFilter = document.querySelector("#ustensile-filter");
  if (!ingredientsFilter.contains(e.target)) toggleCollapseFilter(ingredientsFilter);
  if (!appareilsFilter.contains(e.target)) toggleCollapseFilter(appareilsFilter);
  if (!ustensilesFilter.contains(e.target)) toggleCollapseFilter(ustensilesFilter);
}

const typeFilters = document.querySelectorAll(".type-filter-title");

typeFilters.forEach((t) => {
  t.addEventListener("click", (e) => {
    handleFilterClick(e);
  });
});

function handleFilterClick(e) {
  const filter = e.currentTarget.parentNode;
  const clickTarget = e.target;
  if (filter.classList.contains("filter-open")) {
    if (clickTarget.localName !== "input") {
      toggleCollapseFilter(filter);
    }
  } else {
    //close others if open
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
  input.setAttribute("value", "");
  input.focus();
}
function toggleCollapseFilter(filter) {
  filter.classList.remove("filter-open");
  const input = filter.querySelector(".filter-input");
  setClosedFiltersSize(filter);
  input.setAttribute("type", "button");
  input.setAttribute("value", input.getAttribute("data-text"));
}

function setOpenFiltersSize(filter) {
  const content = filter.querySelector(".type-filter-content");
  content.style.padding = `0px 15px 15px 15px`;
  const contentHeight =
    content.scrollHeight + parseFloat(content.style.paddingTop) + parseFloat(content.style.paddingBottom);
  const contentWidth = content.scrollWidth;
  content.style.height = `${contentHeight > 500 ? 500 : contentHeight}px`;
  content.style.width = `${contentWidth < 280 ? 280 : contentWidth}px`;
  filter.style.width = `${contentWidth < 280 ? 280 : contentWidth}px`;
}

function setClosedFiltersSize(filter) {
  const content = filter.querySelector(".type-filter-content");
  content.style.height = "0px";
  content.style.width = "170px";
  content.style.padding = "0 15px";
  filter.style.width = "170px";
}
