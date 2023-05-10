import React, {useState} from 'react'
import {Button, Modal, Dropdown} from 'flowbite-react';

const AddNewCustomerModel = (props) => {
    const [name, setName] = useState("")
    const [gender, setGender] = useState(1)
    const [birthday, setBirthday] = useState(null)
    const [emails, setEmail] = useState([])
    const [phones, setPhone] = useState([])
    const [addresses, setAddresses] = useState([])

    const phoneAliases = ["行動電話", "住家", "公司", "住家傳真", "公司傳真"]
    const [currentPhoneAlias, setCurrentPhoneAlias] = useState(phoneAliases[0])

    return (
        <React.Fragment>
            <Modal
                show={props.isShow}
                onClose={props.onModelClose}
            >
                <Modal.Header>新增客戶</Modal.Header>
                <Modal.Body>
                    <div className="p-6 space-y-6">
                        <form>
                            <div className="grid grid-cols-6 gap-6">
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="name"
                                           className="text-sm font-medium text-gray-900 block mb-2">姓名</label>
                                    <input type="text" name="name" id="name"
                                           key="name"
                                           onBlur={(event) => setName(event.target.value)}
                                           className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                           placeholder="客戶姓名"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="gender"
                                           className="text-sm font-medium text-gray-900 block mb-2">性別</label>
                                    <Button.Group>
                                        <Button gradientDuoTone={gender == 1 ? "cyanToBlue" : ""}
                                                color="gray"
                                                onClick={() => setGender(1)}>
                                            男
                                        </Button>
                                        <Button
                                            gradientDuoTone={gender == 2 ? "pinkToOrange" : ""}
                                            color="gray"
                                            onClick={() => setGender(2)}>
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
                                    />

                                </div>
                                <div className="col-span-6 sm:col-span-3">
                                    <label htmlFor="email"
                                           className="text-sm font-medium text-gray-900 block mb-2">Email</label>
                                    <input type="email" name="email" id="email"
                                           className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                           placeholder="example@company.com"/>
                                </div>
                                <div className="col-span-6 sm:col-span-6">
                                    <label htmlFor="phone-number"
                                           className="text-sm font-medium text-gray-900 block mb-2">電話
                                    </label>
                                    <Dropdown
                                        label={currentPhoneAlias}
                                        dismissOnClick={false}
                                    >
                                        {
                                            phoneAliases.map((alias) => <Dropdown.Item
                                                onClick={(event => setCurrentPhoneAlias(alias))}>{alias}</Dropdown.Item>)
                                        }
                                    </Dropdown>
                                    <input type="tel" name="phone-number" id="phone-number"
                                           className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                           placeholder="09XXXXXXXX"/>
                                </div>

                                <div className="col-span-6 sm:col-span-6">
                                    <label htmlFor="home-address"
                                           className="text-sm font-medium text-gray-900 block mb-2">地址</label>

                                    <input type="text" name="address" id="address"
                                           className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                                    />

                                </div>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onSaveCustomer}>新增</Button>
                    <Button color="gray" onClick={props.onModelClose}>取消</Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}


export default AddNewCustomerModel