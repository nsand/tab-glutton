import styled from 'styled-components';

export const TabTitle = styled.nav`
  color: ${({ theme: { tab: { title } } }) => title};
  font-size: 13px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Item = styled.li`
  list-style: none;
  cursor: default;
  padding: 0 16px;
  height: 48px;
  display: flex;
  align-items: center;
  border-left: 3px solid transparent;
  position: relative;
  background-color: ${({ theme: { tab: { background } } }) => background};

  img {
    width: 24px;
    height: 24px;
    display: inline-block;
  }

  &:hover .pin {
    opacity: 1;
  }

  &:hover {
    background-color: ${({ theme: { tab: { hover } } }) => hover};
  }

  &.tabItem--separated {
    composes: tabItem;
    &:after {
      content: '';
      display: block;
      border-top: 1px solid #ddd;
      position: absolute;
      bottom: 0;
      left: 72px;
      width: 100%;
    }
  }
  
  &.tabItem--expanded {
    composes: tabItem;
    box-shadow: 0 0 4px 0 rgba(0,0,0,.137255), 0 4px 8px 0 rgba(0,0,0,.278431);
    margin: 12px;
  }

  &.tabItem--active {
    border-left: 3px solid ${({ theme: { tab: { active } } }) => active};
  }
`;

export const Audible = styled.svg`
  fill: ${({ theme : { tab: { audioIcon }}}) => audioIcon};
  position: absolute;
  width: 15px;
  height: 15px;
  bottom: -7px;
  right: -10px;
`;