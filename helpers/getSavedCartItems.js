const getSavedCartItems = () => {
  const load = localStorage.getItem('cartItems');
  const ol = document.querySelector('ol');
  if (load) {
    ol.innerHTML = load;
  }
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}

window.onload = () => getSavedCartItems();