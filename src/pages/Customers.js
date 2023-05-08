import CustomersList from "../components/CustomersList";
import CustomersHeader from "../components/CustomersHeader";

function CustomersPage() {
    return (
        <div className="w-full">
            <CustomersHeader/>
            <CustomersList/>
        </div>
    )
}

export default CustomersPage