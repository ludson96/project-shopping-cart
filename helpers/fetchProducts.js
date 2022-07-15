const fetchProducts = async (argumento) => {
  try {
    if (!argumento) throw Error('You must provide an url');
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${argumento}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
