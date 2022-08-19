import "./App.Css";
import DictList from "./DictList";
import { Route, Link, Switch } from "react-router-dom";
import AddDict from "./AddDict";
import styled from "styled-components";
import NotFound from "./NotFound";

function App() {
  return (
    <div className="App">
      <Container>
        <Wrapper>
          <Switch>
            <Route exact path="/" component={DictList}></Route>
            <Route path="/word/:type" component={AddDict}></Route>
            <Route component={NotFound}></Route>
          </Switch>
        </Wrapper>
      </Container>
    </div>
  );
}
const Container = styled.div`
  background-color: skyblue;
  max-width: 50vw;
  margin: auto;
`;

const Wrapper = styled.div`
  padding: 20px 10px;
  position: relative;
`;

export default App;
