
/*
Copyright (c) 2018 Ady Levy
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import ActionDelete from '@material-ui/icons/Delete';
import classnames from 'classnames';
import IconCancel from '@material-ui/icons/Cancel';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { Button as RaButton, translate } from 'react-admin';
import Button from '@material-ui/core/Button';
import { deletePage as deletePageAction } from '../../../actions/pages';


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        color: theme.palette.error.main,
        '&:hover': {
            backgroundColor: fade(theme.palette.error.main, 0.12),
            // Reset on mouse devices
            '@media (hover: none)': {
                backgroundColor: 'transparent'
            }
        }
    },
    deleteButton: {
        margin: theme.spacing.unit,
        color: theme.palette.error.main,
        '&:hover': {
            backgroundColor: fade(theme.palette.error.main, 0.12),
            // Reset on mouse devices
            '@media (hover: none)': {
                backgroundColor: 'transparent'
            }
        }
    }
});

class DeactivateDelete extends Component {
    state = {
        showDialog: false
    };

    handleClick = () => {
        this.setState({ showDialog: true });
    };

    handleCloseClick = () => {
        this.setState({ showDialog: false });
    };

    handleDelete = event => {
        event.preventDefault();
        this.setState({ showDialog: false });
        // const { dispatchCrudDelete, resource, record, basePath, redirect } = this.props;
        // dispatchCrudDelete(resource, record.id, record, basePath, redirect);
        const { deletePage, record } = this.props;
        deletePage(record.id, record);
    };

    render() {
        const { showDialog } = this.state;
        const { label = 'ra.action.delete', classes = {}, className, record, titleSource, translate } = this.props;
        return (
            <Fragment>
                <Button className={classes.button} onClick={this.handleClick}>
                    {translate('resources.pages.actions.deactivateAndDelete')}
                    <ActionDelete />
                </Button>
                <Dialog fullWidth open={showDialog} onClose={this.handleCloseClick} aria-label={translate('pos.areYouSure')}>
                    <DialogTitle>
                        {translate('pos.deleting')} “
						{titleSource ? record[titleSource] : record.title ? record.title : record.name ? record.name : '– unnamed –'}”
					</DialogTitle>
                    <DialogContent>
                        <div>{translate('resources.pages.messages.warningBeforeDelete')}</div>
                    </DialogContent>
                    <DialogActions>
                        <RaButton
                            onClick={this.handleDelete}
                            label={label}
                            className={classnames('ra-delete-button', classes.deleteButton, className)}
                            key="button">
                            <ActionDelete />
                        </RaButton>
                        <RaButton label="ra.action.cancel" onClick={this.handleCloseClick}>
                            <IconCancel />
                        </RaButton>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

DeactivateDelete.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.object,
    className: PropTypes.string,
    // dispatchCrudDelete: PropTypes.func.isRequired,
    deletePage: PropTypes.func,
    label: PropTypes.string,
    record: PropTypes.object,
    // redirect: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.func]),
    resource: PropTypes.string.isRequired,
    translate: PropTypes.func,
};

// DeactivateWithConfirmation.defaultProps = {
//     redirect: 'list',
// };

export default compose(
    // connect(
    //     null,
    //     { dispatchCrudDelete: crudDelete }
    // ),
    connect(
        null,
        {
            deletePage: deletePageAction,
        }
    ),
    translate,
    withStyles(styles)
)(DeactivateDelete);