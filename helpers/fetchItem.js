const fetchItem = async (idRefencia) => {
  try {
    if (!idRefencia) throw Error('You must provide an url');
    const url = `https://api.mercadolibre.com/items/${idRefencia}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (erro) {
    return erro;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
