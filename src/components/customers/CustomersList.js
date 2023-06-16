import React from 'react';
import CustomerCard from "./CustomerCard";

const CustomersList = (props) => {
    return <div className="w-2/3">
        {
            props.customers.length > 0 && props.customers.map(customer => (
                <CustomerCard
                    key={customer.id}
                    customer={customer}
                />
            ))
        }
    </div>
}

export default CustomersList;
