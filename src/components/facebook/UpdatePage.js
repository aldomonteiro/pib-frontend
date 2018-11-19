import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import Button from '@material-ui/core/Button';
import { updatePage } from '../../actions/pages';
import { translate } from 'react-admin';
import CircularProgress from '@material-ui/core/CircularProgress';

class UpdatePage extends Component {
    handleClick = () => {
        const { record } = this.props;
        this.props.updatePage(record.id, record);
        this.props.confirmUpdate();
    }

    render() {
        const { translate, isLoading } = this.props;
        return <Button variant="raised"
            type="submit"
            color="primary"
            disabled={this.props.disabled} onClick={this.handleClick}>
            {isLoading && (
                <CircularProgress style={{ color: 'white' }} size={25} thickness={2} />
            )}
            {translate('pos.pageList.confirm')}</Button>;
    }
}

UpdatePage.propTypes = {
    disabled: PropTypes.bool,
    updatePage: PropTypes.func.isRequired,
    record: PropTypes.object,
    confirmUpdate: PropTypes.func,
    translate: PropTypes.func,
    isLoading: PropTypes.bool,
};

// export default connect(null, {
//     updatePage,
//     translate
// })(UpdatePage);

const enhance = compose(
    translate,
    connect(
        null,
        {
            updatePage: updatePage,
        }
    )
);

export default enhance(UpdatePage);
