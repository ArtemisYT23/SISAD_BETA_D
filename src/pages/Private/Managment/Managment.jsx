import styled from "styled-components";
import AsideManag from "../../../components/Aside/AsideManag/AsideManag";
import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import { PrivateRoutes } from "../../../models";
import RoutesNotFound from "../../../utilities/RoutesNotFound";
import ListConfig from "../../../components/ContentManag/ContentOption/ListConfig/ListConfig";
import FileType from "../../../components/ContentManag/ContentOption/FileTypeConfig/FileTypeConfig";
import DataType from "../../../components/ContentManag/ContentOption/DataTypeConfig/DataTypeConfig";
import Indexes from "../../../components/ContentManag/ContentOption/IndexConfig/IndexConfig";

const Managment = () => {
  return (
    <ManagmentContainer>
      <AsideManag />
      <RoutesNotFound>
        <Route path="/" element={<Navigate to={PrivateRoutes.LIST} />} />
        <Route path={PrivateRoutes.LIST} element={<ListConfig />} />
        <Route path={PrivateRoutes.FILETYPE} element={<FileType />} />
        <Route path={PrivateRoutes.DATATYPE} element={<DataType />} />
        <Route path={PrivateRoutes.INDEXES} element={<Indexes />} />
      </RoutesNotFound>
    </ManagmentContainer>
  );
};

export default Managment;

const ManagmentContainer = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  @media (max-width: 767px) {
    height: 85vh;
  }
`;
