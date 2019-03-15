import React from 'react';
import { ReferenceField } from 'react-admin';

import FullNameField from './FullNameField';
import FirstNameField from './FirstNameField';

const CustomerReferenceField = props => (
    <ReferenceField source="customerId" reference="customers" {...props}>
        {props.firstName ? (<FirstNameField />) :
            (<FullNameField />)}
    </ReferenceField>
);
CustomerReferenceField.defaultProps = {
    source: 'customerId',
    addLabel: true,
};

export default CustomerReferenceField;
