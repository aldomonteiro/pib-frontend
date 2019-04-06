import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Title, translate } from 'react-admin';

import CatalogDataLoad from './catalog-data-load';

const Catalog = ({ translate }) => (
    <Card>
        <Title title={translate('pos.dataload.catalog')} />
        <CardContent>
            <CatalogDataLoad />
        </CardContent>
    </Card>
);

export default translate(Catalog);