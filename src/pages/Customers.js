import React, { useEffect, useState } from "react";
import CustomersList from "../components/customers/CustomersList";
import CustomersHeader from "../components/customers/CustomersHeader";
import AddNewCustomerModel from "../components/customers/AddNewCustomerModel";
import { deleteCustomer, searchCustomers } from "../data/customer/Customer";
import { Button, Modal, Pagination } from "flowbite-react";
import SearchFilter from "../components/customers/SearchFilter";
import { TagContextProvider } from "../store/TagContext";

function CustomersPage() {
  const [isShowNewCustomerModel, setIsShowNewCustomerModel] = useState(false);
  const [customers, setCustomers] = useState([]);

  const [isShowDeleteCustomerModel, setIsShowDeleteCustomerModel] =
    useState(false);
  const [targetCustomer, setTargetCustomer] = useState({});

  const [filter, setFilter] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    searchCustomers(filter).then((r) => {
      setCustomers(r.customers);
      setCurrentPage(r.paginate.page);
      setTotalPage(r.paginate.total_page);
    });
  }, []);

  const onSaveCustomerHandler = () => {
    searchCustomers(filter).then((r) => {
      setCustomers(r.customers);
      setCurrentPage(r.paginate.page);
      setTotalPage(r.paginate.total_page);
    });
  };

  const onPageChangeHandler = (page) => {
    searchCustomers({ ...filter, page }).then((r) => {
      setCustomers(r.customers);
      setCurrentPage(r.paginate.page);
      setTotalPage(r.paginate.total_page);
    });
  };

  const onApplyFilterHandler = (filter) => {
    setFilter(filter);
    searchCustomers(filter).then((r) => {
      setCustomers(r.customers);
      setCurrentPage(r.paginate.page);
      setTotalPage(r.paginate.total_page);
    });
  };

  const onCustomerChange = () => {
    searchCustomers({ ...filter, page: currentPage }).then((r) => {
      setCustomers(r.customers);
      setCurrentPage(r.paginate.page);
      setTotalPage(r.paginate.total_page);
    });
  };

  return (
    <div className="w-full flex flex-row">
      <TagContextProvider>
        <SearchFilter onApplyFilter={onApplyFilterHandler} />

        <div className="w-full flex flex-col ml-12">
          <CustomersHeader
            onClick={() => setIsShowNewCustomerModel(!isShowNewCustomerModel)}
          />

          <CustomersList
            customers={customers}
            onDeleteCustomer={(id) => {
              setTargetCustomer(customers.find((c) => c.id === id));
              setIsShowDeleteCustomerModel(true);
            }}
            onCustomerChange={(id) => {
              onCustomerChange(id);
            }}
          />

          <Pagination
            layout="pagination"
            showIcons
            currentPage={currentPage}
            totalPages={totalPage}
            onPageChange={onPageChangeHandler}
            previousLabel=""
            nextLabel=""
          />
        </div>
      </TagContextProvider>

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
          setIsShowDeleteCustomerModel(false);
        }}
        popup
        show={isShowDeleteCustomerModel}
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              <p>
                確定要刪除{targetCustomer.name}
                的紀錄嗎？這會將其所有相關的資訊都一併刪除。
              </p>
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  setIsShowDeleteCustomerModel(false);
                  if (!targetCustomer.id) {
                    return;
                  }
                  deleteCustomer(targetCustomer.id).then((r) => {
                    setCustomers((prevState) => {
                      return prevState.filter((c) => c.id !== r.id);
                    });
                  });
                }}
              >
                確認
              </Button>
              <Button
                color="gray"
                onClick={() => {
                  setIsShowDeleteCustomerModel(false);
                }}
              >
                <p>取消</p>
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CustomersPage;
