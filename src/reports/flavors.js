import React from "react";
import {
    Datagrid,
    DateField,
    DateInput,
    Filter,
    List,
    NumberField,
    ReferenceField,
    ReferenceInput,
    SelectInput,
    TextField,
} from "react-admin";
import moment from 'moment';
import ReportFlavorIcon from "@material-ui/icons/RestaurantMenu";

const ReportFlavorFilter = (props) => (
    <Filter {...props}>
        <ReferenceInput source="categoryId" reference="categories" alwaysOn>
            <SelectInput optionText="name" {...props} />
        </ReferenceInput>
        <DateInput
            source="confirmed_at_rangestart"
            alwaysOn />
        <DateInput source="confirmed_at_rangeend" alwaysOn />
    </Filter>
);

const iniMonth = moment().startOf('month').toDate();

const ReportFlavorList = props => (
    <List filters={<ReportFlavorFilter />}
        filterDefaultValues={{ confirmed_at_rangestart: iniMonth, confirmed_at_rangeend: new Date() }}
        perPage={100}
        {...props}>
        <Datagrid>
            <NumberField source="id" />
            <TextField source="flavor" />
            <ReferenceField source="categoryId" reference="categories">
                <TextField source="name" {...props} />
            </ReferenceField>
            <NumberField source="itemsSold" />
            <NumberField source="amountSold" locales="pt-BR" options={{ style: 'currency', currency: 'BRL' }} />
            <DateField source="firstSale" locales="pt-BR" />
            <DateField source="lastSale" locales="pt-BR" />
        </Datagrid>
    </List>
);

export default {
    icon: ReportFlavorIcon,
    list: ReportFlavorList,
}