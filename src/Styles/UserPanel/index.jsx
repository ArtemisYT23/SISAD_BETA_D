import styled from "styled-components";

export const PanelUserContainer = styled.div`
  padding: 1rem 0 0 0;
  display: flex;
  width: 100%;
  align-content: center;
  justify-content: center;
`;

export const UserPanelContainer = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const UserHeaderContainer = styled.div`
  display: flex;
  padding: 0 0 1rem 0;
`;

export const ContainerTextInfo = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TitlePanel = styled.span`
  color: var(--primaryColor);
  font-size: 1.2rem;
`;

export const SubTitlePanel = styled.span`
  color: #484646;
`;

export const ContainerAvatar = styled.div`
  width: 7.5%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AvatarInfo = styled.img`
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 100%;
  align-items: center;
  justify-content: center;
  transform: translateX(21%);
  &:last-child {
    transform: translateX(0);
  }
`;

export const Avatar = styled.img`
  width: 3.4rem;
  height: 3.4rem;
  border-radius: 100%;
  align-items: center;
  justify-content: center;
  transform: translateX(21%);
  &:last-child {
    transform: translateX(0);
  }
`;

export const AvatarIcon = styled.img`
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 100%;
  align-items: center;
  justify-content: center;
  transform: translateX(21%);
  &:last-child {
    transform: translateX(0);
  }
`;

export const ContainerInfoBody = styled.div`
  width: 100%;
  display: flex;
  padding: 0.3rem;
  border: 1px solid #c4c4c4;
  border-radius: 13px;
  margin: 0 0 1rem 0;
  @media (max-width: 767px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
`;

export const ContainerBodyText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 65%;
  @media (max-width: 767px) {
   width: 100%;
   text-align: center;
   line-height: 1.4;
  }
`;

export const TitleBodyText = styled.span`
  color: var(--primaryColor);
  font-size: 1.4rem;
`;

export const SubTitleBodyText = styled.span`
  color: #484646;
`;

export const ContainerImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
`;

export const ContainerInforBasic = styled.div`
  border: 1px solid #c4c4c4;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 13px;
  @media (max-width: 767px) {
    border-radius: 13px;
  }
`;

export const ContainerTitleInfoBasic = styled.div`
  width: 95%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const ContainerCeldaChange = styled.div`
  width: 96%;
  display: flex;
  border-bottom: 1px solid #c4c4c4;
  margin: 0 0 1rem 0;
  padding: 0.5rem;
`;

export const CeldaText = styled.div`
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CeldaChangeAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75%;
  color: #484646;
`;

export const AvatarChange = styled.div`
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CeldaChangeText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  color: #484646;
`;

export const AvatarChangeText = styled.div`
  width: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
