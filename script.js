const ol = document.querySelector('ol');
const btn = document.querySelector('.empty-cart');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const sumSubTotal = () => {
  const li = document.querySelectorAll('li');
  let total = 0;
  li.forEach((e) => { total += parseFloat(e.innerText.split('$')[1]); });
  const getsubTotal = document.querySelector('.total-price');
  getsubTotal.innerHTML = `${total}`;
};

const cartItemClickListener = ({ target }) => {
  target.remove();
  saveCartItems(ol.innerHTML);
  sumSubTotal();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const addCarrinho = async ({ target }) => {
  const localCarrinho = document.querySelector('.cart__items');
  const element = target.parentNode;
  const data = await fetchItem(getSkuFromProductItem(element));
  const { id, title, price, thumbnail } = data;
  const infoCarrinho = { sku: id, name: title, salePrice: price, image: thumbnail };
  localCarrinho.appendChild(createCartItemElement(infoCarrinho));
  saveCartItems(ol.innerHTML);
  sumSubTotal();
};

const keepRemove = () => {
  const li = document.querySelectorAll('li');
  li.forEach((e) => e.addEventListener('click', cartItemClickListener));
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const btnAdd = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  btnAdd.addEventListener('click', addCarrinho);
  section.appendChild(btnAdd);
  return section;
};

const antesAPI = () => {
  const div = document.createElement('div');
  div.className = 'loading';
  div.innerHTML = 'carregando...';
  const container = document.querySelector('.container');
  container.appendChild(div);
};

const aposAPI = () => document.querySelector('.loading').remove();

const createProductListing = async () => {
  antesAPI();
  const { results } = await fetchProducts('computador');
  results.forEach(({ id, title, thumbnail }) => {
    const item = {
      sku: id,
      name: title,
      image: thumbnail,
    };
    const listItems = document.querySelector('.items');
    listItems.appendChild(createProductItemElement(item));
  });
  aposAPI();
};

const clearCart = () => {
  const getLI = document.querySelectorAll('li');
  getLI.forEach((e) => e.remove());
  sumSubTotal();
};

btn.addEventListener('click', clearCart);

window.onload = () => {
  createProductListing();
  ol.innerHTML = getSavedCartItems();
  keepRemove();
  sumSubTotal();
};
