/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { DebugConfiguration, ShellExecution, ShellExecutionOptions, WorkspaceFolder } from 'vscode';
import { funcHostStartCommand, hostStartTaskName } from '../constants';
import { localize } from '../localize';
import { FuncDebugProviderBase } from './FuncDebugProviderBase';

export const defaultNodeDebugPort: number = 9229;

export const nodeDebugConfig: DebugConfiguration = {
    name: localize('attachJS', 'Attach to JavaScript Functions'),
    type: 'node',
    request: 'attach',
    port: defaultNodeDebugPort,
    preLaunchTask: hostStartTaskName
};

export class NodeDebugProvider extends FuncDebugProviderBase {
    protected readonly defaultPort: number = defaultNodeDebugPort;
    protected readonly debugConfig: DebugConfiguration = nodeDebugConfig;

    public async getShellExecution(folder: WorkspaceFolder): Promise<ShellExecution> {
        const port: number = this.getDebugPort(folder);
        const options: ShellExecutionOptions = { env: { languageWorkers__node__arguments: `--inspect=${port}` } };
        return new ShellExecution(funcHostStartCommand, options);
    }
}
