import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

import './Toast.css';

const Toast = props => {
    const { toastList, position, autoDelete, dismissTime } = props;
    const [list, setList] = useState(toastList);
    const [toastDismiss, setToastDismiss] = useState([]); // add a new property to be used in auto-dismissing a toast

    // the useCallback is used so as to
    // prevent unncessary renders
    const deleteToast = useCallback(id => {
        const index = list.findIndex(e => e.id === id);
        list.splice(index, 1);
        setList([...list]);
        
        toastDismiss.length = 0; // after deleting a toast, clear the contents of the array
        setToastDismiss([...toastDismiss]); // update the toastDismiss array with the empty array
    }, [list, toastDismiss]);

    useEffect(() => {
        setList(toastList);
        
        // wait for some seconds before adding a toast to
        // toastDismiss array
        setTimeout(() => {
            setToastDismiss(toastList);
        }, dismissTime); // dismissTime is a prop passed into the toast component
        
        // eslint-disable-next-line
    }, [toastList, list]);

    // instead of using another useEffect, you can add its
    // contents into the first useEffect hook
    // it is just a choice for me to use a second useEffect hook
    useEffect(() => {
        const toast = toastDismiss.reverse(); // we only want the newly added toast inside the array. So we reverse to get the toast at index 0
        // if autoDelete prop is true and toastDismiss length is > 0
        if (autoDelete && toast.length) {
            // wait for some seconds before auto deleting a toast
            setTimeout(() => {
                deleteToast(toast[0].id);
            }, dismissTime);
        }
        
        // eslint-disable-next-line
    }, [toastDismiss]);


    return (
        <>
            <div className={`notification-container ${position}`}>
                {
                    list.map((toast, i) =>     
                        <div 
                            key={i}
                            className={`notification toast ${position}`}
                            style={{ backgroundColor: toast.backgroundColor }}
                        >
                            <button onClick={() => deleteToast(toast.id)}>
                                X
                            </button>
                            <div className="notification-image">
                                <img src={toast.icon} alt="" />
                            </div>
                            <div>
                                <p className="notification-title">{toast.title}</p>
                                <p className="notification-message">
                                    {toast.description}
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    );
}

Toast.defaultProps = {
    position: 'bottom-right',
    dismissTime: 2000
}

Toast.propTypes = {
    toastList: PropTypes.array.isRequired,
    position: PropTypes.string,
    autoDelete: PropTypes.bool,
    dismissTime: PropTypes.number
}

export default Toast;
