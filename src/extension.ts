import * as vscode from "vscode";
import { SettingsPanel } from "./panels/Settings";

export function activate(context: ExtensionContext) {

	let provider = new SettingsPanel(context.extensionUri, context.extensionPath);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			"icesetview",
			provider
		)
	);
}

// This method is called when your extension is deactivated
export function deactivate() {}
