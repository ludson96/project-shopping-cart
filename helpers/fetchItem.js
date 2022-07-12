const fetchItem = async (idRefencia) => {
const url = `https://api.mercadolibre.com/items/${idRefencia}`;
const response = await fetch(url);
const data = await response.json();
const { id, title, price, thumbnail } = data;
const infoCarrinho = {
  sku: id, 
  name: title, 
  salePrice: price,
  image: thumbnail, 
};
console.log(infoCarrinho);
return infoCarrinho;
};



if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
