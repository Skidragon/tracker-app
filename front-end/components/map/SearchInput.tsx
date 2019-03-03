import { Input } from "antd";
//@ts-ignore
import styled from "styled-components";

const SearchBox = styled(Input.Search)`
  margin-top: 30px;
  max-width: 600px;
  width: 100%;
`;

interface Props {}

const SearchInput: React.SFC<Props> = () => {
  return (
    <SearchBox
      placeholder="Search a place, can't use without a google maps API key"
      onSearch={value => console.log(value)}
      enterButton
      size="large"
    />
  );
};

export default SearchInput;
