import React from "react";
import PropTypes from 'prop-types';
import GeoLocated from "./geoLocated";
import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { updateLocation } from '../../../actions/location'

class LocationButton extends React.Component {
    constructor(props) {
        super(props);

        this.getInnerRef = this.getInnerRef.bind(this);
        this.getLocation = this.getLocation.bind(this);
    }

    innerRef;
    getInnerRef(ref) {
        this.innerRef = ref;
    }

    getLocation() {
        this.innerRef && this.innerRef.getLocation();
        if (this.innerRef.state.coords)
            this.props.updateLocation(this.innerRef.state.coords.latitude, this.innerRef.state.coords.longitude);
    }

    render() {
        const { getInnerRef, getLocation } = this;
        return (
            <article style={{ textAlign: "center" }}>
                {/* eslint-disable-next-line no-console*/}
                <GeoLocated onError={error => console.log(error)} ref={getInnerRef} />
                <Button
                    onClick={getLocation}
                >
                    Atualizar Localização
                </Button>
            </article>
        );
    }
}

LocationButton.propTypes = {
    updateLocation: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => {
    return {
        updateLocation: bindActionCreators(updateLocation, dispatch)
    }
};

const mapStateToProps = state => ({
    geoLocation: state.locationReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationButton);