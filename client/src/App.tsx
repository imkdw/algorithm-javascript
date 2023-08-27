import styled from "styled-components";
import Alarm from "./pages/alarm/Alarm";
import Articles from "./pages/articles/Articles";

const StyledApp = styled.div`
  display: flex;
`;

export default function App() {
  return (
    <StyledApp>
      <Articles />
      <Alarm />
    </StyledApp>
  );
}
