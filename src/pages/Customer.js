import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCustomer, updateCustomer } from "../data/customer/Customer";
import EditCustomer from "../components/customer/EditCustomer";
import { Tabs } from "flowbite-react";
import ContactHistory from "../components/customer/ContactHistory";
import {
  deleteContactHistory,
  getContactHistory,
  listContactHistories,
} from "../data/customer/ContactHistory";

const Customer = () => {
  const params = useParams();
  const userId = params.id;
  const [customer, setCustomer] = useState({});
  const [contactHistories, setContactHistories] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getCustomer(userId)
      .then((r) => {
        setCustomer(r);
      })
      .catch((e) => {
        console.log(e);
      });

    listContactHistories(userId)
      .then((r) => {
        setContactHistories(r.contact_histories);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [userId]);

  const customerSaveHandler = async (customerData) => {
    try {
      setIsSaving(true);
      await updateCustomer(customerData);
      const r = await getCustomer(customer.id);
      setCustomer(r);
    } catch (e) {
      console.log(e);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Tabs.Group>
      <Tabs.Item title={customer.name}>
        <EditCustomer
          customer={customer}
          onSave={customerSaveHandler}
          isSaving={isSaving}
        ></EditCustomer>
      </Tabs.Item>

      <Tabs.Item title="歷程">
        <ContactHistory
          customer={customer}
          contactHistories={contactHistories}
          onContactHistoryAdded={(contactHistoryId) => {
            getContactHistory(userId, contactHistoryId).then((r) => {
              setContactHistories((prev) => {
                return [r, ...prev];
              });
            });
          }}
          onContactHistoryDeleted={(contactHistoryId) => {
            deleteContactHistory(userId, contactHistoryId).then(() => {
              setContactHistories((prev) => {
                return prev.filter(
                  (history) => history.id !== contactHistoryId
                );
              });
            });
          }}
        />
      </Tabs.Item>
    </Tabs.Group>
  );
};

export default Customer;
