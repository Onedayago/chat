
import './App.css';
import Index from "./page/index";
import { BrowserRouter, useLocation } from "react-router-dom";
import {Provider} from "mobx-react";
import stores from "./store";
import { EventEmitter } from "events";

global.eventBus = new EventEmitter();

function App() {

    return(
      <Provider stores={stores}>
          <BrowserRouter>
              <Index/>
          </BrowserRouter>
      </Provider>
    )
}

export default App;
