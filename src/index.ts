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

// MODULES //

import { getInput, error, setFailed } from '@actions/core';
import { context, getOctokit } from '@actions/github';


// FUNCTIONS //

/**
* Returns a hydrated octokit ready to use for GitHub Actions.
* 
* @returns GitHub API client
*/
function octokit() {
	const token = getInput( 'GITHUB_TOKEN', { 
		required: true 
	});
	return getOctokit( token );
}


// MAIN //

/**
* Main function.
*/
async function main(): Promise<void> {
	try {
		const { repository, issue } = context.payload;
		if ( !issue ) {
			throw new Error( 'Aborting. Could not find issue information in the current context.' );
		}
		const [ owner, repo ] = repository.full_name.split( '/' );
		const octo = octokit();
		const assignment = getInput( 'assignment', { required: true });
		const assigned = assignment.split( ',' );
		for ( let i = 0; i < assigned.length; i++ ) {
			let [ label, user ] = assigned[ i ].split( '|' );
			label = label.trim();
			user = user.trim();
			if ( context.payload.label.name == label ) {
				await octo.rest.issues.addAssignees({
					owner,
					repo,
					issue_number: issue.number,
					assignees: [ user ]
				});
			}
		}
	} catch ( e ) {
		error( e );
		setFailed( e.message );
	}
}

main();