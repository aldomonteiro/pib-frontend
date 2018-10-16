import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';


class DashBoard extends Component {
    componentDidMount() {
        const { push } = this.props;
        if (!localStorage.getItem("activePage")) {
            push("/pages");
        }
    }

    render() {
        return (
            <Card>
                <CardHeader title="Welcome to the administration" />
                <CardContent>Lorem ipsum sic dolor amet...</CardContent>
            </Card>
        );
    }
}

DashBoard.propTypes = {
    push: PropTypes.func,
};

export default connect(null, {
    push,
})(DashBoard);