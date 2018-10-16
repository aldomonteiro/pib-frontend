import React from 'react';
import { Route } from 'react-router-dom';
import PageList from "../components/facebook/PageList";

export default [
    <Route exact path="/pages" component={PageList} noLayout />,
];