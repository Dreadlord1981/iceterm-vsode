import * as vscode from "vscode";
import { getUri } from "../utils/getUri";
import { getNonce } from "../utils/getNonce";
import { format, FormatInputPathObject } from "node:path";


export class SettingsPanel implements vscode.WebviewViewProvider {

	private _view?: vscode.WebviewView;
	
	public constructor(
		private _extensionUri: vscode.Uri,
		private _path: any,
		private _servers: any
	) {
		var i_self = this;
		i_self._extensionUri = _extensionUri;
		i_self._path = _path;
		i_self._servers = _servers;
	}

	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		_context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken,
	) {

		var i_self = this;

		i_self._view = webviewView;

		webviewView.webview.options = {

			enableScripts: true,

			localResourceRoots: [
				i_self._extensionUri
			]
		};

		webviewView.webview.html = i_self._getWebviewContent(i_self._view.webview, i_self._extensionUri);

		i_self._setWebviewMessageListener(webviewView.webview);

		setTimeout(function() {
			webviewView.webview.postMessage(i_self._servers);
		}, 10)
	}


	public dispose() {}

	/**
	 * Defines and returns the HTML that should be rendered within the webview panel.
	 *
	 * @remarks This is also the place where references to the React webview build files
	 * are created and inserted into the webview HTML.
	 *
	 * @param webview A reference to the extension webview
	 * @param extensionUri The URI of the directory containing the extension
	 * @returns A template string literal containing the HTML that should be
	 * rendered within the webview panel
	 */
	private _getWebviewContent(webview: vscode.Webview, extensionUri: vscode.Uri) {
		// The CSS file from the React build output
		const stylesUri = getUri(webview, extensionUri, ["webview-ui", "build", "assets", "index.css"]);
		// The JS file from the React build output
		const scriptUri = getUri(webview, extensionUri, ["webview-ui", "build", "assets", "index.js"]);

		const nonce = getNonce();

		// Tip: Install the es6-string-html VS Code extension to enable code highlighting below
		return /*html*/ `
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
				<link rel="stylesheet" type="text/css" href="${stylesUri}">
				<title>Hello World</title>
			</head>
			<body>
				<div id="root"></div>
				<script type="module" nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>
		`;
	}

	/**
	 * Sets up an event listener to listen for messages passed from the webview context and
	 * executes code based on the message that is recieved.
	 *
	 * @param webview A reference to the extension webview
	 * @param context A reference to the extension context
	 */
	private _setWebviewMessageListener(webview: vscode.Webview) {

		let i_self = this;

		webview.onDidReceiveMessage((message: any) => {

			let o_config = message;

			let s_src = o_config.src;
			let s_text = o_config.title;

			let s_cmd = format({
				dir: i_self._path,
				base: "bin"
			} as FormatInputPathObject);

			s_cmd = format({
				dir: s_cmd,
				base: "iceterm.exe"
			} as FormatInputPathObject);

			s_cmd = s_cmd.replaceAll(/\w+(?:[ ]+)\w+/g, "\"$&\"");

			if (process.platform == "win32") {

				s_cmd = s_cmd.replaceAll("\\", "\\\\");
			}

			let i_terminal = vscode.window.createTerminal({
				name: s_text,
				location: vscode.TerminalLocation.Editor
			});

			let s_call = `${s_cmd} -u ${s_src}; exit`;

			i_terminal.show();
			i_terminal.sendText(`${s_call}`);
		});
	}
}