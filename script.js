"use strict";
const body = document.body;
const div_2 = document.createElement("div");
div_2.classList.add("container-fluid", "row", "country_row");
body.append(div_2);
// To get data from Marvel API
const getCharacters = function (keyword) {
  if (keyword == "") {
    alert("Please Enter valid name, Try again!!!");
  } else {
    fetch(
      `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${keyword}&ts=1&apikey=4d8b0740627f81add1cd57dfa0d0c9de&hash=0f7c662a53129c40a6ce012a7e3d392d`
    )
      .then((response) => response.json())
      .then((data) => {
        displayCharacters(data.data.results);
      })
      .catch((err) => console.error(err));
  }
};

// To process the API

function displayCharacters(data) {
  let searchArea = document.querySelector(".search-columns");
  searchArea.innerHTML = `<div class = "imageText">Please click the image of the character to see the related details/comics</div>`;
  let searchButton = document.querySelector(".search-columns2");
  searchButton.innerHTML = `<button id="return-button" class="search-btn">return</button>
  </div>`;
  let returnButton = document.querySelector("#return-button");
  returnButton.addEventListener("click", () => {
    location.reload();
  });
  div_2.innerHTML = ``;
  for (let characters of data) {
    const div_3 = document.createElement("div");
    div_3.classList.add("card", "h-100", "col-lg-4", "col-sm-12");
    div_2.append(div_3);
    const div_4 = document.createElement("div");
    div_4.classList.add("card-header", "text-center", "name");
    div_4.textContent = `${characters?.name}`;
    div_3.append(div_4);
    const anchor = document.createElement("a");
    anchor.setAttribute("href", `${characters?.urls[0].url}`);
    anchor.setAttribute("target", "blank");
    div_3.append(anchor);
    const img = document.createElement("img");
    img.classList.add("card-img-top", "flag", "mt-3");
    img.setAttribute(
      "src",
      `${characters?.thumbnail?.path}/portrait_fantastic.${characters?.thumbnail?.extension}`
    );
    anchor.append(img);
  }
}

const button = document.getElementById("submit-button");
button.addEventListener("click", () => {
  var input = document.getElementById("charName").value;
  getCharacters(input);
});