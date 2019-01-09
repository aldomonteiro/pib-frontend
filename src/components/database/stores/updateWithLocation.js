
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { crudUpdate, SaveButton } from 'react-admin';

const updateWithLocation = (values, lat, long, basePath, redirectTo) => {
    return crudUpdate('stores', values.id, { ...values, location_lat: lat, location_long: long }, { ...values }, basePath, redirectTo);
}

class UpdateWithLocationButton extends Component {
    handleClick = () => {
        const { basePath, handleSubmit, redirect, updateWithLocation, geoLocation } = this.props;
        return handleSubmit((values) => {
            updateWithLocation(values, geoLocation.lat, geoLocation.long, basePath, redirect);
        });
    };

    render() {
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



