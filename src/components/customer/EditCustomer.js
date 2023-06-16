import React, {Fragment} from 'react';
import _ from 'lodash';
import {Button, Select, Spinner} from "flowbite-react";
import {getCities, getDistricts} from "../../data/address";
import {HiPlus} from "react-icons/hi";
import {phoneAliases, addressAliases} from "../../contants/Aliases";

const EditCustomer = (props) => {

    const getDistrictsOptions = (city) => {
        return getDistricts(city).map(dist => <option
                value={dist}
            >{dist}</option>
        )
    }

    return (
        <Fragment>
            <label className="text-sm font-medium text-gray-900 block mb-2">客戶名稱</label>
            <input type="text"
                   className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 mb-4"
                   value={_.get(props.customer, 'name')}
                   onChange={(e) => {
                       props.onNameChange(e.target.value)
                   }}
            />

            <label className="text-sm font-medium text-gray-900 block mb-2">生日</label>
            <input type="date"
                   className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 mb-4"
                   value={function () {
                       try {
                           const date = new Date(parseInt(props.customer.birthday, 10))
                           return date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, "0") + "-" + date.getDate().toString().padStart(2, "0")
                       } catch (e) {
                           return ""
                       }
                   }()}
                   onChange={(e) => {
                       const timestamp = new Date(e.target.value).getTime()
                       props.onBirthdayChange(timestamp)
                   }}
            />

            <label className="text-sm font-medium text-gray-900 block mb-2">性別</label>
            <div className="col-span-6 sm:col-span-3 mb-4">
                <Button.Group>
                    <Button gradientDuoTone={props.customer.gender === "Male" ? "cyanToBlue" : ""}
                            color="gray"
                            onClick={() => props.onGenderChange("Male")}>
                        男
                    </Button>
                    <Button
                        gradientDuoTone={props.customer.gender === "Female" ? "pinkToOrange" : ""}
                        color="gray"
                        onClick={() => props.onGenderChange("Female")}>
                        女
                    </Button>
                </Button.Group>
            </div>

            <label className="text-sm font-medium text-gray-900 block mb-2">Email</label>
            <input type="text"
                   className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 mb-4"
                   value={_.get(props.customer, 'email.email')}
                   onChange={(e) => {
                       props.onEmailChange(e.target.value)
                   }}
            />

            <label className="text-sm font-medium text-gray-900 block mb-2">手機</label>
            {
                _.get(props.customer, "phones", []).map((phone, index) => (
                    <div className="flex flex-row mb-2">
                        <Select
                            id={"phone-alias-" + index}
                            key={"phone-alias-" + index}
                            className="w-36"
                            label={phone.alias}>
                            {
                                phoneAliases.map((alias) => <option
                                    onClick={() => {
                                        props.onPhoneAliasChange(alias, index)
                                    }}>{alias}</option>)
                            }
                        </Select>

                        <input
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full ml-2"
                            type="text" value={phone.phone}
                            onChange={(e) => {
                                props.onPhoneChange(e.target.value, index)
                            }}
                        />
                    </div>
                ))
            }
            <HiPlus className="cursor-pointer mb-4" onClick={() => {
                props.onAddPhone()
            }}/>


            <label className="text-sm font-medium text-gray-900 block mb-2">地址</label>
            {
                _.get(props.customer, "addresses", []).map((address, index) => (
                    <div className="flex flex-row mb-4">
                        <Select
                            id={"address-alias-" + index}
                            name={"address-alias-" + index}
                            className="w-24 ml-2"
                            label={address.alias}
                            onChange={(e) => {
                                props.onAddressAliasChange(e.target.alias, index)
                            }}
                        >
                            {
                                addressAliases.map(alias => <option>{alias}</option>)
                            }
                        </Select>

                        <Select
                            id={"address-city-" + index}
                            name={"address-city-" + index}
                            className="w-24 ml-2"
                            value={address.city}
                            onChange={(e) => {
                                props.onCityChange(e.target.value, index)
                            }}
                        >
                            {
                                getCities().map(city => <option value={city}>{city}</option>)
                            }
                        </Select>

                        <Select
                            id={"address-district-" + index}
                            name={"address-district-" + index}
                            value={address.district}
                            className="w-24 ml-2"
                            onChange={(e) => {
                                props.onDistrictChange(e.target.value, index)
                            }}
                        >
                            {getDistrictsOptions(address.city)}
                        </Select>

                        <input type="text"
                               className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-60 ml-2"
                               value={address.road}
                               onChange={(e) => {
                                   props.onRoadChange(e.target.value, index)
                               }}
                        />
                    </div>
                ))
            }
            <HiPlus className="cursor-pointer mb-4" onClick={() => {
                props.onAddAddress()
            }}/>

            <div className="flex flex-row-reverse">
                <Button
                    color="success"
                    disabled={props.isSaving}
                    onClick={() => {
                        props.onSave()
                    }}>
                    {props.isSaving && <Spinner/>}
                    <span className={props.isSaving ? "ml-2" : ""}>
                        {props.isSaving ? "處理中" : "儲存"}
                    </span>
                </Button>
            </div>
        </Fragment>
    )
}

export default EditCustomer