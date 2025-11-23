import { useState } from "react";
import "./scss/App.scss";
import "./scss/Util.scss";
import "./assets/fonts.css";
import Main from "./view/Main";
import List from "./components/List";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { vscode } from "./utils/vscode"

function App() {

	let [state, setState] = useState({
		selected: null,
		items: []
	});

	function onItemEdit(i_event) {
		
		let o_clone = {...state};
		let i_target = i_event.target;

		let i_parent = i_target.parentNode;

		let s_name = i_parent.getAttribute("name");

		let o_found = state.items.filter(function(o_search) {
			return o_search.id == s_name;
		})[0];

		if (o_found) {
			o_clone.selected = {...o_found};
		}

		setState(o_clone);
	};

	function onItemRun(i_event) {

		let o_clone = {...state};
		let i_target = i_event.target;

		let i_parent = i_target.parentNode;

		let s_name = i_parent.getAttribute("name");

		let o_found = state.items.filter(function(o_search) {
			return o_search.id == s_name;
		})[0];

		if (o_found) {
			vscode.postMessage(o_found)
		}
	};

	window.addEventListener("message", function(i_event) {
		debugger;
		let o_clone = {...state};
		var a_servers = i_event.data || [];

		o_clone.items = a_servers;

		setState(o_clone);
	})

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="*" element= {<Main>
						<List state={state} onItemEdit={onItemEdit} onItemRun={onItemRun}>
						</List>
					</Main>}>
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
