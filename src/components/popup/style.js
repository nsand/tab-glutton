import styled from "styled-components";

export const Navigation = styled.nav`
  position: fixed;
  z-index: 10;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  background-color: #009688;
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
  min-width: 200px;
  padding: 5px 10px;
  &:focus {
    outline: none;
  }
  &::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.8);
  }
`;
