import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  NavBarContainer,
  NavLinkContainer,
  LogoContainer,
  NavLinkName,
} from "./styles/NavBarStyles";
import NavBarIcon from "./icons";
import logotipo from "../../../assets/Img/NavBar/CentralFile.png";
import isotipo from "../../../assets/Img/NavBar/IconCentral.png";
import { PrivateRoutes } from "../../models";
import {
  CleaningStateInitial,
  CleaningStateManagment,
} from "../../redux/states/Name";
import { Tooltip } from "@material-ui/core";

function Navbar() {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const [dashboard, setDashboard] = useState("#c4c4c4");
  const [configData, setConfigData] = useState("#c4c4c4");
  const [documentary, setDocumentary] = useState("#F68A20");
  const [recicler, setRecicler] = useState("#c4c4c4");

  const ActiveDash = () => {
    setDashboard("#F68A20");
    setConfigData("#c4c4c4");
    setDocumentary("#c4c4c4");
    setRecicler("#c4c4c4");
  };

  const ActiveManag = () => {
    dispatch(CleaningStateManagment());
    setDashboard("#c4c4c4");
    setConfigData("#F68A20");
    setDocumentary("#c4c4c4");
    setRecicler("#c4c4c4");
  };

  const ActiveDocu = () => {
    dispatch(CleaningStateInitial());
    setDashboard("#c4c4c4");
    setConfigData("#c4c4c4");
    setDocumentary("#F68A20");
    setRecicler("#c4c4c4");
  };

  const ActiveRecicler = () => {
    setDashboard("#c4c4c4");
    setConfigData("#c4c4c4");
    setDocumentary("#c4c4c4");
    setRecicler("#F68A20");
  };

  return (
    <NavBarContainer isActive={isActive}>
      <LogoContainer
        logo={!isActive ? isotipo : logotipo}
        onClick={() => setIsActive(!isActive)}
      />
      <Tooltip title="Configuraciones">
        <NavLinkContainer
          to={`${PrivateRoutes.DASHBOARD}`}
          onClick={() => ActiveManag()}
        >
          <NavBarIcon name="managment" configData={configData} />
          {isActive ? <NavLinkName>Dashboard</NavLinkName> : <></>}
        </NavLinkContainer>
      </Tooltip>

      <Tooltip title="Gestion de Datos">
        <NavLinkContainer
          to={`${PrivateRoutes.MANAGMENT}`}
          onClick={() => ActiveDash()}
        >
          <NavBarIcon name="dashboard" dashboard={dashboard} />
          {isActive ? <NavLinkName>Administración</NavLinkName> : <></>}
        </NavLinkContainer>
      </Tooltip>

      <Tooltip title="Gestion Documental">
        <NavLinkContainer
          to={`${PrivateRoutes.DOCUMENTARY}`}
          onClick={() => ActiveDocu()}
        >
          <NavBarIcon name="documentary" documentary={documentary} />
          {isActive ? <NavLinkName>Gestión Documental</NavLinkName> : <></>}
        </NavLinkContainer>
      </Tooltip>

      <Tooltip title="Papelera">
        <NavLinkContainer
          to={`${PrivateRoutes.RECICLER}`}
          onClick={() => ActiveRecicler()}
        >
          <NavBarIcon name="reclycler" recicler={recicler} />
          {isActive ? <NavLinkName>Restauracion</NavLinkName> : <></>}
        </NavLinkContainer>
      </Tooltip>
    </NavBarContainer>
  );
}

export default Navbar;
