const saveCartItems = () => {
  const ol = document.querySelector('ol');
  localStorage.setItem('cartItems', ol.innerHTML);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}