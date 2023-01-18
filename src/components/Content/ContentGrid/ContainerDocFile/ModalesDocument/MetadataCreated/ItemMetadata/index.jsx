import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setElementListFilterConfig } from "../../../../../../../redux/states/List";
import { setChangeMetadataCreatedPreview } from "../../../../../../../redux/states/Metadata";
import {
  TitleLable,
  Selected,
  InputData,
} from "../../../../../../../Styles/ModalesStyles/modalStyle";

const ItemMetadata = ({ id, name, dataTypeId, listId }) => {
  const dispatch = useDispatch();
  const { metaCore, listCore } = useSelector((store) => store);
  const { MetadataPreviewCreated } = metaCore;
  const { ElementFilterList } = listCore;
  const [data, setData] = useState("");

  const GetAllItem = () => {
    dispatch(setElementListFilterConfig(listId));
  };

  const handleChange = (indexId, value) => {
    setData(value);
    const meta = MetadataPreviewCreated.map((index) => {
      if (index.indexId === indexId) {
        index.value = value;
      }
      return index;
    });
    console.log(meta);
    dispatch(setChangeMetadataCreatedPreview(MetadataPreviewCreated));
  };

  return (
    <div>
      <br />
      <TitleLable>{name}:</TitleLable>

      <br />
      {(() => {
        switch (dataTypeId) {
          //NUMBER
          case "06078df0-13ca-4c73-bc2d-ec3c02be682b":
            return (
              <InputData
                type="number"
                value={data}
                onChange={(e) => handleChange(id, e.target.value)}
              />
            );
          //DATE
          case "b98210af-5803-4e9e-9e39-d20e1187cb77":
            return (
              <InputData
                type="date"
                value={data}
                onChange={(e) => handleChange(id, e.target.value)}
              />
            );
          //LIST
          case "a8af3021-06f4-4317-98eb-0f083a14064e":
            return (
              <Selected
                onChange={(e) => handleChange(id, e.target.value)}
                onClick={() => GetAllItem(listId)}
              >
                <option hidden>{data}</option>
                {ElementFilterList ? (
                  ElementFilterList.map(({ id, name }, index) => (
                    <option key={id} value={name}>
                      {name}
                    </option>
                  ))
                ) : (
                  <></>
                )}
              </Selected>
            );
          default:
            return (
              <InputData
                type="text"
                value={data}
                onChange={(e) => handleChange(id, e.target.value)}
              />
            );
        }
      })()}
    </div>
  );
};

export default ItemMetadata;
