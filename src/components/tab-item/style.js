import styled from 'styled-components';

export const Title = styled.div`
  color: ${({ theme: { tab: { title } } }) => title};
  font-size: 13px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const URL = styled(Title)`
  color: ${({ theme : { tab: { link }}}) => link};
`

export const Details = styled.div`
  flex: 1;
  padding-left: 32px;
  overflow: hidden;
`;

export const Actions = styled.span`
  max-width: 0;
  transition: max-width 0.3s ease-out, opacity 0.3s ease-out;
  overflow: hidden;
  opacity: 0;
  display: flex;
  align-items: center;
`;

export const Pin = styled.svg`
  width: 32px;
  height: 32px;
  fill: #9E9E9E;
  opacity: 0;

  &:hover {
    fill: ${({ theme : { tab: { actionsHover }}}) => actionsHover};
  }

  &.pin--active {
    fill: ${({ theme : { tab: { pinActive }}}) => pinActive};
    opacity: 1;

    &:hover {
      fill: ${({ theme : { tab: { pinActive }}}) => pinActive};
    }
  }
`;

export const PlainButton = styled.button`
  -webkit-appearance: none;
  outline: none;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
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

  &:hover ${Pin} {
    opacity: 1;
  }

  &:hover {
    background-color: ${({ theme: { tab: { hover } } }) => hover};
  }

  &:hover ${Actions},
  &.tabItem--pinned ${Actions} {
    max-width: 200px;
    opacity: 1;
    padding-left: 16px;
    transition: max-width 0.3s ease-out, opacity 0.3s ease-out;
  }

  &.tabItem--pinned:not(:hover) ${Actions} ${PlainButton}:last-child {
    display: none;
  }

  img {
    width: 24px;
    height: 24px;
    display: inline-block;
  }

  &.tabItem--separated {
    &:after {
      content: '';
      display: block;
      border-top: 1px solid ${({ theme : { tab: { separator }}}) => separator};;
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


export const Favicon = styled.div`
  position: relative;
`;

export const Close = styled.svg`
  fill: #9E9E9E;

  &:hover {
    fill: ${({ theme : { tab: { actionsHover }}}) => actionsHover};
  }
`