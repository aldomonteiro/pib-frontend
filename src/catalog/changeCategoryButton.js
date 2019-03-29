import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { Button, Confirm, crudUpdateMany, translate, GET_LIST } from 'react-admin';
import Icon from "@material-ui/icons/RoomService";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';

import dataProviderFactory from '../dataProvider';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 240,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

function SelectCustom (props) {
    const { categories, handleChange, label, classes, value } = props;
    return (
        <form className={classes.root}>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="category-id">{label}</InputLabel>
                <Select
                    value={value}
                    onChange={handleChange}
                    inputProps={{
                        name: 'category',
                        id: 'category-id',
                    }}
                >
                    {categories && categories.length > 0 && categories.map(category => <MenuItem value={category.id}>{category.name}</MenuItem>)}
                </Select>
            </FormControl>
        </form>
    );
}


class ChangeCategoryButton extends Component {
    state = {
        isOpen: false,
        selectedCategory: null,
        categories: null,
    }

    handleClick = () => {
        this.setState({ isOpen: true });
    }

    handleDialogClose = () => {
        this.setState({ isOpen: false });
    };

    handleConfirm = () => {
        const { basePath, crudUpdateMany, resource, selectedIds } = this.props;
        const { selectedCategory } = this.state;
        crudUpdateMany(resource, selectedIds, { categoryId: selectedCategory }, basePath);
        this.setState({ isOpen: true });
    };

    handleChange = name => event => {
        console.log(name, event.target);
        this.setState({
            [name]: event.target.value,
        });
    };

    componentDidMount () {
        dataProviderFactory(GET_LIST, 'categories', {
            sort: { field: 'name', order: 'ASC' },
            pagination: { page: 1, perPage: 9000 },
        })
            .then(response => response.data)
            .then(categories => this.setState({ categories: categories }));
    }

    render () {
        return (
            <Fragment>
                <Button label={this.props.translate('pos.categories.changeCategory')} onClick={this.handleClick}>
                    <Icon />
                </Button>
                <Confirm
                    isOpen={this.state.isOpen}
                    title={this.props.translate('pos.categories.changeCategory')}
                    content={
                        <SelectCustom
                            classes={this.props.classes}
                            categories={this.state.categories}
                            value={this.state.selectedCategory}
                            label={this.props.translate('pos.categories.changeCategory')}
                            handleChange={this.handleChange('selectedCategory')}
                        />
                    }
                    onConfirm={this.handleConfirm}
                    onClose={this.handleDialogClose}
                />
            </Fragment>
        );
    }
}

const enhanced = compose(
    withStyles(styles),
    translate,
    connect(undefined, { crudUpdateMany })
)

export default enhanced(ChangeCategoryButton);