import React, {useState} from "react";
import CustomersList from "../components/customers/CustomersList";
import CustomersHeader from "../components/customers/CustomersHeader";
import AddNewCustomerModel from "../components/customers/AddNewCustomerModel";
import axios from "axios";

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
            <AddNewCustomerModel
                isShow={isShowNewCustomerModel}
                onModelClose={() => setIsShowNewCustomerModel(false)}
                onSaveCustomer={saveCustomerHandler}
            />
        </div>
    )
}

export default CustomersPage