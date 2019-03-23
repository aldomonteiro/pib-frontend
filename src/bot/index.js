import React from "react";
import {
    List,
    Edit,
    Datagrid,
    TextField,
    BooleanField,
    EditButton,
    DisabledInput,
    SimpleForm,
    LongTextInput,
    Toolbar,
    SaveButton
} from "react-admin";
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import DeactivateDelete from "./DeactivateDeleteButton";
import DeactivateButton from "./DeactivateButton";
import ActivateButton from "./ActivateButton";
import BotIcon from "@material-ui/icons/Android";
import AvatarField from './AvatarField';
import UpdatePage from './UpdatePage';


const styles = {
    bold: { fontWeight: 'bold' },
};

const IDField = withStyles(styles)(({ classes, ...props }) => {
    const render = props.record.id === localStorage.getItem('activePage') ?
        (< TextField className={classes.bold} {...props} />) :
        (< TextField {...props} />);
    return render;
});

const BotTitle = ({ record }) => {
    return <span>{record ? `${record.name}` : ""}</span>;
};

const enhance = compose(
    connect((state) => ({
        isLoading: state.admin.loading > 0,
    })),
);

class UpdatePageButton extends React.Component {
    handleConfirmUpdate = (record) => {
        localStorage.setItem('activePage', record.id);
    }

    render() {
        const { record, isLoading } = this.props;
        return (
            < UpdatePage
                record={record}
                picture={record.pictureUrl}
                confirmUpdate={() => this.handleConfirmUpdate(record)}
                isLoading={isLoading} />);
    }
}

const UpdatePageButtonEnhanced = enhance(UpdatePageButton);

const BotList = ({ permissions, ...props }) => (
    <List {...props}>
        <Datagrid>
            <AvatarField />
            <IDField source="id" />
            <TextField source="name" />
            <BooleanField source="activeBot" />
            <EditButton />
            {permissions === 'admin' ? <UpdatePageButtonEnhanced /> : null}
        </Datagrid>
    </List >
);

const BotEditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton />
        {props.record.activeBot === false && (<ActivateButton {...props} />)}
        {props.record.activeBot && (<DeactivateButton {...props} />)}
        <DeactivateDelete {...props} />
    </Toolbar>
);

const BotEdit = props => (
    <Edit title={<BotTitle />}  {...props} >
        <SimpleForm redirect="show" toolbar={<BotEditToolbar />}>
            <DisabledInput source="id" />
            <DisabledInput source="name" />
            <LongTextInput source="greetingText" />
            <LongTextInput source="firstResponseText" />
        </SimpleForm>
    </Edit>
);


export default {
    icon: BotIcon,
    list: BotList,
    edit: BotEdit,
}