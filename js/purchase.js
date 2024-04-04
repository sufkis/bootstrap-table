const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const storeName = urlParams.get('name');
const price = urlParams.get('price');
const storeNameInput = document.querySelector('#storeName');
const priceInput = document.querySelector('#price');
storeNameInput.setAttribute('value', storeName);
priceInput.setAttribute('value', `${price} ₪`);
