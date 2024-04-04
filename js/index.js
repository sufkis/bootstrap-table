const tableBody = document.getElementById('table-body');
const avgTitle = document.querySelector('#average');
const bestTitle = document.querySelector('#best');
const storeList = [
  {
    name: 'City Deal',
    address: 'Jabotinsky 96',
    city: 'Petah Tikva',
    link: 'https://www.citydeal.co.il/',
  },
  {
    name: 'Buy Smart',
    address: 'Heruteynu 2',
    city: 'Tel Aviv',
    link: 'https://www.buy-smart.co.il/',
  },
  {
    name: 'Best Cell',
    address: 'David Saharov 5',
    city: 'Rishon LeZiyon',
    link: 'https://www.bestcell.co.il/',
  },
  {
    name: 'Digital Electric',
    address: 'Saharov 17',
    city: 'Rishon LeZiyon',
    link: 'https://www.digital-electric.co.il/',
  },
  {
    name: 'Daily Sale',
    address: 'HaMashor 13',
    city: 'Tveriya',
    link: 'https://www.dailysale.co.il/',
  },
  {
    name: 'Anak HaHashmal',
    address: 'Yosef Lishinsky',
    city: 'Rishon LeZiyon',
    link: 'https://www.anakelectric.co.il/',
  },
  {
    name: 'Virtual Chashmal',
    address: 'Reuven Aharonovitch 12',
    city: 'Bnei Brak',
    link: 'https://www.virtualchashmal.co.il/',
  },
  {
    name: 'Super Electric',
    address: 'HaTzomet 5',
    city: 'Kfar Saba',
    link: 'https://www.superelectric.co.il/',
  },
  {
    name: 'Shuk Hashmal',
    address: 'HaOmanut 5',
    city: 'Netanya',
    link: 'https://shukhashmal.co.il/',
  },
  {
    name: 'Dragon Electric',
    address: 'HaSadot 8',
    city: 'Abu Gosh',
    link: 'https://www.dragon-electric.co.il/',
  },
];

let displayedList = storeList;

const populateTable = () => {
  clearTable();
  displayedList.forEach((item, index) => {
    item.id = index + 1;
    if (!item.price) {
      item.price = getRandomNumber(3000, 3500);
    }
    if (!item.rating) {
      item.rating = getRandomNumber(1, 5);
    }
    const row = createTableRow(item);
    tableBody.appendChild(row);
  });
  if (avgTitle.textContent) {
    handleOnAverage();
  }
  if (bestTitle.textContent) {
    handleOnBest();
  }
};

const createTableRow = (row) => {
  const tableRow = document.createElement('tr');
  const rowNumber = document.createElement('th');
  rowNumber.setAttribute('scope', 'row');
  rowNumber.textContent = row.id;
  tableRow.appendChild(rowNumber);
  const iconCell = document.createElement('td');
  const iconImg = `<a href="${row.link}" target="_blank">
    <img src="./images/television-classic.svg" alt="television" class="image">
  </a>`;
  iconCell.innerHTML = iconImg;
  tableRow.appendChild(iconCell);
  const nameCell = document.createElement('td');
  nameCell.textContent = row.name;
  tableRow.appendChild(nameCell);
  const addressCell = document.createElement('td');
  addressCell.textContent = row.address;
  tableRow.appendChild(addressCell);
  const cityCell = document.createElement('td');
  cityCell.textContent = row.city;
  tableRow.appendChild(cityCell);
  const priceCell = document.createElement('td');
  priceCell.textContent = row.price;
  tableRow.appendChild(priceCell);
  const linkCell = document.createElement('td');
  linkCell.textContent = row.link;
  tableRow.appendChild(linkCell);
  const ratingCell = document.createElement('td');
  if (row.rating < 2) {
    tableRow.classList.add('table-danger');
  }
  if (row.rating >= 4) {
    tableRow.classList.add('table-success');
  }
  ratingCell.textContent = `${row.rating}/5`;
  tableRow.appendChild(ratingCell);
  const optionsCell = document.createElement('td');
  const deleteButton = document.createElement('button');
  deleteButton.setAttribute('type', 'button');
  deleteButton.classList.add('btn', 'btn-danger');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => handleOnDelete(row.name));
  const buyButton = document.createElement('button');
  buyButton.setAttribute('type', 'button');
  buyButton.classList.add('btn', 'btn-primary');
  buyButton.textContent = 'Buy';
  buyButton.addEventListener('click', () => handleOnBuy(row.name, row.price));
  optionsCell.appendChild(deleteButton);
  optionsCell.appendChild(buyButton);
  tableRow.appendChild(optionsCell);
  return tableRow;
};

const handleOnDelete = (name) => {
  displayedList = displayedList.filter((item) => item.name !== name);
  populateTable();
};

const handleOnBuy = (name, price) => {
  window.open(`/purchase.html?name=${name}&price=${price}`, 'newwindow');
};

const handleOnAverage = () => {
  if (!displayedList.length) {
    return (avgTitle.textContent = '');
  }
  const average =
    displayedList.map((a) => +a.price).reduce((a, b) => a + b) /
    displayedList.length;
  avgTitle.textContent = parseFloat(average).toFixed(2);
  return average;
};

const handleOnBest = () => {
  const bestPrices = displayedList
    .filter((row) => row.rating >= 4)
    .map((row) => row.price);
  if (!bestPrices.length) {
    return (bestTitle.textContent = '');
  }
  const bestPrice = Math.min(...bestPrices);
  const bestOffer = displayedList.filter(
    (row) => row.rating >= 4 && bestPrice === row.price
  )[0];
  bestTitle.textContent = `#${bestOffer.id}: ${bestPrice}`;
  return bestOffer.id;
};

const clearTable = () => {
  tableBody.innerHTML = '';
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

populateTable();
