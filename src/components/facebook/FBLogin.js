import React from 'react';
import PropTypes from 'prop-types';


class FBLogin extends React.Component {
    render() {
        console.log(this.props);
        return (
            <div>
                FBLogin
            </div>
        );
    }
}

FBLogin.propTypes = {
    code: PropTypes.string.isRequired
};

export default FBLogin;