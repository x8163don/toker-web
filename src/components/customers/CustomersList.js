import React from 'react';
import {Table} from 'flowbite-react';
import {HiOutlineTrash} from "react-icons/hi";
import {Link} from "react-router-dom";

const CustomersList = (props) => {
    return <Table striped hoverable>
        <Table.Head>
            <Table.HeadCell>
                姓名
            </Table.HeadCell>
            <Table.HeadCell>
                電話
            </Table.HeadCell>
            <Table.HeadCell>
                操作
            </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
            {
                props.customers.map(customer => (
                    <Table.Row key={customer.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {customer.name}
                        </Table.Cell>
                        <Table.Cell>
                            {customer.phones.length > 0 ?
                                <a className="cursor-pointer font-medium hover:underline"
                                   href={`tel:` + customer.phones[0].phone}>{customer.phones[0].phone}</a> : ""}
                        </Table.Cell>
                        <Table.Cell>
                            <div className="inline-block">
                                <Link
                                    className="font-medium cursor-pointer text-cyan-600 hover:underline dark:text-cyan-500"
                                    to={`/customers/${customer.id}`}
                                >
                                    編輯
                                </Link>
                            </div>
                            <div className="ml-4 inline-block">
                                    <span
                                        className="font-medium cursor-pointer text-red-600 hover:underline dark:text-red-500"
                                        onClick={() => {
                                            props.onDeleteCustomer(customer.id);
                                        }}
                                    >
                                        <HiOutlineTrash/>
                                    </span>
                            </div>
                        </Table.Cell>
                    </Table.Row>
                ))
            }
        </Table.Body>
    </Table>
}

export default CustomersList;
