import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { translate } from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { updatePage as updatePageAction } from '../actions/pages';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    }
});

class DeactivateButton extends Component {
    handleDeactivate = () => {
        const { updatePage, record } = this.props;
        updatePage('DEACTIVATE', record.id, record);
    };

    render() {
        const { record, translate, classes } = this.props;
        return record ? (
            <Button variant="outlined" color="secondary" className={classes.button} onClick={this.handleDeactivate}>
                {translate('resources.pages.actions.deactivate')}
            </Button>
        ) : (
                <span />
            );
    }
}

DeactivateButton.propTypes = {
    record: PropTypes.object,
    updatePage: PropTypes.func,
    translate: PropTypes.func,
    classes: PropTypes.object.isRequired,
};

const enhance = compose(
    translate,
    withStyles(styles),
    connect(
        null,
        {
            updatePage: updatePageAction,
        }
    )
);

export default enhance(DeactivateButton);

