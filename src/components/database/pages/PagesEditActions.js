import React from 'react';
import { CardActions } from 'react-admin';

import DeactivateButton from './DeactivateButton';

const PagesEditActions = ({ data }) => (
    <CardActions>
        <DeactivateButton record={data} />
    </CardActions>
);

export default PagesEditActions;