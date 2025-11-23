import * as vscode from "vscode";
import { SettingsPanel } from "./panels/Settings";
import { existsSync, readFileSync } from "node:fs";

export function activate(context: vscode.ExtensionContext) {

	let s_local_app_data = process.env.LOCALAPPDATA;
	let a_servers = [];

	if (s_local_app_data) {

		let s_path = [
			s_local_app_data,
			"Portfolio Environment Manager",
			"servers.json"
		].join("\\");

		if (existsSync(s_path)) {
			let s_data = readFileSync(s_path, 'utf8');
			try {
				a_servers = JSON.parse(s_data)
			}
			catch(err) {
				a_servers = [];
			}
		}		
	}

	let provider = new SettingsPanel(context.extensionUri, context.extensionPath, a_servers);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			"icesetview",
			provider
		)
	);
}

// This method is called when your extension is deactivated
export function deactivate() {}
