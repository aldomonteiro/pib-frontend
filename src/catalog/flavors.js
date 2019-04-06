import React, { Fragment } from "react";
import {
    BooleanField,
    BulkDeleteButton,
    Button,
    ChipField,
    Create,
    Datagrid,
    DisabledInput,
    EditActions,
    EditButton,
    EditController,
    Filter,
    List,
    Link,
    NumberField,
    NumberInput,
    ReferenceArrayInput,
    ReferenceInput,
    ReferenceField,
    SelectArrayInput,
    SelectInput,
    SimpleForm,
    TextField,
    TextInput,
    Title,
    translate,
    number,
    minValue,
    required,
} from "react-admin";
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import FlavorIcon from "@material-ui/icons/RestaurantMenu";
import InputAdornment from '@material-ui/core/InputAdornment';
import MUIButton from '@material-ui/core/Button';
import CloneIcon from "@material-ui/icons/ContentCopy";

// import { Link } from 'react-router-dom';

import dataProviderFactory from '../dataProvider';
import { GET_ONE } from "ra-core/lib/dataFetchActions";
import ChangeCategoryButton from './changeCategoryButton';
import ChangePriceButton from './changePriceButton';

// const FlavorTitle = ({ record }) => {
//     return <span>{record ? `${record.flavor}` : ""}</span>;
// };

const FlavorFilter = (props) => (
    <Filter {...props}>
        <TextInput source="flavor" alwaysOn />
        <ReferenceInput source="categoryId" reference="categories" alwaysOn>
            <SelectInput optionText="name" {...props} />
        </ReferenceInput>
    </Filter>
);

const FlavorBulkActionButtons = translate(props => (
    <Fragment>
        <ChangePriceButton label={props.translate('pos.flavors.changePrice')} {...props} />
        <ChangeCategoryButton {...props} />
        {/* Add the default bulk delete action */}
        <BulkDeleteButton {...props} />
    </Fragment>
));

const CreateRelatedFlavor = translate(({ translate, record }) => (
    <MUIButton
        component={Link}
        to={{
            pathname: '/flavors/create',
            state: { record: { flavor: record.flavor, categoryId: record.categoryId, toppings: record.toppings } },
        }}
    >
        <Button label={translate('pos.flavors.clone')} >
            <CloneIcon />
        </Button>
    </MUIButton>
));


const FlavorList = props => (
    <List filters={<FlavorFilter />} bulkActionButtons={<FlavorBulkActionButtons />} {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="flavor" />
            <ReferenceField source="categoryId" reference="categories">
                <TextField source="name" />
            </ReferenceField>
            <NumberField source="price" locales="pt-BR" options={{ style: 'currency', currency: 'BRL' }} />
            <EditButton />
            <CreateRelatedFlavor />
        </Datagrid>
    </List>
);

// const FlavorEdit = props => (
//     <Edit title={<FlavorTitle />} {...props}>
//         <SimpleForm redirect="list">
//             <DisabledInput source="id" />
//             <TextInput source="flavor" />
//             <ReferenceInput source="categoryId" reference="categories">
//                 <SelectInput optionText="name" />
//             </ReferenceInput>
//             <ReferenceArrayInput reference="toppings" source="toppings" sort={{ field: 'topping', order: 'ASC' }}>
//                 <SelectArrayInput optionText="topping">
//                     <ChipField source="id" />
//                 </SelectArrayInput>
//             </ReferenceArrayInput>
//         </SimpleForm>
//     </Edit>
// );

const editStyles = {
    actions: {
        float: 'right',
    },
    card: {
        marginTop: '1em',
        width: '100%'
    },
};

const asyncValidate = async (values, dispatch, props, field) => {
    return new Promise(async (resolve, reject) => {
        if (field === 'price' || field === 'categoryId') {
            const res = await dataProviderFactory(GET_ONE, 'categories', { id: values.categoryId });
            const data = await res.data;
            if (values.price && data.price_by_size)
                return reject({ price: 'Não informe preço para essa categoria' });
            return resolve();
            //   const res = await fetch('/api/admin-v1/users/book/username', {
            //     method: 'PUT',
            //     body: JSON.stringify({ username: values.username }),
            //     headers: {"Content-type": "application/json; charset=UTF-8" }
            //   })
            //   if (res.ok) {
            //     delete app.asyncValidateErrors.username
            //     return resolve()
            //   }

            //   const err = await res.text()
            //   app.asyncValidateErrors[field] = err
            //   reject(app.asyncValidateErrors)
        }

        resolve({})
    })
}


const FlavorEdit = withStyles(editStyles)(({ classes, ...props }) => (
    <EditController {...props}>
        {({ resource, record, redirect, save, basePath, version }) => {
            return (
                <div className="edit-page">
                    <Title defaultTitle={`#${record ? record.id : ''}`} />
                    <div className={classes.actions}>
                        <EditActions
                            basePath={basePath}
                            resource={resource}
                            data={record}
                            hasList
                        />
                    </div>
                    <Card className={classes.card}>
                        {record && (
                            <SimpleForm
                                basePath={basePath}
                                redirect="list"
                                resource={resource}
                                record={record}
                                save={save}
                                version={version}
                                asyncValidate={asyncValidate}
                                asyncBlurFields={['price', 'categoryId']}>

                                <DisabledInput source="id" />
                                <TextInput source="flavor" />
                                <ReferenceInput source="categoryId" reference="categories" validate={[required()]}>
                                    <SelectInput optionText="name" {...props} />
                                </ReferenceInput>
                                <BooleanField source="price_by_size" />
                                <ReferenceArrayInput reference="toppings" source="toppings" sort={{ field: 'topping', order: 'ASC' }} perPage={40}>
                                    <SelectArrayInput optionText="topping">
                                        <ChipField source="id" />
                                    </SelectArrayInput>
                                </ReferenceArrayInput>
                                <NumberInput source="price" validate={[number(), minValue(0)]}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">R$</InputAdornment>)
                                    }} />
                            </SimpleForm>
                        )}
                    </Card>
                </div>
            )
        }}
    </EditController>
));


const FlavorCreate = props => (
    <Create {...props}>
        <SimpleForm redirect="list"
            asyncValidate={asyncValidate}
            asyncBlurFields={['price', 'categoryId']}>
            <TextInput source="id" />
            <TextInput source="flavor" />
            <ReferenceInput source="categoryId" reference="categories">
                <SelectInput optionText="name" />
            </ReferenceInput>
            <ReferenceArrayInput reference="toppings" source="toppings" sort={{ field: 'topping', order: 'ASC' }} perPage={40}>
                <SelectArrayInput optionText="topping" >
                    <ChipField source="id" />
                </SelectArrayInput>
            </ReferenceArrayInput>
            <NumberInput source="price" validate={[number(), minValue(0)]}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>)
                }} />
        </SimpleForm>
    </Create>
);

export default {
    icon: FlavorIcon,
    list: FlavorList,
    edit: FlavorEdit,
    create: FlavorCreate,
}