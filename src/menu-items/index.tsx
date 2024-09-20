import logistic from './logistic';
import dashboard from './dashboard';
import application from './application';
import forms from './forms';
import elements from './elements';
import samplePage from './sample-page';
import pages from './pages';
import utilities from './utilities';
import support from './support';
import other from './other';
import { NavItemType } from 'types';

// ==============================|| MENU ITEMS ||============================== //

const menuItems: { items: NavItemType[] } = {
  // items: [logistic, dashboard, application, forms, elements, samplePage, pages, utilities, support, other]
  items: [logistic]
};

export default menuItems;
