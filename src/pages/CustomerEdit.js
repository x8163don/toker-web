import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getCustomer, updateCustomer} from "../data/customer/Customer";
import EditCustomer from "../components/customer/EditCustomer";
import {Tabs} from "flowbite-react";
import ContactHistory from "../components/customer/ContactHistory";
import {deleteContactHistory, getContactHistory, listContactHistories} from "../data/customer/ContactHistory";

const CustomerEdit = () => {
    const params = useParams()
    const userId = params.id
    const [customer, setCustomer] = useState({})
    const [contactHistories, setContactHistories] = useState([])
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        getCustomer(userId).then(r => {
            setCustomer(r)
        }).catch(e => {
            console.log(e)
        })

        listContactHistories(userId).then(r => {
            setContactHistories(r.contact_histories)
        }).catch(e => {
            console.log(e)
        })
    }, [userId])


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
        <Tabs.Group>
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
                    onRoadChange={(road, index) => {
                        setCustomer((prev) => {
                            const newAddress = [...prev.addresses]
                            newAddress[index].road = road
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
                <ContactHistory
                    customer={customer}
                    contactHistories={contactHistories}
                    onContactHistoryAdded={(contactHistoryId) => {
                        getContactHistory(userId, contactHistoryId).then(r => {
                            setContactHistories((prev) => {
                                return [r, ...prev]
                            })
                        })
                    }}
                    onContactHistoryDeleted={(contactHistoryId) => {
                        deleteContactHistory(userId, contactHistoryId).then(r => {
                            setContactHistories((prev) => {
                                return prev.filter(history => history.id !== contactHistoryId)
                            })
                        })
                    }}
                />
            </Tabs.Item>
        </Tabs.Group>
    )
}

export default CustomerEdit