## Releasing a new Primer version 🎉


### In `primer/primer`:


1. Go through the tracking PR and make sure everything listed is merged in.

2. To update the changelog for your release, click on the details links for the continuous-integration/travis-ci/push build. Expand the `Deploying application` output and copy the changelog content. Update the [CHANGELOG.md](https://github.com/primer/primer/blob/master/CHANGELOG.md) file with the changelog content from build

    **Note**: the CHANGELOG contents may be hidden within a collapsed section of the Travis logs under `Deploying the application`. Click the ▶ to the left of that section to expand it:
    
   ![image](https://user-images.githubusercontent.com/113896/48871307-0be2eb00-ed99-11e8-97ab-b9119ac4b7d3.png)

    Then scroll to the bottom of the page, and copy all of the text between the `Unreleased (YYYY-MM-DD)` heading and the exit status message. You may need to copy _before_ releasing your mouse to prevent Travis from collapsing that section of the logs first:
    
   ![image](https://user-images.githubusercontent.com/113896/48871298-f7065780-ed98-11e8-9160-c1016d61d042.png)

3. Bump the package versions in your terminal:

   ```sh
   npm run bump
   ```

4. Run `script/check-versions` to catch any cross-module version mismatches. (This will run on Travis, too.)

5. Test your changes with the latest release candidate version in the appropriate places (styleguide, storybook, github/github).

6. Once the release PR is approved and you've done necessary testing, merge to `master`. This will trigger publishing to npm.

7. Create a new release branch for the next release from `master` and name it `release-<version>`. Please use the following template for the PR description, linking to the relevant issues and/or pull requests for each change, and removing irrelevant headings:

    ```md
    # Primer [Major|Minor|Patch] Release

    Version: 📦 **0.0.0**
    Approximate release date: 📆 DD/MM/YY

    ### :boom: Breaking Change
    - [ ] Description #

    ### :rocket: Enhancement
    - [ ] Description #

    ### :bug: Bug Fix
    - [ ] Description #
    
    ### :nail_care: Polish
    - [ ] Description #
    
    ### :memo: Documentation
    - [ ] Description #
    
    ### :house: Internal
    - [ ] Description #

    ----

    ### Ship checklist

    - [ ] Update `CHANGELOG.md`
    - [ ] Run version bump
    - [ ] Create a [new release](https://github.com/primer/primer/releases/new)
    - [ ] Update github/github with released version
    - [ ] Update github/styleguide with released version
    - [ ] Create a new pull request for the next release

    /cc @primer/ds-core
    ```


### In `github/github`:

1. Create a new branch

2. Update the primer version in your terminal  `bin/npm install primer@<version>`.

3. Update `stylelint-config-primer` in your terminal to the appropriate version `bin/npm install stylelint-config-primer@latest`.

4. If you need to make changes to github/github due to the Primer release, make a separate branch. When ready, merge that branch into your release branch.

5. Add reviewers.

6. Check that every deleted vendor file has an accompanying updated vendor file and that the version numbers look correct.

7. Test on review-lab.

8. When ready, merge! 🎉


## Other items that need to be done after publishing Primer

#### Update the Style Guide

1. In [github/styleguide](https://github.com/github/styleguide), update `primer` by following [these instructions](https://github.com/github/styleguide/#adding-new-content-from-primer).

2. Commit your changes, make a pull request, get it approved, and merge! 🚀


#### Publish release tag

1. Create a new release tag [here](https://github.com/primer/primer/releases/new).

2. Copy the changes from the [CHANGELOG](https://github.com/primer/primer/blob/master/CHANGELOG.md) and paste it into the release notes.

3. Publish 🎉
