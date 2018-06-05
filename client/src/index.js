import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
	<Provider store={createStore(rootReducer)}>
		<Router>
			<App />
		</Router>
	</Provider>,
	document.getElementById("root")
);

registerServiceWorker();
