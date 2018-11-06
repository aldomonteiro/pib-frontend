import React, { Component, Fragment } from 'react';
import { GET_LIST, GET_MANY, Responsive, Title } from 'react-admin';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';


import Welcome from './Welcome';
import Cardapio from './Cardapio';
import dataProviderFactory from '../dataProvider';

const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '1em' },
    rightCol: { flex: 1, marginLeft: '1em' },
    singleCol: { marginTop: '2em', marginBottom: '2em' },
};

class DashBoard extends Component {
    state = {};

    componentDidMount() {
        const { push } = this.props;
        if (!localStorage.getItem("activePage")) {
            push("/pagelist");
        } else {
            dataProviderFactory(GET_LIST, 'flavors', {
                sort: { field: 'flavor', order: 'DESC' },
                pagination: { page: 1, perPage: 100 },
            }).then(response => response.data)
                .then(flavors => this.setState({ flavors: flavors }));

            dataProviderFactory(GET_LIST, 'toppings', {
                sort: { field: 'topping', order: 'DESC' },
                pagination: { page: 1, perPage: 100 },
            })
                .then(response => response.data)
                .then(toppings => this.setState({ toppings: toppings }));
        }

    }


    render() {
        const { flavors, toppings } = this.state;
        return (
            <Fragment>
                <Title title="PizzAIbot admin" />
                <div style={styles.flex}>
                    <div style={styles.leftCol}>
                        <div style={styles.singleCol}>
                            <Welcome />
                        </div>
                    </div>
                    <div style={styles.rightCol}>
                        <div style={styles.flex}>
                            <Cardapio
                                fl={flavors}
                                top={toppings}
                            />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

DashBoard.propTypes = {
    push: PropTypes.func,
};

export default connect(null, {
    push,
})(DashBoard);