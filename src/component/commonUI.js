// modules
import styled from 'styled-components';

export const Btn = styled.button.withConfig({
  shouldForwardProp: (prop) => !['version', 'page'].includes(prop),
})`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${(props) => (props.version ?? 'v1') === 'v2' ? '4px' : '0'};
  background-color: ${(props) =>
    props.version === 'v1' ? '#ffffff' : '#214AEE'};
  color: ${(props) => props.version === 'v1' ? '#214AEE' : '#fff'};
  padding: 0 30px;
  height: ${(props) =>
    props.page === 'detail' ? '60px' : props.version === 'v2' ? '45px' : '40px'};
  border: 3px solid;
  border-color: ${(props) =>
    props.version === 'v2' ? '#FFEA7D' : props.version === 'v3' ? '#fff' : '#214AEE'};
  word-break: keep-all;
  white-space: nowrap;
  border-radius: ${(props) => props.page === 'detail' ? '5px' : '30px'};
  font-size: 1.125rem;
  font-weight: ${(props) => props.version === 'v2' ? '700' : '500'};
  cursor: pointer;
  transition: color 0.5s, border-color 0.5s, background-color 0.5s;

  &:hover {
    background-color: ${(props) =>
      props.version === 'v2' ? '#FFEA7D' : props.version === 'v3' ? '#fff' : '#214AEE'};
    color: ${(props) => props.version === 'v1' ? '#fff' : '#214AEE'};
    font-weight: 700;
  }
`;