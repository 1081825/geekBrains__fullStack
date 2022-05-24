'use strict';

const counter = document.querySelector('.cartIconWrap span');
const basketTotal = document.querySelector('.basketTotalValue');
const basketTotalEl = document.querySelector('.basketTotal');
const basketToggle = document.querySelector('.basket');

document.querySelector('.cartIconWrap').addEventListener('click', () => {
    basketToggle.classList.toggle('hidden');
});

const basket = {};

document.querySelector('.featuredItems').addEventListener('click', event => {
    if(!event.target.closest('.addToCart')) {
        return;
    }
    const featuredItem = event.target.closest('.featuredItem');
    const id = +featuredItem.dataset.id;
    const name = featuredItem.dataset.name;
    const price = +featuredItem.dataset.price;
    addToCart(id, name, price);
});

function addToCart(id, name, price) {
    if(!(id in basket)) {
        basket[id] = {id, name, price, count: 0 };
    }
    basket[id].count++;
    counter.textContent = totalCount().toString();
    basketTotal.textContent = totalPrice().toFixed(2);
    renderProductInBasket(id);
};

function totalCount() {
    return Object.values(basket)
    .reduce((acc, product) => acc + product.count, 0);
}

function totalPrice() {
    return Object.values(basket)
    .reduce((acc, product) => acc + product.count * product.price, 0);
}

function renderProductInBasket(id) {
    const basketRowElement = basketToggle.querySelector(`.basketRow[data-id='${id}']`);
    if(!basketRowElement) {
        renderNewProductInBasket(id);
        return;
    }
    basketRowElement.querySelector('.productCount').textContent = basket[id].count;
    basketRowElement.querySelector('.productTotalRow').textContent = basket[id].count * basket[id].price;
}

function renderNewProductInBasket(productId) {
    const productRow = `
      <div class="basketRow" data-id="${productId}">
        <div>${basket[productId].name}</div>
        <div>
          <span class="productCount">${basket[productId].count}</span> шт.
        </div>
        <div>$${basket[productId].price}</div>
        <div>
          $<span class="productTotalRow">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
        </div>
      </div>
      `;
    basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
  }
