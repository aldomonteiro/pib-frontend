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
import DeactivateDelete from "./DeactivateDeleteButton";
import DeactivateButton from "./DeactivateButton";
import ActivateButton from "./ActivateButton";
import BotIcon from "@material-ui/icons/Android";

const BotTitle = ({ record }) => {
    return <span>{record ? `${record.name}` : ""}</span>;
};

const BotList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <BooleanField source="activeBot" />
            <EditButton />
        </Datagrid>
    </List>
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