import { AiFillFile } from "react-icons/ai";
import { Card } from "flowbite-react";

const FileViewer = (props) => {
  return (
    <div className="flex flex-row">
      {props.files.map((file) => {
        if ([".jpg", ".jpeg", ".png"].includes(file.extension)) {
          return (
            <Card key={file.id} className="w-36 h-48">
              <a href={file.object_access_url} target="_blank" rel="noreferrer">
                <img alt={file.origin_name} src={file.object_access_url} />
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {file.origin_name}
                  {file.extension}
                </p>
              </a>
            </Card>
          );
        }

        if ([".pdf", ".docx", ".doc"].includes(file.extension)) {
          return (
            <div key={file.id} className="h-24 w-24 mr-4">
              <a href={file.object_access_url} target="_blank" rel="noreferrer">
                <AiFillFile className="h-full w-full" alt={file.origin_name} />
                <span className="truncate ...">
                  {file.origin_name}
                  {file.extension}
                </span>
              </a>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default FileViewer;
