import { register } from 'swiper/element/bundle';
import { togglePopup } from '@scripts/common/popup';

register();

togglePopup(
  '[class*="burger-nav"]',
  '[class*="burger-button"]',
  '[class*="burger-nav-close"]'
);
