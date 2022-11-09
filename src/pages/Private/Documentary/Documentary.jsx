import styled from 'styled-components';
import Aside from '../../../components/Aside/Aside';
import Content from '../../../components/Content/Content';
import Preview from '../../../components/Preview/Preview';

function Documentary() {
    return (
      <ContainerDocument>
        <Aside />
        <Content />
        <Preview />
      </ContainerDocument>
    )
  }
  
  export default Documentary;

const ContainerDocument = styled.div`
  width: 100%;
  display: flex;
`;

