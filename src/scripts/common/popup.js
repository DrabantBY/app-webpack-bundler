export default function togglePopup(element) {
  const openPopup = document.getElementById(`${element}-open`);
  const popup = document.getElementById(`${element}-popup`);
  const closePopup = document.getElementById(`${element}-close`);
  const overlay = document.getElementById('overlay');

  const onClick = () => {
    popup.classList.toggle('visible');
    overlay.classList.toggle('visible');
    document.body.classList.toggle('static');
  };

  openPopup.addEventListener('click', onClick);
  closePopup.addEventListener('click', onClick);
}
