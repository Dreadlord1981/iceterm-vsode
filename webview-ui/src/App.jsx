import { useState } from "react";
import "./scss/App.scss";
import "./scss/Util.scss";
import "./assets/fonts.css";
import Main from "./view/Main";
import List from "./components/List";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { vscode } from "./utils/vscode"

function App() {
	const [state, setState] = useState({
		selected: null,
		items: [
			{
				id: "DKSRV206",
				title: "DKSRV206",
				src: "http://dksrv206:35700"
			},
			{
				id: "DKSRV135",
				title: "DKSRV135",
				src: "http://dksrv135:7143"
			}
		]
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
