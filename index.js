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

const core = require( '@actions/core' );
const github = require( '@actions/github' );


// FUNCTIONS //

function getOctokit() {
	const token = core.getInput( 'GITHUB_TOKEN', { 
		required: true 
	});
	return github.getOctokit( token );
}


// MAIN //

async function main() {
	try {
		const context = github.context;
		const { repository, issue } = context.payload;
		if ( !issue ) {
			throw new Error( 'Aborting. Could not find issue information in the current context.' );
		}
		const [ owner, repo ] = repository.full_name.split( '/' );
		const octokit = getOctokit();
		let assignees = core.getInput( 'assignees', { required: true });
		assignees = assignees.split( ',' );
		assignees.forEach( ( name ) => {
			name = name.trim();
			if ( context.payload.label.name == name ) {
				await octokit.issues.addAssignees({
					owner,
					repo,
					issue_number: issue.number,
					assignees: name
				});
			}
		});
	} catch ( e ) {
		core.error( e );
		core.setFailed( e.message );
	}
}

main();