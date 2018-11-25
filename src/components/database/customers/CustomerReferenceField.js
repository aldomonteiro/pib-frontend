import React from 'react';
import { ReferenceField } from 'react-admin';

import FullNameField from './FullNameField';

const CustomerReferenceField = props => (
    <ReferenceField source="customerId" reference="customers" {...props}>
        <FullNameField />
    </ReferenceField>
);
CustomerReferenceField.defaultProps = {
    source: 'customerId',
    addLabel: true,
};

export default CustomerReferenceField;
