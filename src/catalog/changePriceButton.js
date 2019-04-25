import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { Button, Confirm, crudUpdateMany, translate } from 'react-admin';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/icons/MonetizationOn';
import NumberFormatCustom from '../components/NumberFormat';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
    },
});

class ChangePriceButton extends Component {
    state = {
        isOpen: false,
        numberformat: '0',
    }

    handleClick = () => {
        this.setState({ isOpen: true });
    }

    handleDialogClose = () => {
        this.setState({ isOpen: false });
    };

    handleConfirm = () => {
        const { basePath, crudUpdateMany, resource, selectedIds } = this.props;
        crudUpdateMany(resource, selectedIds, { price: this.state.numberformat }, basePath);
        this.setState({ isOpen: true });
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render () {
        const { translate, classes } = this.props;
        const { numberformat } = this.state;
        return (
            <Fragment>
                <Button label={translate('pos.flavors.changePrice')} onClick={this.handleClick}>
                    <Icon />
                </Button>
                <Confirm
                    isOpen={this.state.isOpen}
                    title={this.props.translate('pos.flavors.changePrice')}
                    content={
                        <TextField
                            className={classes.formControl}
                            label={translate('pos.flavors.typePrice')}
                            value={numberformat}
                            onChange={this.handleChange('numberformat')}
                            id="formatted-numberformat-input"
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                            }}
                        />
                    }
                    onConfirm={this.handleConfirm}
                    onClose={this.handleDialogClose} />

            </Fragment>
        );
    }
}

const enhanced = compose(
    withStyles(styles),
    translate,
    connect(undefined, { crudUpdateMany })
)

export default enhanced(ChangePriceButton);