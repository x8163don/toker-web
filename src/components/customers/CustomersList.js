import React, { useContext } from "react";
import CustomerCard from "./CustomerCard";
import {
  addTag as addTagToCustomer,
  changeTag,
  removeTag,
} from "../../data/customer/Customer";
import { TagContext } from "../../store/TagContext";

const CustomersList = (props) => {
  const tagContext = useContext(TagContext);

  const onTagChangeHandler = async (customerId, oldId, newId) => {
    await changeTag(customerId, oldId, newId);
  };

  const onTagRemoveHandler = async (customerId, tagId) => {
    await removeTag(customerId, tagId);
  };

  const onAddNewTagHandler = async (customerId, name) => {
    const newTagId = await tagContext.onAddTag(name);
    await addTagToCustomer(customerId, newTagId);
  };

  return (
    <div className="w-2/3">
      {props.customers.length > 0 &&
        props.customers.map((customer) => (
          <CustomerCard
            key={customer.id}
            customer={customer}
            onTagChange={(oldId, newId) => {
              onTagChangeHandler(customer.id, oldId, newId).then((r) =>
                props.onCustomerChange(customer.id)
              );
            }}
            onTagRemove={(tagId) => {
              onTagRemoveHandler(customer.id, tagId).then((r) =>
                props.onCustomerChange(customer.id)
              );
            }}
            onAddNewTag={(name) =>
              onAddNewTagHandler(customer.id, name).then((r) =>
                props.onCustomerChange(customer.id)
              )
            }
          />
        ))}
    </div>
  );
};

export default CustomersList;
