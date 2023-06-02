import React, {useState} from 'react'
import {Button, Dropdown} from 'flowbite-react';
import {HiTrash, HiPlus} from "react-icons/hi";
import {getCities, getDistricts} from "../../data/address";
import {addCustomer} from "../../data/customer/Customer";
import {phoneAliases, addressAliases} from "../../contants/Aliases";

const AddNewCustomerModel = (props) => {
    const [name, setName] = useState("")
    const [gender, setGender] = useState("Male")
    const [birthday, setBirthday] = useState("")
    const [emails, setEmail] = useState([{alias: "main", email: ""}])
    const [phones, setPhones] = useState([{alias: phoneAliases[0], phone: ""}])
    const [addresses, setAddresses] = useState([{alias: addressAliases[0], city: "", district: "", road: ""}])

    const addPhoneHandler = () => {
        setPhones((prevState) => {
            const selectedAlias = prevState.map(phone => phone.alias)
            const diff = phoneAliases.filter(alias => !selectedAlias.includes(alias))
            const nextAlias = diff.length > 0 ? diff[0] : phoneAliases[0]
            return [...prevState, {alias: nextAlias, phone: ""}]
        })
    }

    const changePhoneAliasHandler = (alias, i) => {
        setPhones((prevState) => {
            const nextState = [...prevState]
            nextState[i].alias = alias
            return nextState
        })
    }

    const changePhoneHandler = (i, number) => {
        setPhones((prevState) => {
            const nextState = [...prevState]
            nextState[i].phone = number
            return nextState
        })
    }

    const deletePhoneHandler = (index) => {
        setPhones((prevState) => {
            const nextState = [...prevState]
            nextState.splice(index, 1)
            return nextState
        })
    }

    const addAddressHandler = () => {
        setAddresses((prevState) => {
            const selectedAlias = prevState.map(address => address.alias)
            const diff = addressAliases.filter(alias => !selectedAlias.includes(alias))
            const nextAlias = diff.length > 0 ? diff[0] : addressAliases[0]
            return [...prevState, {alias: nextAlias, city: "", district: "", road: ""}]
        })
    }

    const deleteAddressHandler = (index) => {
        setAddresses((prevState) => {
            const nextState = [...prevState]
            nextState.splice(index, 1)
            return nextState
        })
    }

    const changeAddressAliasHandler = (alias, i) => {
        setAddresses((prevState) => {
            const nextState = [...prevState]
            nextState[i].alias = alias
            return nextState
        })
    }


    const changeCityHandler = (city, index) => {
        setAddresses((prevState) => {
            const nextState = [...prevState]
            nextState[index].city = city
            return nextState
        })
    }

    const changeDistrictHandler = (dist, index) => {
        setAddresses((prevState) => {
            const nextState = [...prevState]
            nextState[index].district = dist
            return nextState
        })
    }

    const changeAddressHandler = (address, index) => {
        setAddresses((prevState) => {
            const nextState = [...prevState]
            nextState[index].road = address
            return nextState
        })
    }

    const addNewCustomerHandler = () => {
        let newCustomerData = {
            name: name,
            gender: gender,
        }

        if (emails.length > 0) {
            newCustomerData.emails = emails
        }

        if (birthday !== "") {
            newCustomerData.birthday = new Date(birthday).getTime() / 1000
        }

        const nonEmptyPhone = phones.filter(phone => phone.phone !== "")
        if (nonEmptyPhone.length > 0) {
            newCustomerData.phones = nonEmptyPhone
        }

        const nonEmptyAddress = addresses.filter(address => address.road !== "" && address.city !== "" && address.district !== "")
        if (nonEmptyAddress.length > 0) {
            newCustomerData.addresses = nonEmptyAddress
        }


        addCustomer(newCustomerData)
            .then(r => {
                setName("")
                setGender("Male")
                setBirthday("")
                setEmail([{alias: "main", email: ""}])
                setPhones([{alias: phoneAliases[0], phone: ""}])
                setAddresses([{alias: addressAliases[0], city: "", district: "", road: ""}])
                props.onSaveCustomer()
                props.onClose()
            })
    }
    return (
        <div className="p-6 space-y-6">
            <form>
                <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="name"
                               className="text-sm font-medium text-gray-900 block mb-2">姓名</label>
                        <input type="text" name="name" id="name"
                               className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                               placeholder="客戶姓名"
                               onChange={(e) => {
                                   setName(e.target.value)
                               }}
                               value={name}
                        />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="gender"
                               className="text-sm font-medium text-gray-900 block mb-2">性別</label>
                        <Button.Group>
                            <Button gradientDuoTone={gender === "Male" ? "cyanToBlue" : ""}
                                    color="gray"
                                    onClick={() => setGender("Male")}>
                                男
                            </Button>
                            <Button
                                gradientDuoTone={gender === "Female" ? "pinkToOrange" : ""}
                                color="gray"
                                onClick={() => setGender("Female")}>
                                女
                            </Button>
                        </Button.Group>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="birthday"
                               className="text-sm font-medium text-gray-900 block mb-2">生日</label>
                        <input type="date"
                               className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                               id="birthday" name="birthday" placeholder="2000/01/01"
                               onChange={(event) => setBirthday(event.target.value)}
                               value={birthday}
                        />

                    </div>
                    <div className="col-span-6 sm:col-span-3">
                        <label htmlFor="email"
                               className="text-sm font-medium text-gray-900 block mb-2">Email</label>
                        <input type="email" name="email" id="email"
                               className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                               placeholder="example@company.com"
                               value={emails[0].email}
                               onChange={(e) => {
                                   setEmail(prevState => {
                                       prevState[0].email = e.target.value
                                       return [...prevState]
                                   })
                               }}
                        />
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                        <label htmlFor="phone-number"
                               className="text-sm font-medium text-gray-900 block mb-2">電話
                        </label>


                        {
                            phones.map((phone, index) => (
                                <div className="flex flex-row mb-2">
                                    <Dropdown
                                        id={"phone-alias-" + index}
                                        key={"phone-alias-" + index}
                                        label={phone.alias}>
                                        {
                                            phoneAliases.map((alias) => <Dropdown.Item
                                                onClick={() => {
                                                    changePhoneAliasHandler(alias, index)
                                                }}>{alias}</Dropdown.Item>)
                                        }
                                    </Dropdown>
                                    <input type="tel" name="phone-number" id="phone-number"
                                           className="ml-2 mr-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                           value={phone.phone}
                                           onChange={(e) => {
                                               changePhoneHandler(index, e.target.value)
                                           }}
                                    />
                                    <Button color="failure"
                                            onClick={() => deletePhoneHandler(index)}><HiTrash/></Button>
                                </div>
                            ))
                        }

                        <Button onClick={addPhoneHandler} className="mt-2 "><HiPlus></HiPlus></Button>
                    </div>

                    <div className="col-span-6 sm:col-span-6">
                        <label htmlFor="home-address"
                               className="text-sm font-medium text-gray-900 block mb-2">地址</label>

                        {
                            addresses.map((address, index) => (


                                <div className="flex flex-row mb-2">

                                    <Dropdown
                                        id={"address-alias-" + index}
                                        key={"address-alias-" + index}
                                        label={address.alias}>
                                        {
                                            addressAliases.map((alias) => <Dropdown.Item
                                                onClick={() => {
                                                    changeAddressAliasHandler(alias, index)
                                                }}>{alias}</Dropdown.Item>)
                                        }
                                    </Dropdown>

                                    <input type="text"
                                           name="city"
                                           className="ml-2 mr-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-24 p-2.5"
                                           list="city-list"
                                           placeholder="城市"
                                           value={address.city}
                                           onChange={(e) => {
                                               changeCityHandler(e.target.value, index)
                                           }}
                                    />
                                    <datalist id="city-list">
                                        {
                                            getCities().map((city) => <option value={city}></option>)
                                        }
                                    </datalist>

                                    <input type="text"
                                           name="dist"
                                           className="ml-2 mr-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-24 p-2.5"
                                           list="dist-list"
                                           placeholder="地區"
                                           value={address.district}
                                           onChange={(e) => {
                                               changeDistrictHandler(e.target.value, index)
                                           }}
                                    />

                                    <datalist id="dist-list">
                                        {
                                            getDistricts(addresses[index].city).map((dist) => <option
                                                value={dist}></option>)
                                        }
                                    </datalist>

                                    <input type="text"
                                           placeholder="街道, 巷弄, 門號, 樓層"
                                           className="ml-2 mr-2 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                           value={address.road}
                                           onChange={(e) => {
                                               changeAddressHandler(e.target.value, index)
                                           }}
                                    />

                                    <Button color="failure"
                                            onClick={() => deleteAddressHandler(index)}><HiTrash/></Button>
                                </div>
                            ))
                        }
                        <Button onClick={addAddressHandler} className="mt-2 "><HiPlus></HiPlus></Button>
                    </div>
                </div>

                <div className="flex flex-row mt-8">
                    <Button onClick={addNewCustomerHandler}>新增</Button>
                    <Button color="gray">取消</Button>
                </div>
            </form>
        </div>
    )
}


export default AddNewCustomerModel