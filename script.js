const ol = document.querySelector('ol');

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
  // if (li) {
  let total = 0;
  for (let index = 0; index < li.length; index += 1) {
    const numero = li[index].innerText.split('$')[1];
    const valorUnitario = parseFloat(numero);
    total += valorUnitario;
  }
  const getsubTotal = document.querySelector('.total-price');
  getsubTotal.innerText = total;
  // }
};

const cartItemClickListener = (e) => {
  e.target.remove();
  saveCartItems();
  sumSubTotal();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const addCarrinho = async (e) => {
  const valorId = e.target.previousSibling.previousSibling.previousSibling;
  const valorCorreto = valorId.innerText;
  const localCarrinho = document.querySelector('.cart__items');
  const item = await fetchItem(valorCorreto);
  localCarrinho.appendChild(createCartItemElement(item));
  saveCartItems();
  sumSubTotal();
};

const keepRemove = () => {
  const li = document.querySelectorAll('li');
  for (let index = 0; index < li.length; index += 1) {
    li[index].addEventListener('click', cartItemClickListener);
    // li[index].addEventListener('click', subtracao);
  }
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
  const body = document.querySelector('body');
  body.appendChild(div);
};

const aposAPI = () => {
  const loading = document.querySelector('.loading');
  loading.remove();
};

const createProductListing = async () => {
  antesAPI();
  const results = await fetchProducts('computador');
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

// const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const btn = document.querySelector('.empty-cart');
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
