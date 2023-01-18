import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setElementListFilterConfig } from "../../../../../../../redux/states/List";
import {
    TitleLable,
    Selected,
    InputData,
  } from "../../../../../../../Styles/ModalesStyles/modalStyle";
  import { setChangeMetadataUpdate } from "../../../../../../../redux/states/Metadata";

  
const ItemUpdateMeta = ({ id, name, dataTypeId, listId, value, indexId }) => {

    const dispatch = useDispatch();
  const { metaCore, listCore } = useSelector((store) => store);
  const { metaDocument } = metaCore;
  const { ElementFilterList } = listCore;
  const [data, setData] = useState(value);

  const GetAllItem = () => {
    dispatch(setElementListFilterConfig(listId));
  };

  const handleChange = (indexId, value) => {
    setData(value);
    console.log(metaDocument);
    const meta = metaDocument.map((index) => {
      if (index.indexId === indexId) {
        index.value = value;
      }
      return index;
    });
    console.log(meta);
    dispatch(setChangeMetadataUpdate(meta));
  };

    return(
        <div>
        <br />
        <TitleLable>{name}:</TitleLable>
  
        <br />
        {(() => {
          switch (dataTypeId) {
            //NUMBER
            case "69aa9f19-0506-4e94-ad6f-3d22ee9fd5e5":
              return (
                <InputData
                  type="number"
                  value={data}
                  onChange={(e) => handleChange( indexId, e.target.value)}
                />
              );
            //DATE
            case "dc4378da-908b-4547-9001-a46b95c3d4b9":
              return (
                <InputData
                  type="date"
                  value={data}
                  onChange={(e) => handleChange( indexId, e.target.value)}
                />
              );
            //LIST
            case "6009c757-6c0b-4f5d-96e5-44af7382de6d":
              return (
                <Selected
                  onChange={(e) => handleChange( indexId, e.target.value)}
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
                  onChange={(e) => handleChange(indexId, e.target.value)}
                />
              );
          }
        })()}
      </div>
    )
}

export default ItemUpdateMeta;