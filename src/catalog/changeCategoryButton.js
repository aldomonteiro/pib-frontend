import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { Button, Confirm, crudUpdateMany, translate } from 'react-admin';
import Icon from "@material-ui/icons/RoomService";

class ChangeCategoryButton extends Component {
    state = {
        isOpen: false,
        selectedCategory: null,
    }

    handleClick = () => {
        this.setState({ isOpen: true });
    }

    handleDialogClose = () => {
        this.setState({ isOpen: false });
    };

    handleConfirm = () => {
        const { basePath, crudUpdateMany, resource, selectedIds } = this.props;
        crudUpdateMany(resource, selectedIds, { views: 0 }, basePath);
        this.setState({ isOpen: true });
    };

    render () {
        return (
            <Fragment>
                <Button label={this.props.translate('pos.flavors.changeCategory')} onClick={this.handleClick}>
                    <Icon />
                </Button>
                <Confirm
                    isOpen={this.state.isOpen}
                    title={this.props.translate('pos.flavors.changeCategory')}
                    content={this.props.translate('pos.flavors.changeCategory')}
                    onConfirm={this.handleConfirm}
                    onClose={this.handleDialogClose}
                />
            </Fragment>
        );
    }
}

const enhanced = compose(
    translate,
    connect(undefined, { crudUpdateMany })
)

export default enhanced(ChangeCategoryButton);