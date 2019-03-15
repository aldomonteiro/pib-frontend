import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';

class PageListItem extends Component {
    render() {
        return (
            <ListItem>
                <Avatar alt={this.props.name} src={this.props.pictureUrl} />
                <ListItemText primary={this.props.name} />
                <ListItemSecondaryAction>
                    <Switch
                        onChange={this.change.bind(this)}
                        checked={this.props.checked.indexOf(this.props.name) !== -1}
                    />
                </ListItemSecondaryAction>
            </ListItem>)
    }

    change() {
        this.props.onChange(this.props.name);
    }
}

export default PageListItem;