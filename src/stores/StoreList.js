import React from "react";
import {
    List,
    Datagrid,
    TextField, NumberField,
    EditButton,

} from "react-admin";


const StoreList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="city" />
            <TextField source="phone" />
            <NumberField source="delivery_fee" locales="pt-BR" options={{ style: 'currency', currency: 'BRL' }} />
            <TextField source="location_lat" />
            <TextField source="location_long" />
            <EditButton />
        </Datagrid>
    </List>
);

export default StoreList;