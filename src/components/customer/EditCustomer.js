import React, {useEffect, useState} from 'react';
import _ from "lodash";
import {Button, Label, Select, Spinner, TextInput} from "flowbite-react";
import {getCities, getDistricts} from "../../data/address";
import {HiHome, HiMail, HiOfficeBuilding, HiPhone, HiUser} from "react-icons/hi";
import {Gender, GENDER_LABEL} from "../../contants/Gender";
import {Address, Phone} from "../../contants/Aliases";

const EditCustomer = (props) => {

    const {customer} = props

    const [name, setName] = React.useState("")
    const [gender, setGender] = React.useState("")
    const [birthday, setBirthday] = React.useState("")
    const [email, setEmail] = React.useState("")
    const [homeNumber, setHomeNumber] = React.useState("")
    const [cellPhone, setCellPhone] = React.useState("")
    const [workNumber, setWorkNumber] = React.useState("")

    const [homeCity, setHomeCity] = React.useState("")
    const [homeDistOptions, setHomeDistOptions] = React.useState([])
    const [homeDistrict, setHomeDistrict] = React.useState("")
    const [homeRoad, setHomeRoad] = React.useState("")

    const [companyCity, setCompanyCity] = React.useState("")
    const [companyDistOptions, setCompanyDistOptions] = useState([])
    const [companyDistrict, setCompanyDistrict] = React.useState("")
    const [companyRoad, setCompanyRoad] = React.useState("")


    useEffect(() => {
        if (_.isEmpty(customer)) {
            return
        }
        setName(customer.name)
        setGender(customer.gender)
        setEmail(customer.email)

        if (customer.birthday) {
            const date = new Date(+customer.birthday)
            setBirthday(date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2, "0") + "-" + date.getDate().toString().padStart(2, "0"))
        }

        const homeNumber = customer.phones.find(p => p.alias === Phone.HOME)
        if (homeNumber) {
            setHomeNumber(homeNumber.phone)
        }

        const mobileNumber = customer.phones.find(p => p.alias === Phone.MOBILE)
        if (mobileNumber) {
            setCellPhone(mobileNumber.phone)
        }

        const companyNumber = customer.phones.find(p => p.alias === Phone.COMPANY)
        if (companyNumber) {
            setWorkNumber(companyNumber.phone)
        }

        const homeAddress = customer.addresses.find(a => a.alias === Address.HOME)
        if (homeAddress) {
            setHomeCity(homeAddress.city)
            setHomeDistrict(homeAddress.district)
            setHomeRoad(homeAddress.road)
            setHomeDistOptions(getDistricts(homeAddress.city))
        }

        const companyAddress = customer.addresses.find(a => a.alias === Address.COMPANY)
        if (companyAddress) {
            setCompanyCity(companyAddress.city)
            setCompanyDistrict(companyAddress.district)
            setCompanyRoad(companyAddress.road)
            setCompanyDistOptions(getDistricts(companyAddress.city))
        }
    }, [customer])

    useEffect(() => {
        const districts = getDistricts(homeCity)
        setHomeDistOptions(districts)
        setHomeDistrict(districts[0])
    }, [homeCity])

    useEffect(() => {
        const districts = getDistricts(companyCity)
        setCompanyDistOptions(districts)
        setCompanyDistrict(districts[0])
    }, [companyCity])

    const saveHandler = () => {
        const updatedCustomer = {
            id: customer.id,
            name: name,
            gender: gender,
            email: email,
            phones: [],
            addresses: [],
        }

        if (birthday !== "") {
            updatedCustomer.birthday = new Date(birthday).getTime()
        }

        if (cellPhone !== "") {
            const oldRecord = customer.phones.find(p => p.alias === Phone.MOBILE)
            if (oldRecord) {
                updatedCustomer.phones.push({id: oldRecord.id, alias: Phone.MOBILE, phone: cellPhone})
            } else {
                updatedCustomer.phones.push({alias: Phone.MOBILE, phone: cellPhone})
            }
        }

        if (workNumber !== "") {
            const oldRecord = customer.phones.find(p => p.alias === Phone.COMPANY)
            if (oldRecord) {
                updatedCustomer.phones.push({id: oldRecord.id, alias: Phone.COMPANY, phone: workNumber})
            } else {
                updatedCustomer.phones.push({alias: Phone.COMPANY, phone: workNumber})
            }
        }

        if (homeNumber !== "") {
            const oldRecord = customer.phones.find(p => p.alias === Phone.HOME)
            if (oldRecord) {
                updatedCustomer.phones.push({id: oldRecord.id, alias: Phone.HOME, phone: homeNumber})
            } else {
                updatedCustomer.phones.push({alias: Phone.HOME, phone: homeNumber})
            }
        }

        if (homeCity !== "" && homeDistrict !== "" && homeRoad !== "") {
            const oldRecord = customer.addresses.find(p => p.alias === Address.HOME)
            if (oldRecord) {
                updatedCustomer.addresses.push({
                    id: oldRecord.id,
                    alias: Address.HOME,
                    city: homeCity,
                    district: homeDistrict,
                    road: homeRoad
                })
            } else {
                updatedCustomer.addresses.push({
                    alias: Address.HOME,
                    city: homeCity,
                    district: homeDistrict,
                    road: homeRoad
                })
            }
        }

        if (companyCity !== "" && companyDistrict !== "" && companyRoad !== "") {
            const oldRecord = customer.addresses.find(p => p.alias === Address.COMPANY)
            if (oldRecord) {
                updatedCustomer.addresses.push({
                    id: oldRecord.id,
                    alias: Address.COMPANY,
                    city: companyCity,
                    district: companyDistrict,
                    road: companyRoad
                })
            } else {
                updatedCustomer.addresses.push({
                    alias: Address.COMPANY,
                    city: companyCity,
                    district: companyDistrict,
                    road: companyRoad
                })
            }
        }

        props.onSave(updatedCustomer)
    }
    return <form>
        <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
                <Label htmlFor="name">姓名</Label>
                <TextInput type="text"
                           id="name"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           rightIcon={HiUser}
                />
            </div>

            <div className="col-span-6 sm:col-span-3">
                <Label htmlFor="gender"
                       className="text-sm font-medium text-gray-900 block mb-2">性別</Label>
                <Button.Group>
                    <Button gradientDuoTone={gender === Gender.MALE ? "cyanToBlue" : ""}
                            color="gray"
                            onClick={() => setGender(Gender.MALE)}>
                        {GENDER_LABEL[Gender.MALE]}
                    </Button>
                    <Button
                        gradientDuoTone={gender === Gender.FEMALE ? "pinkToOrange" : ""}
                        color="gray"
                        onClick={() => setGender(Gender.FEMALE)}>
                        {GENDER_LABEL[Gender.FEMALE]}
                    </Button>
                </Button.Group>
            </div>

            <div className="col-span-6 sm:col-span-3 mb-4">
                <Label htmlFor="birthday"
                       className="text-sm font-medium text-gray-900 block mb-2">生日</Label>
                <TextInput type="date"
                           id="birthday" name="birthday" placeholder="2000/01/01"
                           value={birthday}
                           onChange={(e) => setBirthday(e.target.value)}
                />

            </div>
            <div className="col-span-6 sm:col-span-3">
                <Label htmlFor="email"
                       className="text-sm font-medium text-gray-900 block mb-2">Email</Label>
                <TextInput type="email" name="email" id="email"
                           placeholder="example@company.com"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           rightIcon={HiMail}
                />
            </div>


            <div className="col-span-6 sm:col-span-3 mb-2">
                <Label htmlFor="cell-phone"
                       className="text-sm font-medium text-gray-900 block mb-2">行動電話</Label>
                <TextInput type="tel" name="cell-phone" id="cell-phone"
                           placeholder="0912345678"
                           value={cellPhone}
                           onChange={(e) => setCellPhone(e.target.value)}
                           rightIcon={HiPhone}
                />
            </div>

            <div className="col-span-6 sm:col-span-3 mb-2">
                <Label htmlFor="home-number"
                       className="text-sm font-medium text-gray-900 block mb-2">住家電話</Label>
                <TextInput type="tel" name="home-number" id="home-number"
                           placeholder="(02)12345678"
                           value={homeNumber}
                           onChange={(e) => setHomeNumber(e.target.value)}
                           rightIcon={HiHome}
                />
            </div>

            <div className="col-span-6 sm:col-span-3 mb-2">
                <Label htmlFor="company-number"
                       className="text-sm font-medium text-gray-900 block mb-2">公司電話</Label>
                <TextInput type="tel" name="company-number" id="company-number"
                           placeholder="0912345678"
                           value={workNumber}
                           onChange={(e) => setWorkNumber(e.target.value)}
                           rightIcon={HiOfficeBuilding}
                />
            </div>

            <div className="col-span-6 sm:col-span-6">
                <Label htmlFor="home-address">住家地址</Label>
                <div className="flex flex-row items-center mb-2">
                    <HiHome className="mr-2"/>
                    <Select label="城市"
                            id="home-city"
                            value={homeCity}
                            onChange={(e) => setHomeCity(e.target.value)}
                    >
                        {getCities().map((city, idx) => <option key={`hc-` + city + idx}>{city}</option>)}
                    </Select>

                    <Select label="區域"
                            id="home-district"
                            className="ml-2"
                            value={homeDistrict}
                            onChange={(e) => setHomeDistrict(e.target.value)}
                    >
                        {homeDistOptions.map((dist, idx) => <option key={`hd-` + dist + idx}>{dist}</option>)}
                    </Select>

                    <TextInput
                        id="home-road"
                        className="ml-2"
                        type="text"
                        placeholder="住家地址"
                        value={homeRoad}
                        onChange={(e) => setHomeRoad(e.target.value)}
                    />
                </div>
            </div>

            <div className="col-span-6 sm:col-span-6">
                <Label htmlFor="company-address">公司地址</Label>
                <div className="flex flex-row items-center  mb-2">
                    <HiOfficeBuilding className="mr-2"/>
                    <Select label="城市"
                            id="company-city"
                            value={companyCity}
                            onChange={(e) => setCompanyCity(e.target.value)}
                    >
                        {getCities().map((city, idx) => <option key={`cc` + city + idx}>{city}</option>)}
                    </Select>

                    <Select label="區域"
                            id="company-district"
                            className="ml-2"
                            value={companyDistrict}
                            onChange={(e) => setCompanyDistrict(e.target.value)}
                    >
                        {companyDistOptions.map((dist, idx) => <option key={`cd-` + dist + idx}>{dist}</option>)}
                    </Select>

                    <TextInput
                        id="company-road"
                        className="ml-2"
                        type="text"
                        placeholder="公司地址"
                        value={companyRoad}
                        onChange={(e) => setCompanyRoad(e.target.value)}
                    />
                </div>
            </div>
        </div>

        <div className="flex flex-row-reverse mt-8">
            <Button
                color="success"
                disabled={props.isSaving}
                onClick={saveHandler}>
                {props.isSaving && <Spinner/>}
                <span className={props.isSaving ? "ml-2" : ""}>
                        {props.isSaving ? "處理中" : "儲存"}
                    </span>
            </Button>
        </div>
    </form>
}

export default EditCustomer