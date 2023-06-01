import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getCustomer, updateCustomer} from "../data/customer/customer";
import EditCustomer from "../components/customer/EditCustomer";
import {Tabs, Timeline} from "flowbite-react";

const CustomerEdit = () => {
    const params = useParams()
    const userId = params.id
    const [customer, setCustomer] = useState({})
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        getCustomer(userId).then(r => {
            setCustomer(r)
        }).catch(e => {
            console.log(e)
        })
    }, [])

    const onCustomerSaveHandler = async () => {
        try {
            setIsSaving(true)
            const customerData = {...customer}
            customerData.phones = customerData.phones.filter(phone => phone.phone !== "")
            customerData.addresses = customerData.addresses.filter(address => address.city !== "" && address.district !== "" && address.road !== "")
            await updateCustomer(customerData)
            const r = await getCustomer(customer.id)
            setCustomer(r)
            setIsSaving(false)
        } catch (e) {
            setIsSaving(false)
        }
    }

    return (
        <Tabs.Group style="default">
            <Tabs.Item title={customer.name}>
                <EditCustomer
                    key={customer.id}
                    customer={customer}
                    onNameChange={(name) => {
                        setCustomer((prev) => {
                            prev.name = name
                            return {...prev}
                        })
                    }}
                    onBirthdayChange={(birthday) => {
                        setCustomer((prev) => {
                            prev.birthday = birthday
                            return {...prev}
                        })
                    }}
                    onGenderChange={(gender) => {
                        setCustomer((prev) => {
                            prev.gender = gender
                            return {...prev}
                        })
                    }}
                    onEmailChange={(email) => {
                        setCustomer((prev) => {
                            if (prev.email) {
                                prev.email.email = email
                            } else {
                                prev.email = {alias: "main", email: email}
                            }
                            return {...prev}
                        })
                    }}
                    onPhoneAliasChange={(alias, index) => {
                        setCustomer((prev) => {
                            prev.phones[index].alias = alias
                            return {...prev}
                        })
                    }}
                    onPhoneChange={(phone, index) => {
                        setCustomer((prev) => {
                            prev.phones[index].phone = phone
                            return {...prev}
                        })
                    }}
                    onAddPhone={() => {
                        setCustomer((prev) => {
                            return {
                                ...prev, phones: [...prev.phones, {
                                    alias: "",
                                    phone: ""
                                }]
                            }
                        })
                    }}
                    onAddressAliasChange={(alias, index) => {
                        setCustomer((prev) => {
                            prev.addresses[index].alias = alias
                            const newAddress = [...prev.addresses]
                            newAddress[index].alias = alias
                            return {...prev, addresses: newAddress}
                        })
                    }}
                    onCityChange={(city, index) => {
                        setCustomer((prev) => {
                            const newAddress = [...prev.addresses]
                            newAddress[index].city = city
                            newAddress[index].district = ""
                            return {...prev, addresses: newAddress}
                        })
                    }}
                    onDistrictChange={(dist, index) => {
                        setCustomer((prev) => {
                            const newAddress = [...prev.addresses]
                            newAddress[index].district = dist
                            return {...prev, addresses: newAddress}
                        })
                    }}
                    onAddAddress={() => {
                        setCustomer((prev) => {
                            return {
                                ...prev, addresses: [...prev.addresses, {
                                    alias: "",
                                    city: ""
                                }]
                            }
                        })
                    }}
                    isSaving={isSaving}
                    onSave={onCustomerSaveHandler}
                />
            </Tabs.Item>

            <Tabs.Item title="歷程">
                <Timeline>
                    <Timeline.Item>
                        <Timeline.Point/>
                        <Timeline.Content>
                            <Timeline.Time>
                                February 2022
                            </Timeline.Time>
                            <Timeline.Title>
                                Application UI code in Tailwind CSS
                            </Timeline.Title>
                            <Timeline.Body>
                                <p>
                                    Get access to over 20+ pages including a dashboard layout, charts, kanban board,
                                    calendar, and pre-order
                                    E-commerce & Marketing pages.
                                </p>
                            </Timeline.Body>
                        </Timeline.Content>
                    </Timeline.Item>
                </Timeline>
            </Tabs.Item>
        </Tabs.Group>
    )
}

export default CustomerEdit