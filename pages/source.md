title=Source Code


{{repositories The Adblock Plus project consists of multiple repositories. The [modules](modules) page has a good overview of the most important ones.}}

<h2 id="source">{{mercurial-title Getting the source code from the Mercurial repositories}}</h2>

{{mercurial-text The Adblock Plus source code is hosted on our [Mercurial](http://mercurial.selenic.com/) server. You can see a list of all repositories through the [web interface](https://hg.adblockplus.org/).}}

{{mercurial-clone Here's how you clone the Adblock Plus for Firefox repository:}}

    hg clone -u master https://hg.adblockplus.org/adblockplus/

{{mercurial-tag Here's how you get the source code for a specific version (e.g. <fix>Adblock Plus 2.3.1</fix>):}}

    hg update -r 2.3.1

### {{mercurial-bookmarks-title Mercurial bookmarks}}

{{mercurial-bookmarks-text We are using Mercurial bookmarks for branching. All of our repositories (except for _adblockbrowser_, see below) have a _master_ bookmark that points to the latest development version. When cloning a repository, you have to activate that bookmark. If you ran `hg clone -u master` as shown above, this has already happened. If you cloned without the `-u` option, you will need to run `hg update master` once.}}

### {{mercurial-documentation Mercurial documentation}}

* [{{mercurial-quickstart Mercurial quickstart}}](https://www.mercurial-scm.org/wiki/QuickStart)
* [{{mercurial-bookmarks Working with Mercurial bookmarks}}](https://www.mercurial-scm.org/wiki/Bookmarks)
* [{{mercurial-mozilla Mercurial for Mozillians}}](http://mozilla-version-control-tools.readthedocs.org/en/latest/hgmozilla/index.html)
* [{{mercurial-book Mercurial: The definite guide (hgbook)}}](http://hgbook.red-bean.com)
* [{{mercurial-other-tools GUI client and other tools}}](https://www.mercurial-scm.org/wiki/OtherTools)
* [{{mercurial-git Mercurial for Git users}}](https://www.mercurial-scm.org/wiki/GitConcepts)

<h2 id="adblockbrowser">{{adblockbrowser-repo-title The adblockbrowser repository}}</h2>

{{adblockbrowser-repo-text The _adblockbrowser_ repository is a bit different, because it is a fork of Mozilla's [mozilla-release](https://hg.mozilla.org/releases/mozilla-release) repository. All of our changes are not in the _default_ branch, but in the _adblockbrowser_ branch, we prefix all of our tag names with `abb-` to avoid conflicts with upstream, and we do not use Mercurial bookmarks there at this point. Here's how you would clone it:}}

    hg clone -u adblockbrowser https://hg.adblockplus.org/adblockbrowser/

<h2 id="github">{{github-title Getting the source code from the GitHub mirrors}}</h2>

{{github-text If you prefer to use Git, you can - we have [GitHub mirrors](https://github.com/adblockplus/) for most of our public repositories.}}

{{github-notice **Please note:** We are maintaining the GitHub mirrors to make it easier for new contributors to contribute to the Adblock Plus project without having to learn new tools. For regular contributors, using Mercurial is recommended.}}

{{github-clone Here's how you clone the Adblock Plus for Firefox repository from GitHub:}}

    git clone https://github.com/adblockplus/adblockplus/

{{github-tag Here's how you get the source code for a specific version (e.g. <fix> Adblock Plus 2.3.1</fix>):}}

    git checkout 2.3.1

<h2 id="build">{{build-title Build instructions}}</h2>

{{build-text Most of our repositories have _README.md_ files with build instructions, please refer to those.}}

<h2 id="documentation">{{code-documentation-title Source code documentation}}</h2>

{{code-documentation-text We have automatically generated [source code documentation](documentation_advanced#code-documentation) for some projects.}}
