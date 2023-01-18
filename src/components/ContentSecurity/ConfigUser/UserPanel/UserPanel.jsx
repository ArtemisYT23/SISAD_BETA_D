import { useDispatch, useSelector } from "react-redux";
import CentralSecurity from "../../../../../assets/Img/Core/CentralSecurity.png";
import iconFlechaDerecha from "../../../../../assets/Img/Core/iconFlechaDerecha.png";
import {
  Avatar,
  AvatarChange,
  AvatarChangeText,
  AvatarIcon,
  CeldaChangeAvatar,
  CeldaChangeText,
  CeldaText,
  ContainerBodyText,
  ContainerCeldaChange,
  ContainerImage,
  ContainerInfoBody,
  ContainerInforBasic,
  ContainerTitleInfoBasic,
  SubTitleBodyText,
  TitleBodyText,
  UserPanelContainer,
} from "../../../../Styles/UserPanel";
import HeaderSecurity from "../../HeaderSecurity/HeaderSecurity";

const UserPanel = () => {
  const { userSesion } = useSelector((store) => store);
  const { DataUser } = userSesion;

  const Title = "Panel de usuario";
  const SubTitle =
    "Informacion del usuario y preferencias de servicios sisad cloud";

  return (
    <UserPanelContainer>
      
      <HeaderSecurity Title={Title} SubTitle={SubTitle} />
      
      <br />
      <ContainerInfoBody>
        <ContainerBodyText>
          <TitleBodyText>
            Tu informacion de perfil en los servicios de Sisad Cloud
          </TitleBodyText>
          <SubTitleBodyText>
            Encontraras tu informacion de perfil y las opciones para
            administrarla.
          </SubTitleBodyText>
          <SubTitleBodyText>
            Puedes Acceder rapido y sencillamente desde el menu de seguridad,
          </SubTitleBodyText>
          <SubTitleBodyText>
            otras personas no podran ver tus perfiles
          </SubTitleBodyText>
        </ContainerBodyText>
        <ContainerImage>
          <img src={CentralSecurity} />
        </ContainerImage>
      </ContainerInfoBody>

       <ContainerInforBasic>
        <ContainerTitleInfoBasic>
          <TitleBodyText>Informacion Basica</TitleBodyText>
        </ContainerTitleInfoBasic>
        <ContainerCeldaChange>
          <CeldaText>
            <SubTitleBodyText>Foto</SubTitleBodyText>
          </CeldaText>
          <CeldaChangeAvatar>
            Personalizar tu cuenta
          </CeldaChangeAvatar>
          <AvatarChange>
            {DataUser && <Avatar src={DataUser?.photoUrl} />}
          </AvatarChange>
        </ContainerCeldaChange>
        <ContainerCeldaChange>
          <CeldaText>
            <SubTitleBodyText>Nombre</SubTitleBodyText>
          </CeldaText>
          {DataUser && <CeldaChangeText>{DataUser?.fullName}</CeldaChangeText>}
          <AvatarChangeText>
            <AvatarIcon src={iconFlechaDerecha} />
          </AvatarChangeText>
        </ContainerCeldaChange>
        <ContainerCeldaChange>
          <CeldaText>
            <SubTitleBodyText>Compañia</SubTitleBodyText>
          </CeldaText>
          {DataUser && <CeldaChangeText>{DataUser?.company}</CeldaChangeText>}
          <AvatarChangeText>
            <AvatarIcon src={iconFlechaDerecha} />
          </AvatarChangeText>
        </ContainerCeldaChange>
        <ContainerCeldaChange>
          <CeldaText>
            <SubTitleBodyText>Licencia</SubTitleBodyText>
          </CeldaText>
          <CeldaChangeText>ESTANDAR</CeldaChangeText>
          <AvatarChangeText></AvatarChangeText>
        </ContainerCeldaChange>
      </ContainerInforBasic>

      <br />
      <ContainerInforBasic>
        <ContainerTitleInfoBasic>
          <TitleBodyText>Informacion de contacto</TitleBodyText>
        </ContainerTitleInfoBasic>

        <ContainerCeldaChange>
          <CeldaText>
            <SubTitleBodyText>Correo</SubTitleBodyText>
          </CeldaText>
          {DataUser && <CeldaChangeText>{DataUser?.email}</CeldaChangeText>}
          <AvatarChangeText>
            <AvatarIcon src={iconFlechaDerecha} />
          </AvatarChangeText>
        </ContainerCeldaChange>
        <ContainerCeldaChange>
          <CeldaText>
            <SubTitleBodyText>Cedula</SubTitleBodyText>
          </CeldaText>
          <CeldaChangeText></CeldaChangeText>
          <AvatarChangeText>
            <AvatarIcon src={iconFlechaDerecha} />
          </AvatarChangeText>
        </ContainerCeldaChange>
      </ContainerInforBasic>
    </UserPanelContainer>
  );
};

export default UserPanel;
