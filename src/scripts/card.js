import { initModal, ZoomCard } from '@handlers';
import { register } from 'swiper/element/bundle';

register();
initModal('navMenu', 'navMenuOpen', 'navMenuHide');
new ZoomCard('zoomSlider');
