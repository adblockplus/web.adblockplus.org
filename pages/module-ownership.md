title=Module ownership


{{mozilla We're using a module ownership system similar to <a href="http://www.mozilla.org/hacking/module-ownership.html">what Mozilla has</a>.}}

## {{owner-role-title The module owner role}}

{{owner-role-text Module owners have functional authority and responsibility over their area. Only the respective super reviewer can overrule their decisions, but this should not be necessary in practice.}}

### {{responsibilities Responsibilities for module owners}}

* {{review Review and approve all changes to the module}}
* {{commit-access Grant or revoke commit access}}
* {{quality Maintain and improve quality}}
* {{set-priotities Set the priority of new issues and reject them if necessary}}
* {{tackle-priorities Ensure all high priority issues get tackled}}

## {{super-reviewer-role-title Super reviewers}}

{{super-reviewer-role-text Each module has a designated super reviewer, who will oversee things at a higher level.}}

### {{super-reviews-title Super reviews}}

{{super-reviews-text While the module owner will review all changes, certain changes should also be reviewed by the super reviewer, in particular:}}

* {{api-changes API changes (both public API as well as API between modules)}}
* {{refactoring Major refactoring}}
* {{subprojects New subprojects}}

{{super-reviews-process For these types of changes, the module owner should review first and make sure that all of their comments are addressed, then request a super review.}}
