import styled from "styled-components";

import Header from "./Header";
import ContentList from "./ContentList";

const Main = () => {
  return (
    <ScrollContainer>
      <Header />
      <ContentList />
    </ScrollContainer>
  );
};

const ScrollContainer = styled.div`
  width: 100%;
  padding: 0 20px;
  position: absolute;
  right: 50%;
  top: 0;
  height: 100vh;
  transform: translateX(50%);
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default Main;
