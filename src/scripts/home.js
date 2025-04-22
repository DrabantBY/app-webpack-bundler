import { register } from 'swiper/element/bundle';
import { initPagination, togglePopup } from '@common';
import { SearchForm, FilterForm, SelectForm } from '@filters';

register();

new SearchForm('search');

new FilterForm('filter');

new SelectForm('select');

initPagination('[class$="__pagination"]');

togglePopup(
  'nav[class*="menu-nav"]',
  'button[class*="menu-open"]',
  'button[class*="menu-close"]'
);

togglePopup(
  'aside[class*="goods-section__aside"]',
  'button[class*="filter-open"]',
  'button[class*="__close"]'
);
