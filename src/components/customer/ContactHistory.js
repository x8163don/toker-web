import React, {useState} from "react";
import {Modal, Timeline, Button, Spinner, Textarea} from "flowbite-react";
import {addContactHistory} from "../../data/customer/ContactHistory";
import {HiOutlineTrash} from "react-icons/hi";

const ContactHistory = (props) => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [isSaving, setIsSaving] = useState(false)

    const [isDeleting, setIsDeleting] = useState(false)
    const [targetContactHistory, setTargetContactHistory] = useState({})


    const addNewContactHistoryHandler = () => {
        setIsSaving(true)
        addContactHistory(props.customer.id, title, content)
            .then(r => {
                setIsSaving(false)
                setTitle("")
                setContent("")
                props.onContactHistoryAdded(r.contact_history_id)
            }).catch(e => {
            setIsSaving(false)
        })

    }

    return <div className="flex flex-row">
        <div className="flex flex-col mr-6">
            <input type="text"
                   value={title}
                   placeholder="請輸入標題"
                   className="w-96 mb-2"
                   onChange={(e) => {
                       setTitle(e.target.value)
                   }}/>

            <Textarea id="message"
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
                      placeholder="請輸入紀錄"
                      rows={10}
                      value={content}
                      onChange={(e) => {
                          setContent(e.target.value)
                      }}
            />

            <div className="flex flex-row-reverse mb-4">
                <Button
                    disabled={isSaving}
                    onClick={addNewContactHistoryHandler}
                    color="success"
                >
                    {isSaving && <Spinner/>}
                    <span className={props.isSaving ? "ml-2" : ""}>
                        {props.isSaving ? "處理中" : "儲存"}
                    </span>
                </Button>
            </div>
        </div>
        <Timeline>
            {
                props.contactHistories.map((contactHistory) => {
                    return <Timeline.Item key={"contact-history" + contactHistory.id}>
                        <Timeline.Point/>
                        <Timeline.Content>
                            <Timeline.Time>
                                {function () {
                                    const date = new Date(+contactHistory.created_at)
                                    return date.toLocaleString()
                                }()}
                            </Timeline.Time>
                            <Timeline.Title>
                                {contactHistory.title}
                            </Timeline.Title>
                            <Timeline.Body className="w-96">
                                {contactHistory.content}
                            </Timeline.Body>
                            <div className="flex flex-row-reverse">
                                <Button
                                    color="error"
                                    onClick={() => {
                                        setIsDeleting(true)
                                        setTargetContactHistory(contactHistory)
                                    }}
                                >
                                 <span
                                     className="font-medium cursor-pointer text-red-600 hover:underline dark:text-red-500"
                                 >
                                        <HiOutlineTrash/>
                                    </span>
                                </Button>
                            </div>
                        </Timeline.Content>
                    </Timeline.Item>
                })
            }
        </Timeline>

        <Modal
            onClose={() => {
                setIsDeleting(false)
            }}
            popup
            show={isDeleting}
            size="md"
        >
            <Modal.Header/>
            <Modal.Body>
                <div className="text-center">
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        <p>
                            確定要刪除該紀錄嗎？
                        </p>
                    </h3>
                    <div className="flex justify-center gap-4">
                        <Button
                            color="failure"
                            onClick={() => {
                                setIsDeleting(false)
                                if (!targetContactHistory.id) {
                                    return
                                }
                                props.onContactHistoryDeleted(targetContactHistory.id)
                            }}
                        >
                            確認
                        </Button>
                        <Button
                            color="gray"
                            onClick={() => {
                                setIsDeleting(false)
                            }}
                        >
                            <p>
                                取消
                            </p>
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>

    </div>
}

export default ContactHistory