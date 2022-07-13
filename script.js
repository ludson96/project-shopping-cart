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

const cartItemClickListener = (e) => { 
  e.target.remove();
  saveCartItems();
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
  localCarrinho.appendChild(createCartItemElement(await fetchItem(valorCorreto)));
  saveCartItems();
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

const createProductListing = async () => {
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
};
createProductListing();

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

window.onload = () => { ol.innerHTML = getSavedCartItems(); };
