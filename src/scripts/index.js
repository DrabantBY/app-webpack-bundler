import { register } from 'swiper/element/bundle';
import { togglePopup } from '@scripts/common/popup';
import { changePrice } from '@scripts/common/price';

register();

changePrice();

togglePopup(
  '[class*="menu-nav"]',
  '[class*="menu-open"]',
  '[class*="menu-close"]'
);

togglePopup(
  '[class*="goods-section__aside"]',
  '[class*="filter-open"]',
  '[class*="__close"]'
);
