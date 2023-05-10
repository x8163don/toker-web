import React from 'react';
import {Button} from 'flowbite-react';

const CustomersHeader = (props) => {
    return (
        <>
            <Button color="success" onClick={props.onClick}>新增客戶</Button>
        </>
    )
}

export default CustomersHeader;
