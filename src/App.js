import React from "react";
import { Admin, Resource, fetchUtils } from "react-admin";
import { FlavorList, FlavorEdit, FlavorCreate } from "./components/database/flavors";
import { ToppingList, ToppingEdit, ToppingCreate } from "./components/database/toppings";
import { PricingList, PricingEdit, PricingCreate } from "./components/database/pricings";
import { BeverageList, BeverageEdit, BeverageCreate } from "./components/database/beverages";
import { StoreList, StoreEdit, StoreCreate } from "./components/database/stores";
import PageList from './components/facebook/PageList';
// import { UserList } from "./components/users";
import FlavorIcon from "@material-ui/icons/Book";
import ToppingIcon from "@material-ui/icons/Layers";
import PricingIcon from "@material-ui/icons/MonetizationOn";
import PagesIcon from "@material-ui/icons/Book";
import BeverageIcon from "@material-ui/icons/LocalDrink";
import StoreIcon from "@material-ui/icons/Store";

import englishMessages from './i18n/en';

// import UserIcon from "@material-ui/icons/Group";
import authProvider from "./authProvider";
import CustomLogin from "./components/facebook/CustomLogin";
import Dashboard from './Dashboard';
import customRoutes from './routes/customRoutes';
import pagesReducer from './reducers/pages';
// import dataProvider from './dataProvider';
// import jsonServerProvider from "ra-data-json-server";
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

const dataProvider = simpleRestProvider("https://localhost:8080", httpClient);

const i18nProvider = locale => {
  console.log(`i18nProvider locale: ${locale}`);

  if (locale === 'pt') {
    return import('./i18n/pt').then(messages => messages.default);
  }

  // Always fallback on english
  return englishMessages;
};

const App = () => (
  <Admin
    customReducers={{ pagesReducer }}
    dashboard={Dashboard}
    loginPage={CustomLogin}
    authProvider={authProvider}
    dataProvider={dataProvider}
    customRoutes={customRoutes}
    locale="en"
    i18nProvider={i18nProvider}
  >
    <Resource
      name="stores"
      list={StoreList}
      edit={StoreEdit}
      create={StoreCreate}
      icon={StoreIcon}
    />
    <Resource
      name="flavors"
      list={FlavorList}
      edit={FlavorEdit}
      create={FlavorCreate}
      icon={FlavorIcon}
    />
    <Resource
      name="toppings"
      list={ToppingList}
      edit={ToppingEdit}
      create={ToppingCreate}
      icon={ToppingIcon}
    />
    <Resource
      name="pricings"
      list={PricingList}
      edit={PricingEdit}
      create={PricingCreate}
      icon={PricingIcon}
    />
    <Resource
      name="beverages"
      list={BeverageList}
      edit={BeverageEdit}
      create={BeverageCreate}
      icon={BeverageIcon}
    />
    <Resource
      name="pages"
      list={PageList}
      icon={PagesIcon}
    />
    {/* <Resource name="users" list={UserList} icon={UserIcon} /> */}
  </Admin>
);

export default App;
