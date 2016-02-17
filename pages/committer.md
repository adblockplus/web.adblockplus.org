title=Committers

<h2 id="becoming-a-comitter">{{becoming-a-comitter Becoming a comitter}}</h2>

{{intro Anyone can [contribute code](contribute) to any of our projects. But if you're contributing to a project on a regular basis, it makes sense to request commit access.}}

{{ask-module-owner To become a committer for a project, ask the [module owner](modules) responsible for it. Make sure to include the following:}}

1. {{past-contributions A list of your past contributions - the module owner will decide whether to grant you access based on those.}}
2. {{ssh-key Your public SSH key.}}

<h2 id="rules">{{rules-for-comitters Rules for comitters}}</h2>

1. {{mandatory-reviews Don't push any change that hasn't been reviewed by the respective module owner.}}
2. {{no-branches Don't push any new bookmarks or branches without first getting approval from the repository's module owner. If you would like to work with temporary feature branches, please keep them locally, or on a personal fork of the repository (e.g. on [BitBucket](https://bitbucket.org/)). Please ensure to use `hg push -r master` either way, to only push your changes to the master branch.}}
3. {{dont-push-to-github If you have also been given write access to our GitHub mirrors, please never push any changes there, always push to _hg.adblockplus.org_ using Mercurial, the mirrors are being updated automatically.}}
