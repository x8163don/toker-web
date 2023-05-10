import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fakeCustomers = [
            { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123456789' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987654321' },
        ];

        setCustomers(fakeCustomers);
    }, []);

    const data = React.useMemo(
        () =>
            customers.map((customer) => ({
                ...customer,
                action: (
                    <button type="button" onClick={() => handleEdit(customer.id)}>
                        編輯
                    </button>
                ),
            })),
        [customers]
    );

    const columns = React.useMemo(
        () => [
            {
                Header: '姓名',
                accessor: 'name',
            },
            {
                Header: '',
                accessor: 'avatar',
            },
            {
                Header: '電子郵件',
                accessor: 'email',
            },
            {
                Header: '電話',
                accessor: 'phone',
            },
            {
                Header: '操作',
                accessor: 'action',
            },
        ],
        []
    );

    const tableInstance = useTable({ columns, data });

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

    const handleEdit = (id) => {
        // 在這裡實作編輯客戶的功能，例如彈出編輯視窗等等
        // ...
    };

    return (
        <table className="table-fixed min-w-full divide-y divide-gray-200" {...getTableProps()}>
            <thead className="bg-gray-100">
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                        <th scope="col" className="p-4 text-left text-xs font-medium text-gray-500 uppercase" {...column.getHeaderProps()}>{column.render('Header')}</th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200" {...getTableBodyProps()}>
            {rows.map((row, i) => {
                prepareRow(row);
                return (
                    <tr className="hover:bg-gray-100" {...row.getRowProps()}>
                        {row.cells.map(cell => (
                            <td className="p-4 w-4 text-base font-semibold text-gray-900" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        ))}
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
}

export default CustomerList;
