import styled from 'styled-components';

export const TabTitle = styled.nav`
  color: ${({ theme: { tab: { title } } }) => title};
  font-size: 13px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
