import React from 'react';
import Avatar from '@material-ui/core/Avatar';

const AvatarField = ({ record, size }) => (
    < Avatar
        // src={`${record.profile_pic}?size=${size}x${size}`}
        src={`${record.pictureUrl || process.env.PUBLIC_URL + '/images/pizzaibot-avatar.png'}`}
        size={size}
        style={{ width: size, height: size }}
    />
);

AvatarField.defaultProps = {
    size: 25,
};

export default AvatarField;
