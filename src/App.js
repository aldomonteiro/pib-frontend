import React from "react";
import { Admin, Resource, fetchUtils, resolveBrowserLocale } from "react-admin";
// import { PageResourceList, PageResourceEdit } from "./components/database/pages";

// import orders from './ordersAside';
import orders from './simpleOrders';
import customers from './customers';
import stores from './stores';
import flavors from './catalog/flavors';
import pricings from './catalog/pricings';
import sizes from './catalog/sizes';
import beverages from './catalog/beverages';
import categories from './catalog/categories';
import toppings from './catalog/toppings';
import bots from './bot';
import reportOrders from './reportOrders';
import reportFlavors from './reports/flavors';

import { Layout, Menu } from './layout';

import englishMessages from './i18n/en';
import portugueseMessages from './i18n/pt';

import authProvider from "./authProvider";
import CustomLogin from "./components/facebook/CustomLogin";
import Dashboard from './dashboard';
import customRoutes from './routes/customRoutes';
// Custom Reducers
import pagesReducer from './reducers/pages';
import locationReducer from './reducers/location';
import ordersReducer from './reducers/ordersReducer';
import printerReducer from './reducers/printer';
import notificationsReducer from './reducers/notifications';
import logsReducer from './reducers/logsReducer';

import simpleRestProvider from 'ra-data-simple-rest';

// I tried to use this ra-realtime component inside this module, createRealTimeSaga,
// but, it is not performatic (I was using a setInterval that calls the dataProvider GET_LIST)
// and, also, it has a bug, open in github for several months:
// https://github.com/marmelab/react-admin/issues/2496 (checked on April-26-19)
// It starts working, querying the dataProvider, but, when I click in an order (the
// same resource used in this saga) it raises the error shown in the issue, and stops
// working.
// import createRealTimeSaga from "./createRealTimeSaga";
import SocketContext from './socketContext'
import io from 'socket.io-client'

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

// This isn't loading the english messages assynchronously. Need to check
// react-admin documentation, because I am loading the englishMessages.
// const asyncMessages = {
//     pt: () => import('./i18n/pt').then(messages => messages.default),
//     en: () => import('./i18n/en').then(messages => messages.default),
// }

const locale = resolveBrowserLocale();

const i18nProvider = locale => {
    if (locale === 'pt') {
        return portugueseMessages;
    } else if (locale === 'en') {
        return englishMessages;
    }
    // return asyncMessages[locale]();
}

const socket = io(process.env.REACT_APP_API_URL, {
    secure: true,
    reconnect: true,
    rejectUnauthorized: false,
    transports: ['polling', 'websocket'],
});

const App = () => (
    <SocketContext.Provider value={socket}>
        <Admin
            customReducers={{
                pagesReducer,
                locationReducer, ordersReducer, printerReducer,
                notificationsReducer, logsReducer
            }}
            dashboard={Dashboard}
            loginPage={CustomLogin}
            authProvider={authProvider}
            dataProvider={dataProvider}
            // customSagas={[createRealTimeSaga(dataProvider)]}
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
                    name="reportOrders" {...reportOrders}
                />,
                <Resource
                    name="reportFlavors" {...reportFlavors}
                />,
                <Resource
                    name="accounts"
                />
            ]}

            {/* <Resource name="users" list={UserList} icon={UserIcon} /> */}
        </Admin>
    </SocketContext.Provider>
);

export default App;
