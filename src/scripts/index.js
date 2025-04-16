import { register } from 'swiper/element/bundle';
import { changePage, togglePopup } from '@common';
import { SearchForm, FilterForm, SelectForm } from '@filters';

register();

new SearchForm('search');

new FilterForm('filter');

new SelectForm('select');

changePage();

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
