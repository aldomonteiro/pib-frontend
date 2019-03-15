import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import {
    DateInput,
    EditActions,
    EditController,
    LongTextInput,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextInput,
    Title,
    minLength,
    translate,
} from 'react-admin'; // eslint-disable-line import/no-unresolved
import compose from 'recompose/compose';

import CreditCard from './CreditCard';

const editStyles = {
    actions: {
        float: 'right',
    },
    card: {
        marginTop: '1em',
        maxWidth: '30em',
    },
};

const AccountEdit = ({ classes, translate, ...props }) => (
    <EditController {...props}>
        {({ resource, record, redirect, save, basePath, version }) => (
            <div className="edit-page">
                <Title defaultTitle={translate('pos.configuration.title')} />
                <div className={classes.actions}>
                    <EditActions
                        basePath={basePath}
                        resource={resource}
                        data={record}
                        hasShow
                        hasList
                    />
                </div>
                <Card className={classes.card}>
                    {record && (
                        <SimpleForm
                            basePath={basePath}
                            redirect={redirect}
                            resource={resource}
                            record={record}
                            save={save}
                            version={version}
                        >
                            <ReferenceInput
                                source="planId"
                                reference="plans"
                                perPage={15}
                                sort={{ field: 'plan', order: 'ASC' }}
                                fullWidth
                            >
                                <SelectInput optionText="plan" />
                            </ReferenceInput>
                            <CreditCard />
                        </SimpleForm>
                    )}
                </Card>
            </div>
        )}
    </EditController>
);

const enhanced = compose(
    withStyles(editStyles),
    translate
)

export default enhanced(AccountEdit);
