
import './App.css';
import Index from "./page/index";
import { BrowserRouter } from "react-router-dom";
import {Provider} from "mobx-react";
import stores from "./store";


function App() {
  return(
      <Provider store={stores}>
          <BrowserRouter>
              <Index/>
          </BrowserRouter>
      </Provider>
  )
}

export default App;
