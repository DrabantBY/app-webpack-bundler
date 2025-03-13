export function togglePopup(
  popupSelector,
  popupOpenSelector,
  popupCloseSelector
) {
  var overlay = document.getElementById('overlay');

  var popup = document.querySelector(popupSelector);
  var openSelector = document.querySelector(popupOpenSelector);
  var closeSelector = document.querySelector(popupCloseSelector);

  var onClick = () => {
    overlay.classList.toggle('display');
    popup.classList.toggle('display');
  };

  openSelector.addEventListener('click', onClick);
  closeSelector.addEventListener('click', onClick);
}
