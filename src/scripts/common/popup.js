export function togglePopup(
  popupSelector,
  popupOpenSelector,
  popupCloseSelector
) {
  const overlay = document.getElementById('overlay');

  const popup = document.body.querySelector(popupSelector);
  const openSelector = document.body.querySelector(popupOpenSelector);
  const closeSelector = document.body.querySelector(popupCloseSelector);

  const onClick = () => {
    overlay.classList.toggle('display');
    popup.classList.toggle('display');
  };

  openSelector.addEventListener('click', onClick);
  closeSelector.addEventListener('click', onClick);
}
