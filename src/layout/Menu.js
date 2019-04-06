import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withRouter } from 'react-router-dom';
import {
    translate,
    DashboardMenuItem,
    MenuItemLink,
    Responsive,
} from 'react-admin';
import CatalogIcon from "@material-ui/icons/Book";
import ListIcon from "@material-ui/icons/List";
import SettingsIcon from '@material-ui/icons/Settings';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import OrdersIcon from '@material-ui/icons/AttachMoney';

import orders from '../ordersAside';
import reportOrders from '../reportOrders';
import customers from '../customers';
import stores from '../stores';
import flavors from '../catalog/flavors';
import pricings from '../catalog/pricings';
import sizes from '../catalog/sizes';
import toppings from '../catalog/toppings';
import bots from '../bot';
import pages from '../pages';
import reportFlavors from '../reports/flavors';

import SubMenu from './SubMenu';
import categories from '../catalog/categories';

class Menu extends Component {
    state = {
        menuCatalog: false,
        menuOrders: false,
        menuReports: false,
        menuCustomers: false,
        menuAdmin: false,
        menuPizza: false,
    };

    static propTypes = {
        onMenuClick: PropTypes.func,
        logout: PropTypes.object,
    };

    handleToggle = menu => {
        this.setState(state => ({ [menu]: !state[menu] }));
    };

    render () {
        const { onMenuClick, open, logout, translate } = this.props;
        return (
            <div>
                {' '}
                <DashboardMenuItem onClick={onMenuClick} />
                <SubMenu
                    handleToggle={() => this.handleToggle('menuOrders')}
                    isOpen={this.state.menuOrders}
                    sidebarIsOpen={open}
                    name="pos.menu.orders"
                    icon={<OrdersIcon />}
                >
                    <MenuItemLink
                        to={`/orders`}
                        primaryText={translate(`resources.orders.name`, {
                            smart_count: 2,
                        })}
                        leftIcon={<orders.icon />}
                        onClick={onMenuClick}
                    />
                    <MenuItemLink
                        to={`/customers`}
                        primaryText={translate(`resources.customers.name`, {
                            smart_count: 2,
                        })}
                        leftIcon={<customers.icon />}
                        onClick={onMenuClick}
                    />
                </SubMenu>
                <SubMenu
                    handleToggle={() => this.handleToggle('menuCatalog')}
                    isOpen={this.state.menuCatalog}
                    sidebarIsOpen={open}
                    name="pos.menu.catalog"
                    icon={<CatalogIcon />}
                >
                    <MenuItemLink
                        to={`/categories`}
                        primaryText={translate(`resources.categories.name`, {
                            smart_count: 2,
                        })}
                        leftIcon={<categories.icon />}
                        onClick={onMenuClick}
                    />
                    <MenuItemLink
                        to={`/toppings`}
                        primaryText={translate(`resources.toppings.name`, {
                            smart_count: 2,
                        })}
                        leftIcon={<toppings.icon />}
                        onClick={onMenuClick}
                    />
                    <MenuItemLink
                        to={`/flavors`}
                        primaryText={translate(`resources.flavors.name`, {
                            smart_count: 2,
                        })}
                        leftIcon={<flavors.icon />}
                        onClick={onMenuClick}
                    />
                    <MenuItemLink
                        to={`/sizes`}
                        primaryText={translate(`resources.sizes.name`, {
                            smart_count: 2,
                        })}
                        leftIcon={<sizes.icon />}
                        onClick={onMenuClick}
                    />
                    <MenuItemLink
                        to={`/pricings`}
                        primaryText={translate(`resources.pricings.name`, {
                            smart_count: 2,
                        })}
                        leftIcon={<pricings.icon />}
                        onClick={onMenuClick}
                    />
                </SubMenu>
                <SubMenu
                    handleToggle={() => this.handleToggle('menuReports')}
                    isOpen={this.state.menuReports}
                    sidebarIsOpen={open}
                    name="pos.menu.reports"
                    icon={<ListIcon />}
                >
                    <MenuItemLink
                        to={`/reportOrders`}
                        primaryText={translate(`resources.orders.name`, {
                            smart_count: 2,
                        })}
                        leftIcon={<reportOrders.icon />}
                        onClick={onMenuClick}
                    />
                    <MenuItemLink
                        to={`/reportFlavors`}
                        primaryText={translate(`resources.flavors.name`, {
                            smart_count: 2,
                        })}
                        leftIcon={<reportFlavors.icon />}
                        onClick={onMenuClick}
                    />
                </SubMenu>
                <SubMenu
                    handleToggle={() => this.handleToggle('menuAdmin')}
                    isOpen={this.state.menuAdmin}
                    sidebarIsOpen={open}
                    name="pos.menu.admin"
                    icon={<SettingsApplicationsIcon />}
                >
                    <MenuItemLink
                        to={`/stores`}
                        primaryText={translate(`resources.stores.name`, {
                            smart_count: 2,
                        })}
                        leftIcon={<stores.icon />}
                        onClick={onMenuClick}
                    />
                    <MenuItemLink
                        to={`/pages`}
                        primaryText={translate(`resources.pages.name`, {
                            smart_count: 2,
                        })}
                        leftIcon={<bots.icon />}
                        onClick={onMenuClick}
                    />
                    <MenuItemLink
                        to={`/pagelist`}
                        primaryText={translate(`resources.pageslist.name`, {
                            smart_count: 2,
                        })}
                        leftIcon={<pages.icon />}
                        onClick={onMenuClick}
                    />
                    <MenuItemLink
                        to={`/catalog`}
                        primaryText={translate(`pos.dataload.catalog`, {
                            smart_count: 2,
                        })}
                        leftIcon={<pages.icon />}
                        onClick={onMenuClick}
                    />
                </SubMenu>
                <Responsive
                    xsmall={
                        <MenuItemLink
                            to="/configuration"
                            primaryText={translate('pos.configuration.title')}
                            leftIcon={<SettingsIcon />}
                            onClick={onMenuClick}
                        />
                    }
                    medium={null}
                />
                <Responsive
                    small={logout}
                    medium={null} // Pass null to render nothing on larger devices
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    open: state.admin.ui.sidebarOpen,
    theme: state.theme,
    locale: state.i18n.locale,
});

const enhance = compose(
    withRouter,
    connect(
        mapStateToProps,
        {}
    ),
    translate
);

export default enhance(Menu);
