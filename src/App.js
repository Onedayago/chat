
import './App.css';
import React, {useEffect} from "react";
import Index from "./page/index";
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom";
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
