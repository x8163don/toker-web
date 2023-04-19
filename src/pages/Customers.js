import CustomersList from "../components/CustomersList";
import CustomersHeader from "../components/CustomersHeader";
import {useState} from "react";

function CustomersPage() {
    return (
        <div className="w-full">
            <CustomersHeader/>
            <CustomersList/>
        </div>
    )
}

export default CustomersPage