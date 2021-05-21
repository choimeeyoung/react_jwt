import React from 'react';
import PropTypes from 'prop-types';
const AppLayout = ({children}) => {


    return (
        <>
            <header>
                Header영역
            </header>
            {children}
        </>
    )
}

AppLayout.prototypes = {
    children: PropTypes.node.isRequired
}

export default AppLayout;
