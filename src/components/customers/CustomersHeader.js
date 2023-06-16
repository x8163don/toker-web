import React, {Fragment} from 'react';
import {Button} from 'flowbite-react';

const CustomersHeader = (props) => {
    return (
        <div className="w-2/3">
            <Button color="success" onClick={props.onClick}>新增客戶</Button>
        </div>
    )
}

export default CustomersHeader;
