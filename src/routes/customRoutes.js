import React from 'react';
import { Route } from 'react-router-dom';
import PageList from "../components/facebook/PageList";
import OrdersMap from '../components/maps/OrdersMap';
import OrderList from '../components/database/orders/OrderList';

const getFacebookOauthUrl = () => {
    const rUri = window.location.origin + '/fb';
    const clientId = process.env.REACT_APP_FACEBOOK_APP_ID;
    return `https://www.facebook.com/v3.2/dialog/oauth?client_id=${clientId}&redirect_uri=${rUri}&state='{st=state123abc,ds=123456789}'&scope=public_profile,email,manage_pages,pages_messaging,pages_messaging_subscriptions`;
}

export default [
    <Route exact path="/pagelist" component={PageList} noLayout />,
    <Route exact path="/ordersmap" component={OrdersMap} />,
    <Route exact path="/orderslist" component={OrderList} />,
    <Route exact path='/fb' component={() => { window.location = getFacebookOauthUrl(); return null; }} />
];