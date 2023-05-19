import styled from "styled-components";
import { HeaderPrimary } from "../../../components/ContentAnalytic/HeaderPrimary";
import { InfoChart } from "../../../components/ContentAnalytic/InfoChart";
import { InfoPersonByYear } from "../../../components/ContentAnalytic/InfoPersonByYear";
import { InfoTopPersonNoDoc } from "../../../components/ContentAnalytic/InfoTopPersonNoDoc";
import { HeaderFilter } from "../../../components/ContentAnalytic/HeaderFilter";
import { FilterFileTypePerson } from "../../../components/ContentAnalytic/FilterFileTypePerson";
import { TotalCountFile } from "../../../components/ContentAnalytic/TotalCountFile";

const Analityc = () => {
  return (
    <>
      <ContentContainer>
        <FilterContent>
          <HeaderPrimary />
        </FilterContent>

        <DocumentContainer>
          <ContainerHeaderComparative>
            <InfoChart />
          </ContainerHeaderComparative>

          <br />
          <br />
          <br />

          <ContentAnalytic>
            <InfoPersonByYear />
          </ContentAnalytic>

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <ContentAnalytic>
            <InfoTopPersonNoDoc />
          </ContentAnalytic>

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <ContainerHeader>
            <HeaderFilter />
          </ContainerHeader>

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <ContentAnalyticPie>
            <FilterFileTypePerson />
          </ContentAnalyticPie>

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <ContentAnalytic>
            <TotalCountFile />
          </ContentAnalytic>
        </DocumentContainer>
      </ContentContainer>
    </>
  );
};

export default Analityc;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;

  @media (max-width: 767px) {
    padding: 0;
  }
`;

const FilterContent = styled.div`
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1;
`;

const DocumentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ContainerHeaderComparative = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentAnalytic = styled.div`
  width: 100%;
  height: 280px;
`;

const ContainerHeader = styled.div`
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  border: 1px solid #630e8a;
`;

const ContentAnalyticPie = styled.div`
  width: 100%;
  height: 290px;
`;
