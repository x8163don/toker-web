import React, {useEffect, useState} from "react";
import CustomersList from "../components/customers/CustomersList";
import CustomersHeader from "../components/customers/CustomersHeader";
import AddNewCustomerModel from "../components/customers/AddNewCustomerModel";
import {deleteCustomer, getCustomers} from "../data/customer/Customer";
import {Button, Modal} from "flowbite-react";
import CustomerCard from "../components/customers/CustomerCard";

function CustomersPage() {

    const [isShowNewCustomerModel, setIsShowNewCustomerModel] = useState(false);
    const [customers, setCustomers] = useState([]);

    const [isShowDeleteCustomerModel, setIsShowDeleteCustomerModel] = useState(false);
    const [targetCustomer, setTargetCustomer] = useState({});

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

    return (
        <div className="w-full flex flex-col items-center">
            <CustomersHeader onClick={() => setIsShowNewCustomerModel(!isShowNewCustomerModel)}/>

            <CustomersList customers={customers}
                           onDeleteCustomer={(id) => {
                               setTargetCustomer(customers.find(c => c.id === id))
                               setIsShowDeleteCustomerModel(true)
                           }}/>

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

            <Modal
                onClose={() => {
                    setIsShowDeleteCustomerModel(false)
                }}
                popup
                show={isShowDeleteCustomerModel}
                size="md"
            >
                <Modal.Header/>
                <Modal.Body>
                    <div className="text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            <p>
                                確定要刪除{targetCustomer.name}的紀錄嗎？這會將其所有相關的資訊都一併刪除。
                            </p>
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button
                                color="failure"
                                onClick={() => {
                                    setIsShowDeleteCustomerModel(false)
                                    if (!targetCustomer.id) {
                                        return
                                    }
                                    deleteCustomer(targetCustomer.id).then(r => {
                                        setCustomers(prevState => {
                                            return prevState.filter(c => c.id !== r.id);
                                        })
                                    })
                                }}
                            >
                                確認
                            </Button>
                            <Button
                                color="gray"
                                onClick={() => {
                                    setIsShowDeleteCustomerModel(false)
                                }}
                            >
                                <p>
                                    取消
                                </p>
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default CustomersPage