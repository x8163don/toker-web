import React from 'react';
import _ from 'lodash';

const EditCustomer = (props) => {
    return (
        <div>
            <div>Test</div>
            <div>{_.get(props.customer, 'name') ? _.get(props.customer, 'name') : ""}</div>
            <div>{!!props.customer ? props.customer.birthday : ""}</div>
            <div>{!!props.customer ? props.customer.gender : ""}</div>
            <div>{_.get(props.customer,'email.email') ? props.customer.email.email : ""}</div>
            {
                !!props.customer ? props.customer.phones.map(phone => (
                    <div>{phone.alias} {phone.phone}</div>
                )) : ""
            }

            {
                !!props.customer ? props.customer.addresses.map(address => (
                    <div>{address.address} {address.city} {address.dist}</div>
                )) : ""
            }
        </div>
    )
}

export default EditCustomer