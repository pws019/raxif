"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const logService_1 = require("./logService");
const index_js_1 = require("./handler/index.js");
const loggingService = new logService_1.LoggingService();
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
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
            loggingService.logInfo("No active document. Nothing was formatted.");
            return;
        }
        loggingService.logInfo("Forced formatting will not use ignore files.");
        // 编辑器对象
        // 获取所有选中文本
        const allSelections = editor.selections;
        editor.edit(editBuilder => {
            // 遍历并替换文本
            allSelections.forEach((selection) => __awaiter(this, void 0, void 0, function* () {
                const text = editor.document.getText(selection);
                const res = yield (0, index_js_1.default)(text);
                editBuilder.replace(selection, res);
            }));
        });
        context.subscriptions.push(disposable);
    });
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map