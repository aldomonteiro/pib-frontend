import React, { Component, Fragment } from 'react';
import isEmpty from 'lodash.isempty';

// components:
import Marker from './components/Marker';
import CustomMarker from './components/CustomMarker';
// examples:
import GoogleMap from './components/GoogleMap';

// consts
import MAP_CENTER from './const/map_center';

import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { getDefaultValues } from 'ra-core';

import LoadingPage from "../LoadingPage";
import dataProviderFactory from '../../dataProvider';
import { GET_LIST, GET_MANY, translate } from 'react-admin';
import { Title } from 'react-admin';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

// Return map bounds based on list of places
const getMapBounds = (map, maps, orders) => {
  const bounds = new maps.LatLngBounds();

  orders.forEach((order) => {
    bounds.extend(new maps.LatLng(
      order.location_lat,
      order.location_long,
    ));
  });
  return bounds;
};

// Re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
  maps.event.addDomListenerOnce(map, 'idle', () => {
    maps.event.addDomListener(window, 'resize', () => {
      map.fitBounds(bounds);
    });
  });
};

// Fit map to its bounds after the api is loaded
const apiIsLoaded = (map, maps, orders) => {
  // Get bounds by our places
  const bounds = getMapBounds(map, maps, orders);
  // Fit map to bounds
  map.fitBounds(bounds);
  // Bind the resize listener
  bindResizeListener(map, maps, bounds);
};

const styles = theme => ({
  main: {
    height: '80vh',
    width: '100vh',
    minWidth: '400px',
    margin: 'auto',
    background: '#f4f4f4',
    padding: '20px',
  },
  divloader: {
    height: '400px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
});


class OrdersMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orders: [],
      customers: [],
      stores: [],
      loading: true,
    };
  }

  componentDidMount() {
    dataProviderFactory(GET_LIST, 'orders', {
      // filter: { date_gte: aMonthAgo.toISOString() },
      sort: { field: 'createdAt', order: 'DESC' },
      pagination: { page: 1, perPage: 10 },
    })
      .then(response => { return response.data.filter(order => order.status === 1 && order.location_lat && order.location_long) })
      .then(orders => {
        this.setState({ orders: orders });
        return orders;
      })
      .then(orders =>
        orders.map(order => order.customerId)
      )
      .then(customerIds =>
        dataProviderFactory(GET_MANY, 'customers', {
          ids: customerIds,
        })
      )
      .then(response => response.data)
      .then(customers =>
        customers.reduce((prev, customer) => {
          prev[customer.id] = customer; // eslint-disable-line no-param-reassign
          return prev;
        }, {})
      )
      .then(customers => {
        this.setState({ customers: customers });

        dataProviderFactory(GET_LIST, 'stores', {
          // filter: { date_gte: aMonthAgo.toISOString() },
          sort: { field: 'createdAt', order: 'DESC' },
          pagination: { page: 1, perPage: 10 },
        })
          .then(response => response.data)
          .then(stores => this.setState({ stores: stores, loading: false }))
      });

  }

  render() {
    const { classes, translate } = this.props;
    const { orders, customers, stores } = this.state;
    const map_center = (stores && stores.length) ? [stores[0].location_lat, stores[0].location_long] : MAP_CENTER;
    return (
      this.state.loading ? <LoadingPage className={classes.divloader} /> :
        <Card>
          <Title title={translate('pos.ordersmap.title')} />
          <CardContent>
            <Fragment>
              <div className={classes.main}>
                {!isEmpty(orders) && (
                  <GoogleMap
                    defaultZoom={10}
                    defaultCenter={map_center}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, orders)}
                  >
                    <Marker
                      key="0"
                      text="Pizzaibot"
                      lat={-24.2854477}
                      lng={-53.835781}
                    />

                    {orders.map(order =>
                      Object.values(customers).map(cust =>
                        cust.id === order.customerId ?
                          (<CustomMarker
                            key={order.id}
                            id={order.id}
                            header={cust.first_name + ' ' + cust.last_name}
                            body={order.address}
                            lat={order.location_lat}
                            lng={order.location_long}
                          />) : null)
                    )}
                  </GoogleMap>
                )}
              </div>
            </Fragment>
          </CardContent>
        </Card>
    );
  }
}


OrdersMap.propTypes = {
  classes: PropTypes.object.isRequired,
  translate: PropTypes.func,
}

const enhance = compose(
  translate,
  connect((state, props) => ({
    initialValues: getDefaultValues(state, props),
    isLoading: state.admin.loading > 0,
  })),
  withStyles(styles)
);

export default enhance(OrdersMap);
