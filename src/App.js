import React from "react";
import { Admin, Resource, fetchUtils, resolveBrowserLocale } from "react-admin";
// import { PageResourceList, PageResourceEdit } from "./components/database/pages";

import orders from './ordersAside';
import customers from './customers';
import stores from './stores';
import flavors from './catalog/flavors';
import pricings from './catalog/pricings';
import sizes from './catalog/sizes';
import beverages from './catalog/beverages';
import categories from './catalog/categories';
import toppings from './catalog/toppings';
import bots from './bot';

import { Layout, Menu } from './layout';

// import englishMessages from './i18n/en';
import portugueseMessages from './i18n/pt';

import authProvider from "./authProvider";
import CustomLogin from "./components/facebook/CustomLogin";
import Dashboard from './dashboard';
import customRoutes from './routes/customRoutes';
// Custom Reducers
import pagesReducer from './reducers/pages';
import locationReducer from './reducers/location';
import ordersReducer from './reducers/order';
import printerReducer from './reducers/printer';

import simpleRestProvider from 'ra-data-simple-rest';
// import OrderShow from "./components/database/ordersAside/OrderShow";
// import myTheme from "./Theme";

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

const asyncMessages = {
    pt: () => import('./i18n/pt').then(messages => messages.default),
    en: () => import('./i18n/en').then(messages => messages.default),
}

const locale = resolveBrowserLocale();

const i18nProvider = locale => {
    if (locale === 'pt') {
        return portugueseMessages;
    }
    return asyncMessages[locale]();
}

const App = () => (
    <Admin
        customReducers={{ pagesReducer, locationReducer, ordersReducer, printerReducer }}
        dashboard={Dashboard}
        loginPage={CustomLogin}
        authProvider={authProvider}
        dataProvider={dataProvider}
        customRoutes={customRoutes}
        appLayout={Layout}
        menu={Menu}
        locale={locale}
        i18nProvider={i18nProvider}
    >
        {permissions => [
            <Resource
                name="orders" {...orders}
            />,
            <Resource
                name="customers" {...customers}
            />,
            <Resource
                name="stores" {...stores}
            />,
            <Resource
                name="flavors" {...flavors}
            />,
            <Resource
                name="pricings" {...pricings}
            />,
            <Resource
                name="categories" {...categories}
            />,
            <Resource
                name="beverages" {...beverages}
            />,
            <Resource
                name="sizes" {...sizes}
            />,
            <Resource
                name="toppings" {...toppings}
            />,
            <Resource
                name="pages" {...bots}
            />,
            <Resource
                name="accounts"
            />,
        ]}

        {/* <Resource name="users" list={UserList} icon={UserIcon} /> */}
    </Admin>
);

export default App;
