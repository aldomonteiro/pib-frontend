import { fetchUtils } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

// Addim Custom Header
// https://marmelab.com/react-admin/DataProviders.html#adding-custom-headers
const httpClient = (url, options = {}) => {
    if (!options.headers) {
        options.headers = new Headers({ Accept: 'application/json' });
    }
    const token = localStorage.getItem('token');
    options.headers.set('Authorization', `Bearer ${token}`);
    return fetchUtils.fetchJson(url, options);
}

const dataProvider = simpleRestProvider("https://localhost:8080", httpClient);

export default (type, resource, params) =>
    new Promise(resolve =>
        setTimeout(() => resolve(dataProvider(type, resource, params)), 500)
    );