import { togglePopup } from '@common';
import { SearchForm } from '@filters';

new SearchForm('search');

togglePopup(
  'nav[class*="menu-nav"]',
  'button[class*="menu-open"]',
  'button[class*="menu-close"]'
);
