import React from "react";
import { Admin, Resource, fetchUtils, resolveBrowserLocale } from "react-admin";
import { FlavorList, FlavorEdit, FlavorCreate } from "./components/database/flavors";
import { ToppingList, ToppingEdit, ToppingCreate } from "./components/database/toppings";
import { PricingList, PricingEdit, PricingCreate } from "./components/database/pricings";
import { BeverageList, BeverageEdit, BeverageCreate } from "./components/database/beverages";
import { SizeList, SizeEdit, SizeCreate } from "./components/database/sizes";
import { StoreList, StoreEdit, StoreCreate } from "./components/database/stores";
import { PageResourceList, PageResourceEdit } from "./components/database/pages";
import PageList from './components/facebook/PageList';
// import { UserList } from "./components/users";
import FlavorIcon from "@material-ui/icons/LocalPizza";
import ToppingIcon from "@material-ui/icons/Layers";
import PricingIcon from "@material-ui/icons/MonetizationOn";
import PagesIcon from "@material-ui/icons/Book";
import BeverageIcon from "@material-ui/icons/LocalDrink";
import SizeIcon from "@material-ui/icons/Tonality";
import StoreIcon from "@material-ui/icons/Store";

import englishMessages from './i18n/en';
import portugueseMessages from './i18n/pt';

import authProvider from "./authProvider";
import CustomLogin from "./components/facebook/CustomLogin";
import Dashboard from './dashboard';
import customRoutes from './routes/customRoutes';
import pagesReducer from './reducers/pages';
import simpleRestProvider from 'ra-data-simple-rest';

// Addim Custom Header
// https://marmelab.com/react-admin/DataProviders.html#adding-custom-headers
const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('token');
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
}

const dataProvider = simpleRestProvider(process.env.REACT_APP_API_URL, httpClient);

const messages = {
  pt: portugueseMessages,
  en: englishMessages,
}
const i18nProvider = locale => messages[locale];

const App = () => (
  <Admin
    customReducers={{ pagesReducer }}
    dashboard={Dashboard}
    loginPage={CustomLogin}
    authProvider={authProvider}
    dataProvider={dataProvider}
    customRoutes={customRoutes}
    locale={resolveBrowserLocale()}
    i18nProvider={i18nProvider}
  >
    {permissions => [
      <Resource
        name="stores"
        list={StoreList}
        edit={StoreEdit}
        create={StoreCreate}
        icon={StoreIcon}
      />,
      <Resource
        name="flavors"
        list={FlavorList}
        edit={FlavorEdit}
        create={FlavorCreate}
        icon={FlavorIcon}
      />,
      <Resource
        name="pricings"
        list={PricingList}
        edit={PricingEdit}
        create={PricingCreate}
        icon={PricingIcon}
      />,
      <Resource
        name="beverages"
        list={BeverageList}
        edit={BeverageEdit}
        create={BeverageCreate}
        icon={BeverageIcon}
      />,
      <Resource
        name="sizes"
        list={SizeList}
        edit={SizeEdit}
        create={SizeCreate}
        icon={SizeIcon}
      />,
      <Resource
        name="pages"
        list={PageResourceList}
        edit={PageResourceEdit}
        icon={PagesIcon}
      />,
      <Resource
        name="pageslist"
        list={PageList}
        icon={PagesIcon}
      />,
      permissions === 'admin'
        ? <Resource
          name="toppings"
          list={ToppingList}
          edit={ToppingEdit}
          create={ToppingCreate}
          icon={ToppingIcon}
        /> : null,
    ]}

    {/* <Resource name="users" list={UserList} icon={UserIcon} /> */}
  </Admin>
);

export default App;
