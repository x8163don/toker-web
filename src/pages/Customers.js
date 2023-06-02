import React, {useEffect, useState} from "react";
import CustomersList from "../components/customers/CustomersList";
import CustomersHeader from "../components/customers/CustomersHeader";
import AddNewCustomerModel from "../components/customers/AddNewCustomerModel";
import {deleteCustomer, getCustomers} from "../data/customer/Customer";
import {Modal} from "flowbite-react";

function CustomersPage() {

    const [isShowNewCustomerModel, setIsShowNewCustomerModel] = useState(false);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        getCustomers().then(r => {
            setCustomers(r.customers);
        })
    }, [])

    const onSaveCustomerHandler = () => {
        getCustomers().then(r => {
            setCustomers(r.customers);
        })
    }

    function deleteCustomerHandler(id) {
        deleteCustomer(id).then(r => {
            setCustomers(prevState => {
                return prevState.filter(c => c.id !== id);
            })
        })
    }

    return (
        <div className="w-full">
            <CustomersHeader onClick={() => setIsShowNewCustomerModel(!isShowNewCustomerModel)}/>

            <CustomersList customers={customers}
                           onDeleteCustomer={deleteCustomerHandler}/>

            <Modal
                show={isShowNewCustomerModel}
                onClose={() => setIsShowNewCustomerModel(false)}
            >
                <Modal.Header>新增客戶</Modal.Header>
                <Modal.Body>
                    <AddNewCustomerModel
                        key="new-customer"
                        onSaveCustomer={onSaveCustomerHandler}
                        onClose={() => setIsShowNewCustomerModel(false)}
                    />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default CustomersPage