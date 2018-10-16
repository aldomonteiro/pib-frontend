import React from 'react';

const LoadingPage = (props) => (
    // <div className={props.className}>
    //     <img alt="Loading" style={{
    //         alignSelf: 'center',
    //         height: '6rem',
    //         width: '6rem',
    //     }} src="/images/loader.gif" />
    // </div>
    <div className={props.className}>
        <img alt="Loading" style={{
            alignSelf: 'center',
            height: '6rem',
            width: '6rem',
        }} src={process.env.PUBLIC_URL + '/images/loader.gif'} />
    </div>
);

export default LoadingPage;