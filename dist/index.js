"use strict";
/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
Object.defineProperty(exports, "__esModule", { value: true });
// MODULES //
const core_1 = require("@actions/core");
const github_1 = require("@actions/github");
// FUNCTIONS //
function octokit() {
    const token = (0, core_1.getInput)('GITHUB_TOKEN', {
        required: true
    });
    return (0, github_1.getOctokit)(token);
}
// MAIN //
async function main() {
    try {
        const { repository, issue } = github_1.context.payload;
        if (!issue) {
            throw new Error('Aborting. Could not find issue information in the current context.');
        }
        const [owner, repo] = repository.full_name.split('/');
        const octo = octokit();
        const assignment = (0, core_1.getInput)('assignment', { required: true });
        const assigned = assignment.split(',');
        for (let i = 0; i < assigned.length; i++) {
            let [label, user] = assigned[i].split('|');
            label = label.trim();
            user = user.trim();
            if (github_1.context.payload.label.name == label) {
                await octo.rest.issues.addAssignees({
                    owner,
                    repo,
                    issue_number: issue.number,
                    assignees: [user]
                });
            }
        }
    }
    catch (e) {
        (0, core_1.error)(e);
        (0, core_1.setFailed)(e.message);
    }
}
main();
//# sourceMappingURL=index.js.map