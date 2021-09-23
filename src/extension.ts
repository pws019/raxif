// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { LoggingService } from "./logService";
import format from './handler/index.js'


const loggingService: LoggingService = new LoggingService();
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "raxif" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('raxif.format', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from RaxIf!');
		const editor = vscode.window.activeTextEditor;

		if (!editor) {
			loggingService.logInfo(
				"No active document. Nothing was formatted."
			);
			return;
		}

		loggingService.logInfo(
			"Forced formatting will not use ignore files."
		);

		// 编辑器对象
		// 获取所有选中文本
		const allSelections = editor.selections;

		allSelections.forEach(async (selection) => {
			const text = editor.document.getText(selection);
			try {
				var res = await format(text);
			} catch(err) {
				console.log(err);
			}
			
			editor.edit(editBuilder => {
				editBuilder.replace(selection, res);
			})
		})

		// editor.edit(editBuilder => {
		// 	// 遍历并替换文本
		// 	allSelections.forEach((selection) => {
		// 		const text = editor.document.getText(selection);
		// 		try {
		// 			var res = format(text);
		// 		} catch(err) {
		// 			console.log(err);
		// 		}
				
		// 		editBuilder.replace(selection, res);
		// 	})
		// })

		context.subscriptions.push(disposable);
	});


}

// this method is called when your extension is deactivated
export function deactivate() { }
