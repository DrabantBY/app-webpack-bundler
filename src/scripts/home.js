import { register } from 'swiper/element/bundle';
import { initModal } from '@common';
import { SearchForm } from '@forms';

register();

new SearchForm('search');

initModal('navMenu', 'navMenuOpen', 'navMenuHide');
