import styled, { createGlobalStyle } from 'styled-components';

export const BodylStyle = createGlobalStyle`
  body {
    background: ${({ theme: { main } }) => main};
  }
`;

export const Navigation = styled.nav`
  position: fixed;
  z-index: 10;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 12px;
  top: 0;
  background-color: ${({ theme: { navigation } }) => navigation};
  height: 56px;
  box-shadow: rgba(0, 0, 0, 0.137255) 0px 0px 4px 0px,
    rgba(0, 0, 0, 0.278431) 0px 4px 8px 0px;
`;

export const Filter = styled.input`
  background: none;
  background-color: rgba(255, 255, 255, 0.15);
  border: none;
  color: #fff;
  font-size: 1.2em;
  height: 36px;
  min-width: 300px;
  padding: 5px 10px;
  &:focus {
    outline: none;
  }
  &::-webkit-input-placeholder {
    color: ${({ theme: { placeholder }}) => placeholder};
  }
`;

export const Main = styled.main`
  margin-top: 56px;
  background-color: ${({ theme: { main }}) => main}
`;

export const Section = styled.section`
  &.window {
    &:not(:first-child) {
      &:before {
        content: '';
        display: block;
        border-top: 1px solid ${({ theme: { section }}) => section};
        margin: 0 16px;
      }
    }
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  height: 48px;
`;

export const Title = styled.h2`
  font-size: 14px;
  margin: 0;
  padding: 0 16px;
  font-weight: normal;
`;

export const TabList = styled.ul`
  margin: 0;
  padding: 0;
`;