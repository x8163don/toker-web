import React, { useContext, useRef, useState } from "react";
import { TextInput, Button, Accordion, Checkbox, Badge } from "flowbite-react";
import { TagContext } from "../../store/TagContext";
import { HiOutlineSearch } from "react-icons/hi";

const SearchFilter = (props) => {
  const nameInput = useRef("");
  const phoneInput = useRef("");
  const cityInput = useRef("");
  const districtInput = useRef("");

  const tagContext = useContext(TagContext);

  const [includeTagIds, setIncludeTagIds] = useState([]);
  const [excludeTagIds, setExcludeTagIds] = useState([]);

  const updateIncludeTagIds = (id) => {
    setIncludeTagIds((pervState) => {
      if (pervState.includes(id)) {
        return pervState.filter((tagId) => tagId !== id);
      } else {
        return [...pervState, id];
      }
    });
  };
  const updateExcludeTagIds = (id) => {
    setExcludeTagIds((pervState) => {
      if (pervState.includes(id)) {
        return pervState.filter((tagId) => tagId !== id);
      } else {
        return [...pervState, id];
      }
    });
  };

  return (
    <div className="flex flex-row h-fit mt-24 ml-20">
      <Accordion alwaysOpen>
        <Accordion.Panel>
          <Accordion.Title>客戶資料</Accordion.Title>
          <Accordion.Content>
            <TextInput
              className="mb-2"
              type="text"
              ref={nameInput}
              placeholder="姓名"
            />
            <TextInput type="text" ref={phoneInput} placeholder="電話" />
          </Accordion.Content>
        </Accordion.Panel>

        <Accordion.Panel alwaysOpen>
          <Accordion.Title>所在地</Accordion.Title>
          <Accordion.Content>
            <TextInput
              className="mb-2"
              type="text"
              ref={cityInput}
              placeholder="城市"
            />
            <TextInput type="text" ref={districtInput} placeholder="地區" />
          </Accordion.Content>
        </Accordion.Panel>

        <Accordion.Panel>
          <Accordion.Title>
            <span>
              包含標籤
              {includeTagIds.length > 0 && (
                <Badge className="w-fit mr-2" color="failure" size="sm">
                  <p>{includeTagIds.length}</p>
                </Badge>
              )}
            </span>
          </Accordion.Title>
          <Accordion.Content>
            {tagContext.tags.map((tag) => {
              return (
                <div
                  key={`include_tag_` + tag.id}
                  className="flex flex-row mb-4"
                  onClick={() => {
                    updateIncludeTagIds(tag.id);
                  }}
                >
                  <Checkbox
                    readOnly
                    checked={includeTagIds.includes(tag.id)}
                  ></Checkbox>
                  <Badge className="ml-2 w-fit">
                    {tag.group ? `${tag.group}/${tag.name}` : `${tag.name}`}
                  </Badge>
                </div>
              );
            })}
          </Accordion.Content>
        </Accordion.Panel>

        <Accordion.Panel>
          <Accordion.Title>不包含標籤</Accordion.Title>
          <Accordion.Content>
            {tagContext.tags.map((tag) => {
              return (
                <div
                  key={`exclude_tag_` + tag.id}
                  className="flex flex-row mb-4"
                  onClick={() => {
                    updateExcludeTagIds(tag.id);
                  }}
                >
                  <Checkbox
                    readOnly
                    checked={excludeTagIds.includes(tag.id)}
                  ></Checkbox>
                  <Badge className="ml-2 w-fit">
                    {tag.group ? `${tag.group}/${tag.name}` : `${tag.name}`}
                  </Badge>
                </div>
              );
            })}
          </Accordion.Content>
        </Accordion.Panel>
        <Button
          className="mr-auto ml-auto m-4"
          color="success"
          onClick={() => {
            props.onApplyFilter({
              name: nameInput.current.value,
              phone: phoneInput.current.value,
              city: cityInput.current.value,
              district: districtInput.current.value,
              include_tag_ids: includeTagIds,
              exclude_tag_ids: excludeTagIds,
            });
          }}
        >
          <HiOutlineSearch className="mr-2" />
          搜尋
        </Button>
      </Accordion>
    </div>
  );
};

export default SearchFilter;
