import React from 'react';
import pure from 'recompose/pure';

const OnlyNameField = ({ record = {} }) => (
    <div style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center' }}>
        {record.first_name} {record.last_name}
    </div>
);

const PureFullNameField = pure(OnlyNameField);

// PureFullNameField.defaultProps = {
//     source: 'last_name',
//     label: 'resources.customers.fields.name',
// };

export default PureFullNameField;
