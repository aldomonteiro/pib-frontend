import React from 'react';
import compose from 'recompose/compose';
import { translate } from 'react-admin';
import { connect } from 'react-redux';
// import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

import { update_order_data } from '../../actions/orderActions';
// import styles from './styles';

class PostCommentsChip extends React.Component {

    handleClick = () => {
        const { record, update_order_data, postComment } = this.props;
        const { id } = record;

        const newData = { updatePostComments: 'MERGE', updatedPostComment: postComment, ...record }
        update_order_data('UPDATE_ORDER_DATA', id, newData)
    }

    handleDelete = () => {
        const { record, update_order_data, postComment } = this.props;
        const { id } = record;

        const newData = { updatePostComments: 'DELETE', updatedPostComment: postComment, ...record }
        update_order_data('UPDATE_ORDER_DATA', id, newData)
    }

    render = () => {
        const { translate, label } = this.props;
        return (
            <Chip
                label={label}
                onClick={this.handleClick}
                onDelete={this.handleDelete}
            />
        );
    }
}

const enhanced = compose(
    // withStyles(styles),
    translate,
    connect(
        undefined,
        {
            update_order_data,
        }
    )
)

export default enhanced(PostCommentsChip);