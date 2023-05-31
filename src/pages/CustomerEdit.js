import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getCustomer} from "../data/customer/customer";
import EditCustomer from "../components/customer/EditCustomer";

const CustomerEdit = () => {
    const params = useParams()
    const userId = params.id
    const [customer, setCustomer] = useState(null)

    useEffect(() => {
        getCustomer(userId).then(r => {
            setCustomer(r)
        }).catch(e => {
            console.log(e)
        })
    })

    return (
        <div>
            <EditCustomer customer={customer}/>
        </div>
    )
}

export default CustomerEdit