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

  &:hover {
    background-color: ${({ theme: { tab: { hover } } }) => hover};
  }
`
