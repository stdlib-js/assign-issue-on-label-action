<!--

@license Apache-2.0

Copyright (c) 2021 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->

# Assign Issue On Label Action

> A GitHub action to automatically assign users to issues based on issue labels.

## Example Workflow

```yml
# Workflow name:
name: Assign Issues to Users

# Workflow triggers:
on:
  issues:
    types: [labeled]

# Workflow jobs:
jobs:
  assign:
    # Define the type of virtual host machine on which to run the job:
    runs-on: ubuntu-latest

    # Define the sequence of job steps...
    steps:
      # Assign issues to users based on specified `<label> | <username>` pairs:
      - uses: stdlib-js/assign-issue-on-label-action@v2
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          assignment: philipp | Planeshifter, athan | kgryte
```


## Inputs

 -   `GITHUB_TOKEN` (string) **required**: GitHub personal access token with `repo` scope.
 -   `assignment` (string) **required**: Comma-separated list of `<label> | <username>` pairs to assign users to issues based on labels.


## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2021-2024. The Stdlib [Authors][stdlib-authors].

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/assign-issue-on-label-action/master/LICENSE

</section>

<!-- /.links -->
