/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as fse from 'fs-extra';
import * as path from 'path';
import { gitignoreFileName, hostFileName, localSettingsFileName } from '../../constants';

export async function isFunctionProject(folderPath: string): Promise<boolean> {
    const gitignorePath: string = path.join(folderPath, gitignoreFileName);
    let gitignoreContents: string = '';
    if (await fse.pathExists(gitignorePath)) {
        gitignoreContents = (await fse.readFile(gitignorePath)).toString();
    }

    return await fse.pathExists(path.join(folderPath, hostFileName)) && (await fse.pathExists(path.join(folderPath, localSettingsFileName)) || gitignoreContents.includes(localSettingsFileName));
}
