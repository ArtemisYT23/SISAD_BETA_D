import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import NavBarIcon from "./Icons";
import {
  getAllViewListAndTraditional,
  getAllViewGridAndTraditional,
} from "../../../../redux/states/View";
import { setCleanerModalCore } from "../../../../redux/states/ActionCore";
import { setClearDataActiveDocumentary } from "../../../../redux/states/ActionDocumentary";
import { Tooltip } from "@material-ui/core";

const OptionView = () => {
  const dispatch = useDispatch();
  const [push, setPush] = useState("GridViewInactive");
  const [pushed, setPushed] = useState("");

  const ChangeOptionViewList = () => {
    dispatch(getAllViewListAndTraditional());
    dispatch(setCleanerModalCore());
    dispatch(setClearDataActiveDocumentary());
  };

  const ChangeOptionViewGrid = () => {
    dispatch(getAllViewGridAndTraditional());
    dispatch(setCleanerModalCore());
    dispatch(setClearDataActiveDocumentary());
  };

  const ActiveGrid = () => {
    setPushed("TraditionalView");
    setPush("GridViewInactive");
  };

  const ActiveTraditional = () => {
    setPush("GridView");
    setPushed("TraditionalViewInactive");
  };

  return (
    <ViewsTypeContainerCabinet>
      <NameLabel>Vista: </NameLabel>
      <ContainerIcon>
        <Tooltip title="Grid">
          <Grid
            onClick={() => {
              ActiveGrid(), ChangeOptionViewGrid();
            }}
          >
            <NavBarIcon name="gridview" push={push} />
          </Grid>
        </Tooltip>
        <Tooltip title="Tradicional">
          <Traditional
            onClick={() => {
              ChangeOptionViewList(), ActiveTraditional();
            }}
          >
            <NavBarIcon name="traditional" pushed={pushed} />
          </Traditional>
        </Tooltip>
      </ContainerIcon>
    </ViewsTypeContainerCabinet>
  );
};

export default OptionView;

const ViewsTypeContainerCabinet = styled.div`
  width: 15%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const NameLabel = styled.span`
  color: var(--lineColor);
  padding: 0 1rem 0 0;
`;

const ContainerIcon = styled.div`
  display: flex;
  width: 100%;
`;

const Grid = styled.div`
  padding: 0.2rem;
`;

const Traditional = styled.div`
  padding: 0.2rem;
`;
