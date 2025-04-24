import { register } from 'swiper/element/bundle';
import { initModal } from '@common';
import { SearchForm } from '@filters';

register();

new SearchForm('search');

initModal('navMenu', 'navMenuOpen', 'navMenuHide');
