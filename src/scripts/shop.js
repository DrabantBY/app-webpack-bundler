import { Pagination, initModal } from '@common';
import { FilterForm, SearchForm, SelectForm } from '@forms';

new SearchForm('search');

new FilterForm('filter');

new FilterForm('filter-modal');

new SelectForm('select');

new Pagination('[class$="__pagination"]');

initModal('navMenu', 'navMenuOpen', 'navMenuHide');
initModal('goodsFilter', 'goodsFilterOpen', 'goodsFilterHide');
