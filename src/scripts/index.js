import { register } from 'swiper/element/bundle';
import { togglePopup } from '@common';
import { initPriceRange, initSearchField, initFilterForm } from '@filters';

register();

initSearchField();

initPriceRange();

initFilterForm();

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
