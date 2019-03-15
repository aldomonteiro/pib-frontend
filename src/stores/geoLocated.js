import React from "react";
import { geolocated, geoPropTypes } from "react-geolocated";

const getDirection = (degrees, isLongitude) =>
    degrees > 0 ? (isLongitude ? "E" : "N") : isLongitude ? "W" : "S";

// addapted from http://stackoverflow.com/a/5786281/2546338
const formatDegrees = (degrees, isLongitude) =>
    `${0 | degrees}° ${0 |
    (((degrees < 0 ? (degrees = -degrees) : degrees) % 1) * 60)}' ${0 |
    (((degrees * 60) % 1) * 60)}" ${getDirection(degrees, isLongitude)}`;

class GeoLocated extends React.Component {

    render() {
        const { props } = this;
        return (
            <div
                style={{
                    fontSize: "large",
                    fontWeight: "bold",
                    margin: "2rem",
                }}
            >
                {!props.isGeolocationAvailable ? (
                    <div>O seu browser não suporta GeoLocalização.</div>
                ) : !props.isGeolocationEnabled ? (
                    <div>Localização não está habilitado.</div>
                ) : props.coords ? (
                    <div>
                        Você está em{" "}
                        <span className="coordinate">
                            {formatDegrees(props.coords.latitude, false)}
                        </span>,{" "}
                        <span className="coordinate">
                            {formatDegrees(props.coords.longitude, true)}
                        </span>
                        {props.coords.altitude ? (
                            <span>
                                , approximadamente {props.coords.altitude} metros
                                acima do nível do mar.
                            </span>
                        ) : null}.
                    </div>
                ) : (
                                <div>Buscando dados de localização&hellip;</div>
                            )}
            </div>
        );
    }
}

GeoLocated.propTypes = { ...GeoLocated.propTypes, ...geoPropTypes };

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(GeoLocated);