import React from 'react';

const Notification = ({notification}) => {
    console.log('Notification: ', notification.type, notification.message);
    if (notification.message === undefined) {
        return null;
    }

    let className = 'notification';

    return (
        <div className={notification.type === className ? className : className.concat(' ', notification.type)}>
            {notification.message}
        </div>
    );
};

export default Notification;