const cocktails = await (await fetch("./data.json")).json();
console.log(cocktails);

// Generate two side navs
const navLeft = document.querySelector("#nav-left ul");
const navRight = document.querySelector("#nav-right ul");
const arrayHalfIndex = Math.round(cocktails.length / 2);
initNav(navLeft, cocktails.slice(0, arrayHalfIndex));
initNav(navRight, cocktails.slice(arrayHalfIndex));

function initNav(navContainer, cocktails) {
  cocktails.forEach((cocktail) => {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.innerText = cocktail.name;
    link.href = "";
    link.addEventListener("click", function (e) {
      e.preventDefault();
      fillGlass(cocktail);
    });
    listItem.append(link);
    navContainer.append(listItem);
  });
}

function fillGlass({ name, ingredients }) {
  const innerGlass = document.getElementById("glass-inner");
  let ingredientsTemplate = "";
  const totalParts = getTotalParts(ingredients);
  console.log(totalParts);
  for (let i = ingredients.length - 1; i >= 0; i--) {
    ingredientsTemplate += addIngredient(ingredients[i], i, totalParts);
  }
  //   cocktail.ingredients.forEach((ingredient, index) => {
  //     ingredientsTemplate += addIngredient(ingredient, index);
  //   });
  innerGlass.innerHTML = ingredientsTemplate;
}

function getTotalParts(ingredients) {
  return ingredients.reduce((sum, ingredient) => sum + ingredient.part, 0);
}

function addIngredient(ingredient, index, totalParts) {
  const partPercentage = (ingredient.part * 100) / totalParts;
  return `
        <div
        class="ingredient animated animated-${index}"
        style="height: ${partPercentage}%; background-color: ${ingredient.color}"
    >
        <p class="ingredient__description">${ingredient.part} part of ${ingredient.name}</p>
    </div>
    `;
}
