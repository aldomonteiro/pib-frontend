import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { crudCreate, SaveButton } from 'react-admin';

const createWithLocation = (values, lat, long, basePath, redirectTo) =>
    crudCreate('stores', { ...values, location_lat: lat, location_long: long }, basePath, redirectTo);

class CreateWithLocationButton extends Component {
    handleClick = () => {
        const { basePath, handleSubmit, redirect, createWithLocation, geoLocation } = this.props;
        return handleSubmit((values) => {
            createWithLocation(values, geoLocation.lat, geoLocation.long, basePath, redirect);
        });
    };

    render() {
        const { handleSubmitWithRedirect, saveWithLocation, ...props } = this.props;

        return (
            <SaveButton
                handleSubmitWithRedirect={this.handleClick}
                {...props}
            />
        );
    }
}

const mapStateToProps = state => ({
    geoLocation: state.locationReducer,
});

CreateWithLocationButton.propTypes = {
    geoLocation: PropTypes.object,
};

export const CreateWithLocation = connect(
    mapStateToProps,
    { createWithLocation }
)(CreateWithLocationButton);



