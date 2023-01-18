import { lazy } from "react";
import { Navigate, Route } from "react-router-dom";
import AsideRecycler from "../../../components/Aside/AsideRecycler/AsideRecycler";
import { PrivateRoutes } from "../../../models";
import RoutesNotFound from "../../../utilities/RoutesNotFound";
import styled from "styled-components";
import DeleteGroup from "../../../components/ContentRecycler/DeleteGroup/DeleteGroup";
import DeleteCabinet from "../../../components/ContentRecycler/DeleteCabinet/DeleteCabinet";
import DeleteFolder from "../../../components/ContentRecycler/DeleteFolder/DeleteFolder";
import DeleteIndex from "../../../components/ContentRecycler/DeleteIndex/DeleteIndex";
import DeleteTypeData from "../../../components/ContentRecycler/DeleteTypeData/DeleteTypeData";
import DeleteFileType from "../../../components/ContentRecycler/DeleteFileType/DeleteFileType";

const Recycler = () => {
  return (
    <RecyclerContainer>
      <AsideRecycler />
      <RoutesNotFound>
        <Route path="/" element={<Navigate to={PrivateRoutes.DELETEGROUP} />} />
        <Route path={PrivateRoutes.DELETEGROUP} element={<DeleteGroup />} />
        <Route path={PrivateRoutes.DELETECABINET} element={<DeleteCabinet />} />
        <Route path={PrivateRoutes.DELETEFOLDER} element={<DeleteFolder />} />
        <Route path={PrivateRoutes.DELETEINDEX} element={<DeleteIndex />} />
        <Route
          path={PrivateRoutes.DELETETYPEDATA}
          element={<DeleteTypeData />}
        />
        <Route
          path={PrivateRoutes.DELETEFILETYPE}
          element={<DeleteFileType />}
        />
      </RoutesNotFound>
    </RecyclerContainer>
  );
};

export default Recycler;

const RecyclerContainer = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  @media (max-width: 767px) {
    height: 85vh;
  }
`;
