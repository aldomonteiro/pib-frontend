
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { crudUpdate, SaveButton } from 'react-admin';

const updateWithLocation = (values, lat, long, basePath, redirectTo) => {
    if (!lat && !long) {
        return crudUpdate('stores', values.id, { ...values }, { ...values }, basePath, redirectTo);
    } else {
        const { location_lat, location_long, ...rest } = values
        return crudUpdate('stores', values.id, { ...rest, location_lat: lat, location_long: long }, { ...values }, basePath, redirectTo);
    }
}

class UpdateWithLocationButton extends Component {
    handleClick = () => {
        const { basePath, handleSubmit, redirect, updateWithLocation, geoLocation } = this.props;
        return handleSubmit((values) => {
            console.log(values);
            if (geoLocation) updateWithLocation(values, geoLocation.lat, geoLocation.long, basePath, redirect);
            else updateWithLocation(values, null, null, basePath, redirect);
        });
    };

    render () {
        const { label, redirect, submitOnEnter } = this.props;
        return (
            <SaveButton
                handleSubmitWithRedirect={this.handleClick}
                label={label}
                redirect={redirect}
                submitOnEnter={submitOnEnter}
            />
        );
    }
}

const mapStateToProps = state => ({
    geoLocation: state.locationReducer,
});

UpdateWithLocationButton.propTypes = {
    geoLocation: PropTypes.object,
};

export const UpdateWithLocation = connect(
    mapStateToProps,
    { updateWithLocation }
)(UpdateWithLocationButton);



