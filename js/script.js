"use strict";
//dom selectors
let imgContainer = document.querySelector(".image");
let image1 = document.querySelector(".image img:first-child");
let image2 = document.querySelector(".image img:nth-child(2)");
let image3 = document.querySelector(".image img:nth-child(3)");
let viewResultText = document.querySelector(".view-result-text");
let resultView = document.querySelector(".resultat");
let resultButton = document.getElementById("result-button");
resultButton.style.visibility = "hidden";
const table = document.getElementById("result-table");

//variables
const nbrRoundsMax = 25;
let clickCount = 0;
let previousImgRound = [-1, -1, -1];

viewResultText.textContent = `You must click ${nbrRoundsMax - clickCount} times before being able to see the results`;

let imgArray = [
  { name: "bag", filePath: "./img/bag.jpg", view: 0, click: 0 },
  { name: "banana", filePath: "./img/banana.jpg", view: 0, click: 0 },
  { name: "bathroom", filePath: "./img/bathroom.jpg", view: 0, click: 0 },
  { name: "boots", filePath: "./img/boots.jpg", view: 0, click: 0 },
  { name: "breakfast", filePath: "./img/breakfast.jpg", view: 0, click: 0 },
  { name: "bubblegum", filePath: "./img/bubblegum.jpg", view: 0, click: 0 },
  { name: "chair", filePath: "./img/chair.jpg", view: 0, click: 0 },
  { name: "cthulhu", filePath: "./img/cthulhu.jpg", view: 0, click: 0 },
  { name: "dog-duck", filePath: "./img/dog-duck.jpg", view: 0, click: 0 },
  { name: "dragon", filePath: "./img/dragon.jpg", view: 0, click: 0 },
  { name: "pen", filePath: "./img/pen.jpg", view: 0, click: 0 },
  { name: "pet-sweep", filePath: "./img/pet-sweep.jpg", view: 0, click: 0 },
  { name: "scissors", filePath: "./img/scissors.jpg", view: 0, click: 0 },
  { name: "shark", filePath: "./img/shark.jpg", view: 0, click: 0 },
  { name: "sweep", filePath: "./img/sweep.jpg", view: 0, click: 0 },
  { name: "tauntaun", filePath: "./img/tauntaun.jpg", view: 0, click: 0 },
  { name: "unicorn", filePath: "./img/unicorn.jpg", view: 0, click: 0 },
  { name: "water-can", filePath: "./img/water-can.jpg", view: 0, click: 0 },
  { name: "wine-glass", filePath: "./img/wine-glass.jpg", view: 0, click: 0 },
];
let productArray = [];

let setting = {
  data: productArray,
};
//End of variable

//savings data
function loadSettings() {
  let getSettings = localStorage.getItem("settings");
  if (getSettings) {
    console.log(getSettings);
    setting = JSON.parse(getSettings);
    console.log(setting);
    for (let i = 0; i < setting.data.length; i++) {
      const tempProduct = new Product(setting.data[i].name, setting.data[i].filePath, setting.data[i].view, setting.data[i].click);
      productArray.push(tempProduct);
    }
  }
}
function saveSettings() {
  let stringify = JSON.stringify(setting);
  localStorage.setItem("settings", stringify);
  console.log(stringify);
}
function pageLoad() {
  let savedSettings = localStorage.getItem("settings");
  if (!savedSettings) {
    for (let i = 0; i < imgArray.length; i++) {
      const tempProduct = new Product(imgArray[i].name, imgArray[i].filePath, imgArray[i].view, imgArray[i].click);
      productArray.push(tempProduct);
    }
    return;
  }
  loadSettings();
  console.log("previous data load successfuly");
}

function Product(name, filePath, view, click) {
  this.name = name;
  this.filePath = filePath;
  this.view = view;
  this.click = click;
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

  while (
    img1 === img2 ||
    img1 === img3 ||
    img2 === img3 ||
    previousImgRound.includes(img1) ||
    previousImgRound.includes(img2) ||
    previousImgRound.includes(img3)
  ) {
    img1 = getRandomNumber();
    img2 = getRandomNumber();
    img3 = getRandomNumber();
  }

  previousImgRound = [img1, img2, img3];
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

  const chart = document.getElementById("myChart");

  const nameArray = [];
  const clickArray = [];
  const viewArray = [];

  for (let i = 0; i < productArray.length; i++) {
    nameArray[i] = productArray[i].name;
    clickArray[i] = productArray[i].click;
    viewArray[i] = productArray[i].view;
  }

  new Chart(chart, {
    type: "bar",
    data: {
      labels: nameArray,
      datasets: [
        {
          label: "Nbre of View",
          data: viewArray,
          borderWidth: 1,
        },
        {
          label: "Nbre of click",
          data: clickArray,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function handleImgClick(event) {
  let imgClick = event.target.alt;

  for (let i = 0; i < productArray.length; i++) {
    if (imgClick === productArray[i].name) {
      productArray[i].click += 1;
      clickCount += 1;
      saveSettings();
      console.log("settings save successfully");
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

pageLoad();
renderImg();

image1.addEventListener("click", handleImgClick);
image2.addEventListener("click", handleImgClick);
image3.addEventListener("click", handleImgClick);
