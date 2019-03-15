import React from 'react';
import { connect } from 'react-redux';
import { Layout, Sidebar } from 'react-admin';
import AppBar from './AppBar';
import { darkTheme, lightTheme } from './themes';
import Notifications from "../components/Notifications";

const CustomSidebar = props => <Sidebar size={200} {...props} />;
const CustomLayout = props => (
    <React.Fragment>
        <Layout appBar={AppBar} sidebar={CustomSidebar} {...props} />
        <Notifications />
    </React.Fragment>
);

export default connect(
    state => ({
        theme: state.theme === 'dark' ? darkTheme : lightTheme,
    }),
    {}
)(CustomLayout);
