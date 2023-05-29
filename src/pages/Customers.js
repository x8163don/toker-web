import React, {useState} from "react";
import CustomersList from "../components/customers/CustomersList";
import CustomersHeader from "../components/customers/CustomersHeader";
import AddNewCustomerModel from "../components/customers/AddNewCustomerModel";
import axios from "axios";
import {Modal} from "flowbite-react";

function CustomersPage() {

    const [isShowNewCustomerModel, setIsShowNewCustomerModel] = useState(false);

    const saveCustomerHandler = (enteredCustomerData) => {
        axios.post("/customer", enteredCustomerData)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="w-full">
            <CustomersHeader onClick={() => setIsShowNewCustomerModel(!isShowNewCustomerModel)}/>
            <CustomersList/>

            <Modal
                show={isShowNewCustomerModel}
                onClose={() => setIsShowNewCustomerModel(false)}
            >
                <Modal.Header>新增客戶</Modal.Header>
                <Modal.Body>
                    <AddNewCustomerModel
                        onSaveCustomer={saveCustomerHandler}
                        onClose={() => setIsShowNewCustomerModel(false)}
                    />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default CustomersPage