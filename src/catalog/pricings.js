import React, { Fragment } from "react";
import {
    BulkDeleteButton,
    Create,
    Datagrid,
    DisabledInput,
    Edit,
    EditButton,
    List,
    NumberField,
    NumberInput,
    TextInput,
    ReferenceInput,
    ReferenceField,
    SelectInput,
    SimpleForm,
    TextField,
    number,
    minValue,
    translate,
} from "react-admin";
import PricingIcon from "@material-ui/icons/MonetizationOn";
import InputAdornment from '@material-ui/core/InputAdornment';
import ChangeCategoryButton from './changeCategoryButton';

const PricingTitle = translate(({ record, translate }) => (
    <span>
        {translate('resources.pricings.name', { smart_count: 1 })} &quot;
        {record.id}&quot;
    </span>
));

const PricingBulkActionButtons = translate(props => (
    <Fragment>
        <ChangeCategoryButton {...props} />
        {/* Add the default bulk delete action */}
        <BulkDeleteButton {...props} />
    </Fragment>
));


const PricingList = props => (
    <List {...props} bulkActionButtons={<PricingBulkActionButtons />}>
        <Datagrid>
            <TextField source="id" />
            <ReferenceField source="categoryId" reference="categories">
                <TextField source="name" />
            </ReferenceField>
            <ReferenceField source="sizeId" reference="sizes">
                <TextField source="size" />
            </ReferenceField>
            <NumberField source="price" locales="pt-BR" options={{ style: 'currency', currency: 'BRL' }} />
            <EditButton />
        </Datagrid>
    </List>
);

const PricingEdit = props => (
    <Edit title={<PricingTitle />} {...props}>
        <SimpleForm redirect="list">
            <DisabledInput source="id" />
            <ReferenceInput source="categoryId" reference="categories" filter={{ price_by_size: true }}>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput source="sizeId" reference="sizes">
                <SelectInput optionText="size" />
            </ReferenceInput>
            <NumberInput source="price" validate={[number(), minValue(0)]}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>)
                }} />
        </SimpleForm>
    </Edit>
);

const PricingCreate = props => (
    <Create {...props}>
        <SimpleForm redirect="list">
            <TextInput source="id" />
            <ReferenceInput source="categoryId" reference="categories" filter={{ price_by_size: true }}>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceInput source="sizeId" reference="sizes">
                <SelectInput optionText="size" />
            </ReferenceInput>
            <NumberInput source="price" validate={[number(), minValue(0)]}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>)
                }} />
        </SimpleForm>
    </Create>
);

export default {
    icon: PricingIcon,
    list: PricingList,
    edit: PricingEdit,
    create: PricingCreate,
}