import { Query } from 'react-admin';

const QueryOrder = ({ id }) => (
    <Query type="GET_ONE" resource="orders" payload={{ id: id }}>
        {({ data, loading, error }) => {
            if (loading) { return <p> Carregando.. </p>; }
            if (error) { return <p>ERRO</p>; }
            return <div>Novo pedido: {data.id}</div>;
        }}
    </Query>
);

export default QueryOrder;