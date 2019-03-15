import React from 'react';

const Whatsapp = () => (
    // <div className={props.className}>
    //     <img alt="Loading" style={{
    //         alignSelf: 'center',
    //         height: '6rem',
    //         width: '6rem',
    //     }} src="/images/loader.gif" />
    // </div>
    <div>
        <img alt="Whatsapp" style={{
            alignSelf: 'center',
        }} src={process.env.PUBLIC_URL + '/images/whatsapp.svg'} />
    </div>
);

export default Whatsapp;