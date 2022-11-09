import { Link } from "react-router-dom";
import styled from "styled-components";

export const NavBarContainer = styled.div`
    background-color: var(--white);
    min-width: ${props => props.isActive ? "fit-Content" : "var(--navBarMinWidth)"};
    height: 100vh;
    position: sticky;
    top: 0;
    left: 0;
    box-shadow: -0.5rem 0 1.5rem -0.75rem rgba(0, 0, 0, 0.5);
    z-index: 1;
`;

const separetorContainer = styled.div`
  min-width: var(--navBarMinWidth);
  height: var(--navBarMinWidth);
`;

export const LogoContainer = styled(separetorContainer)`
  position: relative;
  background-image: url(${props => props.logo});
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  &::after {
    content: "";
    width: 100%;
    height: 1px;
    background-color: var(--lineColor);
    position: absolute;
    bottom: 0;
  }
`;

export const NavLinkContainer = styled(Link)`
  display: flex;
  min-width: var(--navBarMinWidth);
  height: var(--navBarMinWidth);
  padding: 0 1.5rem;
  align-items: center;
  &:hover {
    background-color: rgba(196, 196, 196, 0.15);
  }
`;

export const NavLinkName = styled.span`
  margin-left: 1rem;
  font-weight: 700;
  color: var(--primaryColor);
`;