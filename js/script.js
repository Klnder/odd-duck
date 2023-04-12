"use strict";
let imgContainer = document.querySelector(".image");
let image1 = document.querySelector(".image img:first-child");
let image2 = document.querySelector(".image img:nth-child(2)");
let image3 = document.querySelector(".image img:nth-child(3)");
let viewResultText = document.querySelector(".view-result-text");
let resultView = document.querySelector(".resultat");
let resultButton = document.getElementById("result-button");
resultButton.style.visibility = "hidden";
const table = document.getElementById("result-table");
const nbrRoundsMax = 25;
let clickCount = 0;
viewResultText.textContent = `You must click ${nbrRoundsMax - clickCount} times before being able to see the results`;

let imgArray = [
  { name: "bag", filePath: "./img/bag.jpg" },
  { name: "banana", filePath: "./img/banana.jpg" },
  { name: "bathroom", filePath: "./img/bathroom.jpg" },
  { name: "boots", filePath: "./img/boots.jpg" },
  { name: "breakfast", filePath: "./img/breakfast.jpg" },
  { name: "bubblegum", filePath: "./img/bubblegum.jpg" },
  { name: "chair", filePath: "./img/chair.jpg" },
  { name: "cthulhu", filePath: "./img/cthulhu.jpg" },
  { name: "dog-duck", filePath: "./img/dog-duck.jpg" },
  { name: "dragon", filePath: "./img/dragon.jpg" },
  { name: "pen", filePath: "./img/pen.jpg" },
  { name: "pet-sweep", filePath: "./img/pet-sweep.jpg" },
  { name: "scissors", filePath: "./img/scissors.jpg" },
  { name: "shark", filePath: "./img/shark.jpg" },
  { name: "sweep", filePath: "./img/sweep.jpg" },
  { name: "tauntaun", filePath: "./img/tauntaun.jpg" },
  { name: "unicorn", filePath: "./img/unicorn.jpg" },
  { name: "water-can", filePath: "./img/water-can.jpg" },
  { name: "wine-glass", filePath: "./img/wine-glass.jpg" },
];
let productArray = [];

for (let i = 0; i < imgArray.length; i++) {
  const tempProduct = new Product(imgArray[i].name, imgArray[i].filePath);
  productArray.push(tempProduct);
}

function Product(name, filePath) {
  this.name = name;
  this.filePath = filePath;
  this.view = 0;
  this.click = 0;
}
Product.prototype.render = function () {
  let line = document.createElement("tr");
  let tableData = document.createElement("td");
  tableData.setAttribute("class", "tableheader");
  tableData.textContent = this.name;
  line.appendChild(tableData);
  tableData = document.createElement("td");
  tableData.textContent = this.view;
  line.appendChild(tableData);
  tableData = document.createElement("td");
  tableData.textContent = this.click;
  line.appendChild(tableData);
  tableData = document.createElement("td");
  if (this.view === 0) {
    tableData.textContent = 0;
  } else {
    tableData.textContent = Math.floor((this.click / this.view) * 100);
  }
  line.appendChild(tableData);
  table.appendChild(line);
};
function getRandomNumber() {
  return Math.floor(Math.random() * imgArray.length);
}
function renderImg() {
  let img1 = getRandomNumber();
  let img2 = getRandomNumber();
  let img3 = getRandomNumber();

  while (img2 === img1) {
    img2 = getRandomNumber();
  }
  while (img3 === img2 || img3 === img1) {
    img3 = getRandomNumber();
  }
  image1.src = productArray[img1].filePath;
  image1.alt = productArray[img1].name;
  productArray[img1].view += 1;
  image2.src = productArray[img2].filePath;
  image2.alt = productArray[img2].name;
  productArray[img2].view += 1;
  image3.src = productArray[img3].filePath;
  image3.alt = productArray[img3].name;
  productArray[img3].view += 1;
}
function renderResults() {
  let line = document.createElement("tr");
  line.setAttribute("class", "tableheader");
  let tableHeader = document.createElement("th");
  tableHeader.textContent = "Product";
  line.appendChild(tableHeader);
  tableHeader = document.createElement("th");
  tableHeader.textContent = "Nbr View";
  line.appendChild(tableHeader);
  tableHeader = document.createElement("th");
  tableHeader.textContent = "Nbr Click";
  line.appendChild(tableHeader);
  tableHeader = document.createElement("th");
  tableHeader.textContent = "%";
  line.appendChild(tableHeader);

  table.appendChild(line);

  for (let i = 0; i < productArray.length; i++) {
    productArray[i].render();
  }
}

function handleImgClick(event) {
  let imgClick = event.target.alt;

  for (let i = 0; i < productArray.length; i++) {
    if (imgClick === productArray[i].name) {
      productArray[i].click += 1;
      clickCount += 1;
    }
  }
  if (clickCount === nbrRoundsMax) {
    image1.removeEventListener("click", handleImgClick);
    image2.removeEventListener("click", handleImgClick);
    image3.removeEventListener("click", handleImgClick);
    viewResultText.textContent = `Click on the button below to see the results !`;
    resultButton.style.visibility = "visible";
    resultButton.addEventListener("click", handleButtonClick);
  } else {
    viewResultText.textContent = `You must click ${nbrRoundsMax - clickCount} times before being able to see the results`;
    renderImg();
  }
}
function handleButtonClick(event) {
  renderResults();
  resultButton.removeEventListener("click", handleButtonClick);
}

renderImg();

image1.addEventListener("click", handleImgClick);
image2.addEventListener("click", handleImgClick);
image3.addEventListener("click", handleImgClick);
