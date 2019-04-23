
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
import { AddCircle } from '@material-ui/icons';
import IconCancel from '@material-ui/icons/Cancel';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { Button, translate } from 'react-admin';

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

class OrderDialog extends Component {
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
        // const { deletePage, record } = this.props;
        // deletePage(record.id, record);
    };

    render() {
        const { showDialog } = this.state;
        const { label = 'ra.action.delete', classes = {}, className, record, titleSource, translate } = this.props;
        return (
            <Fragment>
                <Button onClick={this.handleClick}
                    label={translate('pos.orders.new.title')}>
                    <AddCircle />
                </Button>
                <Dialog fullWidth open={showDialog} onClose={this.handleCloseClick} aria-label={translate('pos.areYouSure')}>
                    <DialogTitle>
                        {translate('pos.orders.new.title')}
                    </DialogTitle>
                    <DialogContent>
                        <div>{translate('resources.pages.messages.warningBeforeDelete')}</div>
                    </DialogContent>
                    <DialogActions>
                        <Button label="ra.action.cancel" onClick={this.handleCloseClick}>
                            <IconCancel />
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        );
    }
}

OrderDialog.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.object,
    className: PropTypes.string,
    deletePage: PropTypes.func,
    label: PropTypes.string,
    record: PropTypes.object,
    resource: PropTypes.string.isRequired,
    translate: PropTypes.func,
};

export default compose(
    // connect(
    //     null,
    //     {
    //         deletePage: deletePageAction,
    //     }
    // ),
    translate,
    withStyles(styles)
)(OrderDialog);