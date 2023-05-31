import React, {useEffect, useState} from 'react';
import _ from 'lodash';
import {Select} from "flowbite-react";
import {getCities, getDistricts} from "../../data/address";

const EditCustomer = (props) => {

    const [birthday, setBirthday] = useState("")

    useEffect(() => {
        if (_.get(props.customer, "birthday")) {
            const date = new Date(parseInt(props.customer.birthday, 10))
            setBirthday(date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2,"0") + "-" + date.getDate().toString().padStart(2,"0"))
        }
    }, [])


    return (
        <div>
            <label className="text-sm font-medium text-gray-900 block mb-2">客戶名稱</label>
            <input type="text"
                   className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                   value={_.get(props.customer, 'name')}/>

            <label className="text-sm font-medium text-gray-900 block mb-2">生日</label>
            <input type="date"
                   className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                   value={birthday}
            />

            <label className="text-sm font-medium text-gray-900 block mb-2">性別</label>
            <input type="text"
                   className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                   value={_.get(props.customer, 'gender')}/>

            <label className="text-sm font-medium text-gray-900 block mb-2">Email</label>
            <input type="text"
                   className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                   value={_.get(props.customer, 'email.email')}/>

            <label className="text-sm font-medium text-gray-900 block mb-2">手機</label>
            {
                _.get(props.customer, "phones", []).map(phone => (
                    <div>
                        <input
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                            type="text" value={phone.alias}/>
                        <input
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                            type="text" value={phone.phone}/>
                    </div>
                ))
            }

            <label className="text-sm font-medium text-gray-900 block mb-2">地址</label>
            {
                _.get(props.customer, "addresses", []).map(address => (
                    <div>
                        <input type="text"
                               className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                               value={address.alias}/>


                        <Select
                            id="city"
                            name="city"
                            value={address.city}
                            required
                        >
                            {getCities().map(city => (
                                <option value={city}>{city}</option>
                            ))}
                        </Select>

                        <Select
                            id="district"
                            name="district"
                            value={address.district}
                            required
                            onChange={(e) => {

                            }}
                        >
                            {getDistricts(address.city).map(dist => (
                                <option value={dist}>{dist}</option>
                            ))}
                        </Select>

                        <input type="text"
                               className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                               value={address.road}/>
                    </div>
                ))
            }
        </div>
    )
}

export default EditCustomer