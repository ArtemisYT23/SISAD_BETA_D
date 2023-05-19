import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setElementListFilterConfig } from "../../../../../../../redux/states/List";
import { setChangeMetadataCreatedPreview } from "../../../../../../../redux/states/Metadata";
import {
  TitleLable,
  Selected,
  InputData,
} from "../../../../../../../Styles/ModalesStyles/modalStyle";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import "./item.css";

const ItemMetadata = ({ id, name, dataTypeId, listId, maxValue }) => {
  const dispatch = useDispatch();
  const { metaCore, listCore } = useSelector((store) => store);
  const { MetadataPreviewCreated } = metaCore;
  const { ElementFilterList } = listCore;
  const [data, setData] = useState("");
  const [value, setValue] = useState();

  const GetAllItem = () => {
    dispatch(setElementListFilterConfig(listId));
  };

  const handleChange = (indexId, value) => {
    // console.log(value);
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

  const getBase64 = (file, indexId) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        // console.log("Called", reader);
        baseURL = reader.result;
        // console.log(baseURL);
        const meta = MetadataPreviewCreated.map((index) => {
          if (index.indexId === indexId) {
            index.value = baseURL;
          }
          return index;
        });
        console.log(meta);
        dispatch(setChangeMetadataCreatedPreview(MetadataPreviewCreated));
        // dispatch(setPhotoChangeUser(baseURL));
        resolve(baseURL);
      };
      // console.log(fileInfo);
    });
  };

  const setFile = (indexId, e) => {
    const file = e.target.files[0];
    getBase64(file, indexId);
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
              // <Selected
              //   onChange={(e) => handleChange(id, e.target.value)}
              //   onClick={() => GetAllItem(listId)}
              // >
              //   <option hidden>{data}</option>
              //   {ElementFilterList ? (
              //     ElementFilterList.map(({ id, name }, index) => (
              //       <option key={id} value={name}>
              //         {name}
              //       </option>
              //     ))
              //   ) : (
              //     <></>
              //   )}
              // </Selected>
              <div
                style={{ margin: "1rem" }}
                onClick={(e) => GetAllItem(listId)}
              >
                <Autocomplete
                  value={data}
                  onChange={(event, newValue) => {
                    handleChange(id, newValue);
                  }}
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  options={ElementFilterList.map((option) => option.name)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search input"
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                      }}
                      className="autocomplete-input"
                    />
                  )}
                />
              </div>
            );
          //IMAGEN
          case "b737b512-582c-4d55-ac2d-f623a5862982":
            return (
              <InputData
                type="file"
                onInput={(e) => {
                  setFile(id, e);
                }}
              />
            );
          default:
            return (
              <InputData
                type="text"
                maxLength={maxValue}
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
