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
    overlay.hidden = !overlay.hidden;
    popup.classList.toggle('display');
    document.body.classList.toggle('disabled');
  };

  openSelector.addEventListener('click', onClick);
  closeSelector.addEventListener('click', onClick);
}
