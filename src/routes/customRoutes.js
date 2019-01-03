import React from 'react';
import { Route } from 'react-router-dom';
import PageList from "../components/facebook/PageList";
import OrdersMap from '../components/maps/OrdersMap';

export default [
    <Route exact path="/pagelist" component={PageList} noLayout />,
    <Route exact path="/ordersmap" component={OrdersMap} />,
];