Simple TS with default: {{ simple[desc] Translate }}.

Same TS with no default: {{ simple }}.

Another TS with no default: {{ nodefault }}.

TS with fixed text: {{fix-ts[fix] Fixed <fix>text</fix>}}.

Nested translation: {{nested-ts <a href="{{nested-link http://foo.com/}}">Foo</a> and <a href="{{nested-link2 http://baz.com/}}">Baz</a>}}.

Link resolving: {{linked-ts <a href="translate">This page</a>}}.

Link to a non-translatable page: {{linked-ts2 <a href="sitemap">Site map</a>}}.

Entity escaping: {{entity-ts Drag&drop}}.

Entity escaping in links: {{entity-lnk <a href="http://foo.com/?a&b">Foo</a>}}.
