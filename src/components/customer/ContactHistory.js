import React, { useState } from "react";
import { Modal, Timeline, Button, Spinner, Textarea } from "flowbite-react";
import { addContactHistory } from "../../data/customer/ContactHistory";
import { HiOutlineTrash, HiOutlineCloudUpload } from "react-icons/hi";
import { getUploadInfo } from "../../data/customer/Customer";
import { uploadFile } from "../../data/file/FileUploader";
import FileViewer from "../file/FileViewer";

const ContactHistory = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [files, setFiles] = useState([]);

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [targetContactHistory, setTargetContactHistory] = useState({});

  const addNewContactHistoryHandler = async () => {
    setIsSaving(true);

    const fileIds = await Promise.all(
      files.map(async (file) => {
        const uploadInfo = await getUploadInfo(props.customer.id, file.name);
        await uploadFile(uploadInfo.upload_url, file);
        return uploadInfo.file_id;
      })
    );

    addContactHistory(props.customer.id, title, content, fileIds)
      .then((r) => {
        setIsSaving(false);
        setTitle("");
        setContent("");
        setFiles([]);
        props.onContactHistoryAdded(r.contact_history_id);
      })
      .catch(() => {
        setIsSaving(false);
      });
  };

  const readAllFiles = async (e) => {
    const files = Array.from(e.target.files);
    await Promise.all(
      files.map(async (file) => {
        const fileContents = await handleFileChosen(file);
        return fileContents;
      })
    );
  };

  const handleFileChosen = async (file) => {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.onload = (evt) => {
        setFiles((prev) => {
          const isExist = prev.find((f) => f.name === evt.target.name);
          if (isExist) {
            return [...prev];
          } else {
            file.dataURL = fileReader.result;
            return [...prev, file];
          }
        });
        resolve(fileReader.result);
      };
      fileReader.name = file.name;
      fileReader.onerror = reject;
      fileReader.readAsDataURL(file);
    });
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-col mr-6">
        <input
          type="text"
          value={title}
          placeholder="請輸入標題"
          className="w-96 mb-2"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />

        <Textarea
          id="message"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
          placeholder="請輸入紀錄"
          rows={10}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />

        <div className="flex flex-row mb-2">
          {files.map((file) => (
            <div
              key={file.filename}
              className="mr-2 w-36 h-36 border border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col">
                <img
                  src={file.dataURL}
                  alt={file.filename}
                  className="w-full h-full"
                />
              </div>
              <span>{file.name}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center flex-row mb-2">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-36 h-36 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <HiOutlineCloudUpload className="w-10 h-10 mb-1 text-gray-400" />
              <p className="pl-2 pr-2 text-sm text-gray-500 dark:text-gray-400">
                點擊此處上傳檔案
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              multiple
              accept=".png,.jpg,.jpeg,.pdf,.docx,.doc,.xlsx,.xls,.pptx,.ppt,.txt"
              onChange={readAllFiles}
            />
          </label>
        </div>

        <div className="flex flex-row-reverse mb-4">
          <Button
            disabled={isSaving}
            onClick={addNewContactHistoryHandler}
            color="success"
          >
            {isSaving && <Spinner />}
            <span className={props.isSaving ? "ml-2" : ""}>
              {props.isSaving ? "處理中" : "儲存"}
            </span>
          </Button>
        </div>
      </div>
      <Timeline>
        {props.contactHistories.map((contactHistory) => {
          return (
            <Timeline.Item key={"contact-history" + contactHistory.id}>
              <Timeline.Point />
              <Timeline.Content>
                <Timeline.Time>
                  {(function () {
                    const date = new Date(+contactHistory.created_at);
                    return date.toLocaleString();
                  })()}
                </Timeline.Time>
                <Timeline.Title>{contactHistory.title}</Timeline.Title>
                <Timeline.Body className="w-96">
                  {contactHistory.content}
                </Timeline.Body>

                <FileViewer files={contactHistory.files} />

                <div className="flex flex-row-reverse">
                  <Button
                    color="error"
                    onClick={() => {
                      setIsDeleting(true);
                      setTargetContactHistory(contactHistory);
                    }}
                  >
                    <span className="font-medium cursor-pointer text-red-600 hover:underline dark:text-red-500">
                      <HiOutlineTrash />
                    </span>
                  </Button>
                </div>
              </Timeline.Content>
            </Timeline.Item>
          );
        })}
      </Timeline>

      <Modal
        onClose={() => {
          setIsDeleting(false);
        }}
        popup
        show={isDeleting}
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              <p>確定要刪除該紀錄嗎？</p>
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  setIsDeleting(false);
                  if (!targetContactHistory.id) {
                    return;
                  }
                  props.onContactHistoryDeleted(targetContactHistory.id);
                }}
              >
                確認
              </Button>
              <Button
                color="gray"
                onClick={() => {
                  setIsDeleting(false);
                }}
              >
                <p>取消</p>
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ContactHistory;
