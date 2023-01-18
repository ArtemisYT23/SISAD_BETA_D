import styled from "styled-components";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModalUpdateResource } from "../../../../../redux/states/ActionSecurity";
import { updatePermissionCabinet } from "../../../../../redux/states/ResourceCore";
import {
  TitleModal,
  SaveButton,
  CancelButton,
} from "../../../../../Styles/ModalesStyles/modalStyle";

const useStyless = makeStyles((theme) => ({
  ResourceUpdate: {
    position: "absolute",
    width: "400px",
    height: "490px",
    backgroundColor: "white",
    border: "2px solid white",
    boxShadow: theme.shadows[2],
    padding: "16px 32px 24px",
    alignItems: "center",
    justifyContent: "center",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    borderRadius: "13px",
  },
  textfield: {
    width: "100%",
  },
  container: {
    textAlign: "center",
  },
}));

const ResourceUpdatePermision = () => {
  const dispatch = useDispatch();
  const styless = useStyless();
  const { modalSecurity, cabinetCore, resourceCore, userCore, optionCore } =
    useSelector((store) => store);
  const { SelectionUser } = userCore;
  const { ResourcePermision } = resourceCore;
  const { ResourceUpdate } = modalSecurity;
  const { cabinets } = cabinetCore;
  const { OptionCabinet } = optionCore;
  const [input, setInput] = useState({ ids_diets: [] });

  useEffect(() => {
    const Permission = [];
    const idPermiss = ResourcePermision.map((ind, i) => {
      if (ind.userId == SelectionUser?.id) {
        Permission.push(ind.resourceId);
      }
    });
    let result = Permission.filter((item, index) => {
      return Permission.indexOf(item) === index;
    });
    // console.log(result);
    setInput({ ...input, ids_diets: result });
  }, [ResourceUpdate]);

  const handleChange = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    const newChecked = checked
      ? [...input.ids_diets, value]
      : [...input.ids_diets.filter((id) => id !== value)];
    setInput({ ...input, ids_diets: newChecked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkboxes = document.querySelectorAll('[name="ActionCabinet"]');
    const UpdateResource = [];
    checkboxes.forEach((checkbox) => {
      const permision = {
        resourceId: checkbox.value,
        userId: SelectionUser?.id,
        optionData: OptionCabinet,
        isActive: checkbox.checked,
      };
      UpdateResource.push(permision);
    });
    dispatch(updatePermissionCabinet(UpdateResource));
    OpenModalResourseUpdate();
  };

  const ResourceAsignation = (
    <div className={styless.ResourceUpdate}>
      <form onSubmit={handleSubmit}>
        <div align="center">
          <TitleModal>Actualizacion De Gabinetes</TitleModal>
        </div>
        <br />
        <ContainerCabinet>
          <ContainerResource>
            <CeldaText>
              <TextNameTitle>GABINETES</TextNameTitle>
              {cabinets ? (
                cabinets.map(({ id, name }, index) => (
                  <TextNameCelda key={id}>
                    <span>{name}</span>
                  </TextNameCelda>
                ))
              ) : (
                <></>
              )}
            </CeldaText>

            <ContainerCelda>
              <TextNameTitle></TextNameTitle>
              {cabinets ? (
                cabinets.map(({ id, name }, index) => (
                  <CeldaContentCheck>
                    <input
                      type="checkbox"
                      name="ActionCabinet"
                      checked={input.ids_diets.includes(id)}
                      value={id}
                      id={id}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </CeldaContentCheck>
                ))
              ) : (
                <></>
              )}
            </ContainerCelda>
          </ContainerResource>
        </ContainerCabinet>

        <br />
        <div align="right">
          <SaveButton>Actualizar</SaveButton>
          <CancelButton onClick={() => OpenModalResourseUpdate()}>
            Cancelar
          </CancelButton>
        </div>
      </form>
    </div>
  );

  const OpenModalResourseUpdate = () => {
    dispatch(setOpenModalUpdateResource(false));
  };

  return (
    <div className={styless.container}>
      <Modal open={ResourceUpdate} onClose={OpenModalResourseUpdate}>
        {ResourceAsignation}
      </Modal>
    </div>
  );
};

export default ResourceUpdatePermision;

const ContainerCabinet = styled.div`
  width: 100%;
  height: 330px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const ContainerResource = styled.div`
  width: 100%;
  display: flex;
  margin-top: 0.2rem;
`;

const CeldaText = styled.div`
  width: 80%;
`;

const TextNameTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  height: 40px;
  color: var(--white);
  background-color: var(--primaryColor);
  letter-spacing: 0.2rem;
  border-radius: 13px;
`;

const TextNameCelda = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  height: 30px;
  border: 1px solid var(--lineColor);
  color: #616161;
  border-radius: 13px;
  margin: 0.3rem 0 0 0;
`;

const ContainerCelda = styled.div`
  width: 20%;
`;

const CeldaContentCheck = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  overflow: hidden;
  border: 1px solid var(--lineColor);
  border-radius: 13px;
  margin: 0.3rem 0 0 0;
`;
