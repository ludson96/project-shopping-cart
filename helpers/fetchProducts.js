const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';

const fetchProducts = async () => {
  // seu código aqui

  const response = await fetch(url);
  const data = await response.json();
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
