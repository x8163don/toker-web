import React, { useContext } from "react";
import { Card, Avatar, Label, Badge } from "flowbite-react";
import _ from "lodash";
import { DateTime } from "luxon";
import { getAge } from "../../utils/Age";
import { Link } from "react-router-dom";
import { Gender } from "../../contants/Gender";
import { TagContext } from "../../store/TagContext";
import CustomerTag from "./CustomerTag";

const CustomerCard = (props) => {
  const tagContext = useContext(TagContext);

  const getDataIntegrityLevel = (dataIntegrity) => {
    if (dataIntegrity >= 90) {
      return {
        color: "success",
        text: "完整",
      };
    } else if (dataIntegrity >= 50) {
      return {
        color: "warning",
        text: "部分",
      };
    } else {
      return {
        color: "failure",
        text: "缺少",
      };
    }
  };

  return (
    <Card className="w-full mb-4">
      <div className="flex flex-row w-full">
        <div className="flex flex-col items-center">
          <Avatar
            rounded
            placeholderInitials={_.get(props, "customer.name", "")}
            size="lg"
            img={_.get(props, "customer.avatar", "")}
            bordered
            color={
              _.get(props, "customer.gender", Gender.MALE) === Gender.MALE
                ? "cyan"
                : "pink"
            }
          />
          <h5 className="mt-2 text-xl font-medium text-gray-900 dark:text-white">
            {_.get(props, "customer.name", "")}
          </h5>
        </div>
        <div className="ml-6 w-24">
          <Label value="生日"></Label>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {(function () {
              const timestamp = +_.get(props, "customer.birthday", "0");
              if (timestamp === 0) {
                return "-";
              } else
                return DateTime.fromMillis(+timestamp).toFormat("yyyy/MM/dd");
            })()}
          </p>

          <Label value="年齡"></Label>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {(function () {
              const timestamp = +_.get(props, "customer.birthday", "0");
              if (timestamp === 0) {
                return "-";
              } else return getAge(timestamp);
            })()}
          </p>

          <Label value="聯絡方式"></Label>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <a
              className="cursor-pointer font-medium hover:underline"
              href={`tel:` + _.get(props, "customer.phones[0].phone", "")}
            >
              {_.get(props, "customer.phones[0].phone", "")}
            </a>
          </p>
        </div>

        <div className="ml-6 w-24">
          <Label value="資料完整度"></Label>
          <Badge
            className="w-fit"
            color={
              getDataIntegrityLevel(_.get(props, "customer.data_integrity", 0))
                .color
            }
            size="sm"
          >
            {
              getDataIntegrityLevel(_.get(props, "customer.data_integrity", 0))
                .text
            }
          </Badge>
        </div>

        <div className="ml-6 w-24">
          <Label>標籤</Label>
          <div>
            {tagContext
              .getExistTagIds(_.get(props, "customer.tag_ids", []))
              .map((tagId) => {
                const tag = tagContext.getTagById(tagId);
                return (
                  <CustomerTag
                    key={tag.id}
                    tag={tag}
                    onTagChange={(oldId, newId) =>
                      props.onTagChange(oldId, newId)
                    }
                    onTagRemove={(tagId) => props.onTagRemove(tagId)}
                  ></CustomerTag>
                );
              })}
          </div>
          <input
            list="tags"
            type="text"
            placeholder="輸入標籤"
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                const name = e.target.value;
                props.onAddNewTag(name);
                e.target.value = "";
              }
            }}
          />
          <datalist id="tags">
            {tagContext.tags.map((tag) => {
              return (
                <option key={tag.id}>
                  {tag.group}/{tag.name}
                </option>
              );
            })}
          </datalist>
        </div>

        <div className="ml-auto">
          <Link
            className="font-medium cursor-pointer text-cyan-600 hover:underline dark:text-cyan-500"
            to={`/customers/${props.customer.id}`}
          >
            編輯
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default CustomerCard;