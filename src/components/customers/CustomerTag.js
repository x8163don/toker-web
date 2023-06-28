import React, { Fragment, useContext, useEffect, useState } from "react";
import { Badge, Select } from "flowbite-react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { TagContext } from "../../store/TagContext";

const CustomerTag = (props) => {
  const tagContext = useContext(TagContext);

  const currentTag = props.tag;

  const [sameGroupTags, setSameGroupTags] = useState([]);
  const [isShowSameGroupList, setIsShowSameGroupList] = useState(false);

  useEffect(() => {
    setSameGroupTags(tagContext.getSameGroupTags(props.tag.id));
  }, []);

  const changeTagHandler = (oldId, newId) => {
    props.onTagChange(oldId, newId);
  };

  return (
    <Fragment>
      {!isShowSameGroupList && (
        <Badge
          className="mr-2 mb-2"
          size="md"
          onClick={() => {
            setIsShowSameGroupList(true);
          }}
          onBlur={() => setIsShowSameGroupList(false)}
        >
          <span>
            {currentTag.group
              ? `${currentTag.group}/${currentTag.name}`
              : `${currentTag.name}`}
          </span>
          <IoIosCloseCircleOutline
            onClick={(e) => {
              e.stopPropagation();
              props.onTagRemove(currentTag.id);
            }}
            className="ml-2 inline-block"
          />
        </Badge>
      )}
      {isShowSameGroupList && (
        <Select
          onBlur={() => setIsShowSameGroupList(false)}
          value={currentTag.id}
          onChange={(e) => {
            changeTagHandler(currentTag.id, e.target.value);
          }}
        >
          {sameGroupTags.map((groupTag, idx) => {
            return (
              <option key={groupTag.id} value={groupTag.id}>
                {groupTag.group
                  ? `${groupTag.group}/${groupTag.name}`
                  : `${groupTag.name}`}
              </option>
            );
          })}
        </Select>
      )}
    </Fragment>
  );
};

export default CustomerTag;
