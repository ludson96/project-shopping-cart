const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';

const fetchProducts = async () => {
  const response = await fetch(url);
  const data = await response.json();
  const { results } = data;
  return results;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
