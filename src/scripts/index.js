import { register } from 'swiper/element/bundle';
import { togglePopup } from '@scripts/common/popup';
import { changePrice } from '@scripts/common/price';

register();

changePrice();

togglePopup(
  '[class*="burger-nav"]',
  '[class*="burger-button"]',
  '[class*="burger-nav-close"]'
);

togglePopup(
  '[class*="goods-section__aside"]',
  '[class*="filter-open"]',
  '[class*="filter-close"]'
);
