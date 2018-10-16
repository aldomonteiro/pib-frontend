import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { updatePage } from '../../actions/pages';

class UpdatePage extends Component {
    handleClick = () => {
        const { record } = this.props;
        this.props.updatePage(record.id, record);
        this.props.confirmUpdate();
    }

    render() {
        return <Button variant="raised"
            type="submit"
            color="primary"
            disabled={this.props.disabled} onClick={this.handleClick}>Confirmar</Button>;
    }
}

UpdatePage.propTypes = {
    disabled: PropTypes.bool,
    updatePage: PropTypes.func.isRequired,
    record: PropTypes.object,
    confirmUpdate: PropTypes.func,
};

export default connect(null, {
    updatePage,
})(UpdatePage);