import { TextInput, Button } from "flowbite-react";
import { useRef } from "react";

const SearchFilter = (props) => {
  const nameInput = useRef("");
  const phoneInput = useRef("");
  const cityInput = useRef("");
  const districtInput = useRef("");
  const tagInput = useRef([]);

  return (
    <div>
      <div className="flex flex-row">
        <TextInput type="text" ref={nameInput} placeholder="名字" />
        <TextInput type="text" ref={phoneInput} placeholder="電話" />
        <TextInput type="text" ref={cityInput} placeholder="城市" />
        <TextInput type="text" ref={districtInput} placeholder="地區" />

        <Button
          onClick={() => {
            props.onApplyFilter({
              name: nameInput.current.value,
              phone: phoneInput.current.value,
              city: cityInput.current.value,
              district: districtInput.current.value,
              tag_ids: tagInput.current.value,
            });
          }}
        >
          搜尋
        </Button>
      </div>
    </div>
  );
};

export default SearchFilter;
