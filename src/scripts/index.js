import { register } from 'swiper/element/bundle';
import { togglePopup } from '@common';
import { initPriceChange, initSearchChange, initFormSubmit } from '@filters';

register();

initPriceChange();

initSearchChange();

initFormSubmit();

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
