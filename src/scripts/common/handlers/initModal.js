export function initModal(modalId, modalOpenId, modalHideId) {
  const openModal = document.getElementById(modalOpenId);
  const hideModal = document.getElementById(modalHideId);
  const modal = document.getElementById(modalId);

  openModal.addEventListener('click', () => {
    modal.showModal();
  });

  hideModal.addEventListener('click', () => {
    modal.close();
  });
}
