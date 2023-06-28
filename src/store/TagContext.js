import React, { useEffect, useState } from "react";
import { addTag, getTags } from "../data/tag/Tag";

export const TagContext = React.createContext({
  tags: [],
  getTagById: (id) => {},
  getExistTag: (ids) => {},
  getSameGroupTags: (id) => {},
  getTagByFullName: (name) => {},
  onAddTag: (name) => {},
  onRemoveTag: () => {},
});

export const TagContextProvider = (props) => {
  const [currentTags, setTags] = useState([]);

  useEffect(() => {
    getTags().then((r) => {
      setTags(r);
    });
  }, []);

  const addTagHandler = async (name) => {
    const existTag = getTagByFullName(name);

    if (existTag) {
      return existTag.id;
    }

    const newTagId = await addTag(name);
    const result = await getTags();
    setTags(result);
    return newTagId;
  };

  const removeTagHandler = () => {
    getTags().then((r) => {
      setTags(r);
    });
  };

  const getTagById = (id) => {
    return currentTags.find((tag) => tag.id === id);
  };

  const getExistTagIds = (ids) => {
    return ids.filter((id) => currentTags.find((tag) => tag.id === id));
  };

  const getSameGroupTags = (id) => {
    const targetTag = currentTags.find((tag) => tag.id === id);
    if (!targetTag) {
      return [];
    }
    return currentTags.filter((tag) => tag.group === targetTag.group);
  };

  const getTagByFullName = (name) => {
    return currentTags.find((tag) => `${tag.group}/${tag.name}` === name);
  };

  return (
    <TagContext.Provider
      value={{
        tags: currentTags,
        getTagById,
        getExistTagIds,
        getSameGroupTags,
        getTagByFullName,
        onAddTag: addTagHandler,
        onRemoveTag: removeTagHandler,
      }}
    >
      {props.children}
    </TagContext.Provider>
  );
};
