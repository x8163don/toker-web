import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getCustomer} from "../data/customer/customer";
import EditCustomer from "../components/customer/EditCustomer";
import {Tabs} from "flowbite-react";

const CustomerEdit = () => {
    const params = useParams()
    const userId = params.id
    const [customer, setCustomer] = useState({})

    useEffect(() => {
        getCustomer(userId).then(r => {
            setCustomer(r)
        }).catch(e => {
            console.log(e)
        })
    },[])

    return (
        <Tabs.Group style="default">
            <Tabs.Item title={customer.name}>
                <EditCustomer customer={customer}/>
            </Tabs.Item>
            <Tabs.Item title="歷程">

            </Tabs.Item>
        </Tabs.Group>
    )
}

export default CustomerEdit