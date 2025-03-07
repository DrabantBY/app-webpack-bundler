export default function toggleSearchHeader() {
  const searchButton = document.getElementById('header-search-control');

  function onSearchButtonClick() {
    const searchInput = document.getElementById('header-search-input');
    const inputType = searchInput.getAttribute('type');
    if (inputType === 'hidden') {
      searchInput.setAttribute('type', 'search');
      this.lastChild.textContent = '';
    } else {
      searchInput.setAttribute('type', 'hidden');
      this.lastChild.textContent = 'search';
    }
  }
  searchButton.addEventListener('click', onSearchButtonClick);
}
