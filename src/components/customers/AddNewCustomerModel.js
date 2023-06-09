import React, { useEffect, useRef, useState } from "react";
import { Button, Label, Select, Textarea, TextInput } from "flowbite-react";
import { getCities, getDistricts } from "../../data/address";
import { addCustomer } from "../../data/customer/Customer";
import { Gender, GENDER_LABEL } from "../../contants/Gender";
import {
  HiUser,
  HiMail,
  HiHome,
  HiPhone,
  HiOfficeBuilding,
} from "react-icons/hi";
import { Address, Phone } from "../../contants/Aliases";

const AddNewCustomerModel = (props) => {
  const nameInput = useRef("");
  const emailInput = useRef("");
  const birthdayInput = useRef("");
  const homeNumberInput = useRef("");
  const cellPhoneInput = useRef("");
  const companyNumberInput = useRef("");
  const professionInput = useRef("");
  const noteInput = useRef("");
  const [homeAddressCity, setHomeAddressCity] = useState(getCities()[0]);
  const homeAddressDistrict = useRef("");
  const homeAddressRoad = useRef("");
  const [companyAddressCity, setCompanyAddressCity] = useState(getCities()[0]);
  const companyAddressDistrict = useRef("");
  const companyAddressRoad = useRef("");

  const [gender, setGender] = useState(Gender.MALE);

  const [homeDistOptions, setHomeDistOptions] = useState([]);
  const [companyDistOptions, setCompanyDistOptions] = useState([]);

  useEffect(() => {
    setHomeDistOptions(getDistricts(homeAddressCity));
  }, [homeAddressCity]);

  useEffect(() => {
    setCompanyDistOptions(getDistricts(companyAddressCity));
  }, [companyAddressCity]);

  const addNewCustomerHandler = () => {
    let newCustomerData = {
      name: nameInput.current.value,
      gender: gender,
      email: emailInput.current.value,
      profession: professionInput.current.value,
      note: noteInput.current.value,
      phones: [],
      addresses: [],
    };

    if (birthdayInput.current.value !== "") {
      newCustomerData.birthday = new Date(
        birthdayInput.current.value
      ).getTime();
    }

    if (cellPhoneInput.current.value !== "") {
      newCustomerData.phones.push({
        alias: Phone.MOBILE,
        phone: cellPhoneInput.current.value,
      });
    }

    if (homeNumberInput.current.value !== "") {
      newCustomerData.phones.push({
        alias: Phone.HOME,
        phone: homeNumberInput.current.value,
      });
    }

    if (companyNumberInput.current.value !== "") {
      newCustomerData.phones.push({
        alias: Phone.COMPANY,
        phone: companyNumberInput.current.value,
      });
    }

    if (
      homeAddressCity !== "" &&
      homeAddressDistrict.current.value !== "" &&
      homeAddressRoad.current.value !== ""
    ) {
      newCustomerData.addresses.push({
        alias: Address.HOME,
        city: homeAddressCity,
        district: homeAddressDistrict.current.value,
        road: homeAddressRoad.current.value,
      });
    }

    if (
      companyAddressCity !== "" &&
      companyAddressDistrict.current.value !== "" &&
      companyAddressRoad.current.value !== ""
    ) {
      newCustomerData.addresses.push({
        alias: Address.COMPANY,
        city: companyAddressCity,
        district: companyAddressDistrict.current.value,
        road: companyAddressRoad.current.value,
      });
    }

    addCustomer(newCustomerData).then(() => {
      cleanup();
      props.onSaveCustomer();
      props.onClose();
    });
  };

  function cleanup() {
    nameInput.current.value = "";
    setGender(Gender.MALE);
    emailInput.current.value = "";
    birthdayInput.current.value = "";
    homeNumberInput.current.value = "";
    cellPhoneInput.current.value = "";
    companyNumberInput.current.value = "";
    setHomeAddressCity(getCities()[0]);
    homeAddressRoad.current.value = "";
    setCompanyAddressCity(getCities()[0]);
    companyAddressRoad.current.value = "";
  }

  return (
    <form>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-6 sm:col-span-3">
          <Label htmlFor="name">姓名</Label>
          <TextInput type="text" id="name" ref={nameInput} rightIcon={HiUser} />
        </div>

        <div className="col-span-6 sm:col-span-3">
          <Label
            htmlFor="gender"
            className="text-sm font-medium text-gray-900 block mb-2"
          >
            性別
          </Label>
          <Button.Group>
            <Button
              gradientDuoTone={gender === Gender.MALE ? "cyanToBlue" : ""}
              color="gray"
              onClick={() => setGender(Gender.MALE)}
            >
              {GENDER_LABEL[Gender.MALE]}
            </Button>
            <Button
              gradientDuoTone={gender === Gender.FEMALE ? "pinkToOrange" : ""}
              color="gray"
              onClick={() => setGender(Gender.FEMALE)}
            >
              {GENDER_LABEL[Gender.FEMALE]}
            </Button>
          </Button.Group>
        </div>

        <div className="col-span-6 sm:col-span-3 mb-4">
          <Label
            htmlFor="birthday"
            className="text-sm font-medium text-gray-900 block mb-2"
          >
            生日
          </Label>
          <TextInput
            type="date"
            id="birthday"
            name="birthday"
            placeholder="2000/01/01"
            ref={birthdayInput}
          />
        </div>
        <div className="col-span-6 sm:col-span-3">
          <Label
            htmlFor="email"
            className="text-sm font-medium text-gray-900 block mb-2"
          >
            Email
          </Label>
          <TextInput
            type="email"
            name="email"
            id="email"
            placeholder="example@company.com"
            ref={emailInput}
            rightIcon={HiMail}
          />
        </div>

        <div className="col-span-6 sm:col-span-3 mb-2">
          <Label
            htmlFor="cell-phone"
            className="text-sm font-medium text-gray-900 block mb-2"
          >
            行動電話
          </Label>
          <TextInput
            type="tel"
            name="cell-phone"
            id="cell-phone"
            placeholder="0912345678"
            ref={cellPhoneInput}
            rightIcon={HiPhone}
          />
        </div>

        <div className="col-span-6 sm:col-span-3 mb-2">
          <Label
            htmlFor="home-number"
            className="text-sm font-medium text-gray-900 block mb-2"
          >
            住家電話
          </Label>
          <TextInput
            type="tel"
            name="home-number"
            id="home-number"
            placeholder="(02)12345678"
            ref={homeNumberInput}
            rightIcon={HiHome}
          />
        </div>

        <div className="col-span-6 sm:col-span-3 mb-2">
          <Label
            htmlFor="company-number"
            className="text-sm font-medium text-gray-900 block mb-2"
          >
            公司電話
          </Label>
          <TextInput
            type="tel"
            name="company-number"
            id="company-number"
            placeholder="0912345678"
            ref={companyNumberInput}
            rightIcon={HiOfficeBuilding}
          />
        </div>

        <div className="col-span-6 sm:col-span-6">
          <Label htmlFor="home-address">住家地址</Label>
          <div className="flex flex-row items-center mb-2">
            <HiHome className="mr-2" />
            <Select
              label="城市"
              id="home-city"
              value={homeAddressCity}
              onChange={(e) => {
                setHomeAddressCity(e.target.value);
              }}
            >
              {getCities().map((city, idx) => (
                <option key={`hc-` + city + idx}>{city}</option>
              ))}
            </Select>

            <Select
              label="區域"
              id="home-district"
              className="ml-2"
              ref={homeAddressDistrict}
            >
              {homeDistOptions.map((dist, idx) => (
                <option key={`hd-` + dist + idx}>{dist}</option>
              ))}
            </Select>

            <TextInput
              id="home-road"
              className="ml-2"
              type="text"
              placeholder="住家地址"
              ref={homeAddressRoad}
            />
          </div>
        </div>

        <div className="col-span-6 sm:col-span-6">
          <Label htmlFor="profession">職業</Label>
          <TextInput
            id="profession"
            type="text"
            placeholder="職業"
            ref={professionInput}
          />
        </div>

        <div className="col-span-6 sm:col-span-6">
          <Label htmlFor="company-address">公司地址</Label>
          <div className="flex flex-row items-center  mb-2">
            <HiOfficeBuilding className="mr-2" />
            <Select
              label="城市"
              id="company-city"
              value={companyAddressCity}
              onChange={(e) => setCompanyAddressCity(e.target.value)}
            >
              {getCities().map((city, idx) => (
                <option key={`cc` + city + idx}>{city}</option>
              ))}
            </Select>

            <Select
              label="區域"
              id="company-district"
              className="ml-2"
              ref={companyAddressDistrict}
            >
              {companyDistOptions.map((dist, idx) => (
                <option key={`cd-` + dist + idx}>{dist}</option>
              ))}
            </Select>

            <TextInput
              id="company-road"
              className="ml-2"
              type="text"
              placeholder="公司地址"
              ref={companyAddressRoad}
            />
          </div>
        </div>
      </div>

      <div className="col-span-6 sm:col-span-6">
        <Label htmlFor="note">備註</Label>
        <Textarea id="note" ref={noteInput} />
      </div>

      <div className="flex flex-row-reverse mt-8">
        <Button
          className="ml-2"
          color="gray"
          onClick={() => {
            cleanup();
            props.onClose();
          }}
        >
          取消
        </Button>
        <Button onClick={addNewCustomerHandler}>新增</Button>
      </div>
    </form>
  );
};

export default AddNewCustomerModel;
