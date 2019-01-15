/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { DebugConfiguration, ShellExecution, ShellExecutionOptions, WorkspaceFolder } from 'vscode';
import { funcHostStartCommand, hostStartTaskName, localhost } from '../constants';
import { localize } from '../localize';
import { FuncDebugProviderBase } from './FuncDebugProviderBase';

export const defaultJavaDebugPort: number = 5005;

export const javaDebugConfig: DebugConfiguration = {
    name: localize('attachJava', 'Attach to Java Functions'),
    type: 'java',
    request: 'attach',
    hostName: localhost,
    port: defaultJavaDebugPort,
    preLaunchTask: hostStartTaskName
};

export class JavaDebugProvider extends FuncDebugProviderBase {
    protected readonly defaultPort: number = defaultJavaDebugPort;
    protected readonly debugConfig: DebugConfiguration = javaDebugConfig;

    public async getShellExecution(folder: WorkspaceFolder): Promise<ShellExecution> {
        const port: number = this.getDebugPort(folder);
        const options: ShellExecutionOptions = { env: { languageWorkers__java__arguments: `-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=${port}` } };
        return new ShellExecution(funcHostStartCommand, options);
    }
}
