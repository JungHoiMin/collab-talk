import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '@layouts/App';
import {Provider} from "react-redux";
import {store} from "@stores/Store";
import {createRoot} from "react-dom/client";

const container = document.getElementById('app') as HTMLElement;
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
