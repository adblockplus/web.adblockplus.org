title=Editor Styleguide
template=editor-toc
robots=none

## Headings { #leveled-headings .border-bottom .mt1 }

# Heading level 1
## Heading level 2
### Heading level 3
#### Heading level 4
##### Heading level 5

### Releveled headings { #releveled-headings .h4 .border-bottom .mt2 .mb1 }

> ### Why relevel headings? { .h5 }
>
> Every heading creates a subsection. If you want to create a smaller heading
> without creating a subsection then you can use these classes.

# Heading level 1 { .h5 }
## Heading level 2 { .h4 }
### Heading level 3 { .h3 }
#### Heading level 4 { .h2 }
##### Heading level 5 { .h1 }

### Display headings { #display-headings .h4 .border-bottom .mt2 .mb1 }

> ### What are display headings? { .h5 }
>
> Display headings are huge headings meant for hero sections (page banners).

# Heading level 1 { .display-1 }
## Heading level 2 { .display-2 }
### Heading level 3 { .display-3 }

## Text { #text .border-bottom .mt2 }

This is lead text
{ .lead }

This is **strong**

This is *emphasized*

HTML is an abbreviation.

*[HTML]: Hyper Text Markup Language

Footnote link [^first]. Footnote link [^second].

Inline `code`

```
Blocks
of
code
```

This is separated by a

---

Horizontal rule.

> This is a blockquote
>> This is a nested blockquote

## Links { #regular-links .border-bottom .mt2 }

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

### Reference style links { #reference-links .h4 .border-bottom .mt2 .mb1 }

> See the URL for \[example\] at the bottom of `pages/editor-styleguide.md`.

[Example 1][example]

### Button style links { #button-links .h4 .border-bottom .mt2 .mb1 }

> The `{ .full-width }` image modifier works on buttons too :\)

[Green button][example]{ .button }

[Blue button][example]{ .button .button--blue }

[Gold button][example]{ .button .button--gold }

[Black button][example]{ .button .button--black }

## Images { #images .border-bottom .mt2 }

![Alt text](https://placehold.co/300x200?text=Inline%201)
![Alt text](https://placehold.co/300x200?text=Inline%202 "Title text!")

### Reference style images { #reference-images .h4 .border-bottom .mt2 .mb1 }

> See the URL for \[example\] at the bottom of `pages/editor-styleguide.md`.

![Alt text][example]

### Images in text { #images-in-text .h4 .border-bottom .mt2 .mb1 }

![check][check] this starts with an image
{ .inline-image-start }

This has an image ![cross][cross] in the middle
{ .inline-image }

### Full-width images { #full-width-images .h4 .border-bottom .mt2 .mb1 }

![Full width][full-width]{ .full-width }

## lists { #lists .border-bottom .mt2 }

### Unordered lists { #unordered-lists .h4 .border-bottom .mt2 .mb1 }

- Create a list by starting a line with `-`
- Sub-lists are made by indenting 4 spaces:
    - Ac tristique libero volutpat at
    - Facilisis in pretium nisl aliquet

### Ordered lists { #ordered-lists .h4 .border-bottom .mt2 .mb1 }

1. Lorem ipsum dolor sit amet
1. Consectetur adipiscing elit
    1. Lorem ipsum dolor sit amet
    1. Consectetur adipiscing elit

### Definition lists { #definition-lists .h4 .border-bottom .mt2 .mb1 }

Term 1
:   Definition 1

Term 2
:   Definition 2

### Unstyled lists { #unstyled-lists .h4 .border-bottom .mt2 .mb1 }

<? include editor/unstyled-start ?>

- Item 1
- Item 2
    - ![check][check] Item 3 (with image at start)
    { .inline-image-start }
    - ![cross][cross] Item 4 (with image at start)
    { .inline-image-start }

<? include editor/unstyled-end ?>

## Accordions { #accordions .border-bottom .mt2 }

<? include editor/accordion-heading-start ?>

[Item heading 1](#)

<? include editor/accordion-heading-end ?>

<? include editor/accordion-body-start ?>

Item body 1

<? include editor/accordion-body-end ?>

<? include editor/accordion-heading-start ?>

[Item heading 2](#)

<? include editor/accordion-heading-end ?>

<? include editor/accordion-body-start ?>

Item body 2

<? include editor/accordion-body-end ?>

<? include editor/accordion-heading-start ?>

[Item heading 3](#)

<? include editor/accordion-heading-end ?>

<? include editor/accordion-body-start ?>

Item body 3

<? include editor/accordion-body-end ?>

## Alerts { #alerts .border-bottom .mt2 }

**Danger**: bla bla bla
{ .alert--red }

**Warning**: bla bla bla
{ .alert--gold }

**Info**: bla bla bla
{ .alert--blue }

## Alignment { #align-text .border-bottom .mt2 }

### Align individual blocks { #align-block .h4 .border-bottom .mt2 .mb1 }

This is aligned start
{ .start }

This is aligned centerp
{ .center }

This is aligned end
{ .end }

### Align multiple blocks { #align-blocks .h4 .border-bottom .mt2 .mb1 }

<? include editor/align-start-start ?>

This is aligned start

So is this

<? include editor/align-end ?>

<? include editor/align-center-start ?>

This is aligned center

So is this

<? include editor/align-end ?>

<? include editor/align-end-start ?>

This is aligned end

So is this

<? include editor/align-end ?>

## Spacing { #spacing .border-bottom .mt2 }

> Class format `.(m|p)(t|r|b|l|v|h)(0|1|2|3|4)`:
> 
> 1. `(m|p)` margin (space around) or padding (space inside)
> 1. `(t|r|b|l|v|h)` top/right/bottom/left/vertical/horizontal
> 1. `(0|1|2|3|4)` exponential multiple of space (1,2,4,8)
>
> Examples:
> 
> 1. `.mb2` m (margin) + b (bottom) + 2 (space * 2)
> 1. `.ph1` p (padding) + h (horizontal) + 1 (space * 1)

This has no space below.
{ .mb0 }

This has a little space below
{ .mb1 }

This has a medium amount of space below
{ .mb2 }

This has a large amount of space below
{ .mb3 }

This has a very large amount of space below
{ .mb4 }

## Containers { #containers .border-bottom .mt2 }

<? include editor/container-thin-start ?>

Thin container
{ .background--light-grey .p1 }

<? include editor/container-end ?>

<? include editor/container-very-thin-start ?>

Very thin container
{ .background--light-grey .p1 }

<? include editor/container-end ?>

## Columns { #columns .border-bottom .mt2 }

<? include editor/columns-start ?>

column 1
{ .background--light-grey .p1 }

<? include editor/column ?>

column 2
{ .background--light-grey .p1 }

<? include editor/columns-end ?>

<? include editor/columns-start ?>

column 1
{ .background--light-grey .p1 }

<? include editor/column ?>

column 2
{ .background--light-grey .p1 }

<? include editor/column ?>

column 3
{ .background--light-grey .p1 }

<? include editor/columns-end ?>

<? include editor/columns-start ?>

column 1
{ .background--light-grey .p1 }

<? include editor/column ?>

column 2
{ .background--light-grey .p1 }

<? include editor/column ?>

column 3
{ .background--light-grey .p1 }

<? include editor/column ?>

column 4
{ .background--light-grey .p1 }

<? include editor/columns-end ?>

<? include editor/columns-start ?>

one third
{ .background--light-grey .p1 }

<? include editor/two-thirds-column ?>

two thirds
{ .background--light-grey .p1 }

<? include editor/columns-end ?>

<? include editor/columns-start ?>

one fourth
{ .background--light-grey .p1 }

<? include editor/two-fourths-column ?>

two forths
{ .background--light-grey .p1 }

<? include editor/column ?>

one fourth
{ .background--light-grey .p1 }

<? include editor/columns-end ?>

<? include editor/columns-start ?>

one fourth
{ .background--light-grey .p1 }

<? include editor/three-fourths-column ?>

three fourths
{ .background--light-grey .p1 }

<? include editor/columns-end ?>


## Backgrouds { #backgrounds .border-bottom .mt2 }

### Individual block background { #individual-background .h4 .border-bottom .mt2 .mb1 }

Light grey
{ .background--light-grey .p1 }

Dark grey
{ .background--dark-grey .p1 }

Black
{ .background--black .p1 }

Red
{ .background--red .p1 }

Gold
{ .background--gold .p1 }

Blue
{ .background--blue .p1 }

### Mutliple block background { #multiple-background .h4 .border-bottom .mt2 .mb1 }

<? include editor/background-light-grey-start ?>

<div class="p1 mt1" markdown>

Light grey

bla bla bla
{ .mb0 }

</div>

<? include editor/background-end ?>

<? include editor/background-dark-grey-start ?>

<div class="p1 mt1" markdown>

Dark grey

bla bla bla
{ .mb0 }

</div>

<? include editor/background-end ?>

<? include editor/background-black-start ?>

<div class="p1 mt1" markdown>

Black

bla bla bla
{ .mb0 }

</div>

<? include editor/background-end ?>

<? include editor/background-red-start ?>

<div class="p1 mt1" markdown>

Red

bla bla bla
{ .mb0 }

</div>

<? include editor/background-end ?>

<? include editor/background-gold-start ?>

<div class="p1 mt1" markdown>

Gold

bla bla bla
{ .mb0 }

</div>

<? include editor/background-end ?>

<? include editor/background-blue-start ?>

<div class="p1 mt1" markdown>

Blue

bla bla bla
{ .mb0 }

</div>

<? include editor/background-end ?>

## Cards { #cards .border-bottom .mt2 }

### Light cards { #light-cards .h4 .border-bottom .mt2 .mb1 }

<? include editor/columns-start ?>
<? include editor/card-start ?>

#### Card heading { .mt1 }

bla bla bla

<div class="unstyled" markdown>

- ![check][check] Feature 1
{ .inline-image-start }
- ![check][check] Feature 2
{ .inline-image-start }
- ![check][check] Feature 3
{ .inline-image-start }
- ![check][check] Feature 4
{ .inline-image-start }

</div>

[Buy now](example){ .button .button--gold .full-width }

<? include editor/card-end ?>
<? include editor/column ?>
<? include editor/card-start ?>

#### Card heading { .mt1 }

bla bla bla

<div class="unstyled" markdown>

- ![check][check] Feature 1
{ .inline-image-start }
- ![check][check] Feature 2
{ .inline-image-start }
- ![check][check] Feature 3
{ .inline-image-start }
- ![check][check] Feature 4
{ .inline-image-start }

</div>

[Buy now](example){ .button .button--gold .full-width }

<? include editor/card-end ?>
<? include editor/column ?>
<? include editor/card-start ?>

#### Card heading { .mt1 }

bla bla bla

<div class="unstyled" markdown>

- ![check][check] Feature 1
{ .inline-image-start }
- ![check][check] Feature 2
{ .inline-image-start }
- ![check][check] Feature 3
{ .inline-image-start }
- ![check][check] Feature 4
{ .inline-image-start }

</div>

[Buy now](example){ .button .button--gold .full-width }

<? include editor/card-end ?>
<? include editor/columns-end ?>

### Heavy cards { #heavy-cards .h4 .border-bottom .mt2 .mb1 }

<? include editor/card-start--heavy ?>

#### Big feature heading { .h1 .pb1 .mb2 .border-bottom }

<? include editor/columns-start ?>

![example][example]{ .full-width }

<? include editor/three-fourths-column ?>

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 

<? include editor/columns-end ?>

<? include editor/columns-start ?>

![example][example]{ .full-width }

<? include editor/three-fourths-column ?>

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 

<? include editor/columns-end ?>

<? include editor/columns-start ?>

![example][example]{ .full-width }

<? include editor/three-fourths-column ?>

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 

<? include editor/columns-end ?>

<? include editor/card-end ?>

## Download button { #download .border-bottom .mt2 }

<? include editor/download-button ?>

## References { #references .mt2 }

[^first]: Footnote **can have markup**

    and multiple paragraphs.

[^second]: Footnote text.

[example]: https://placehold.co/300x200?text=Image%203
[check]: https://placehold.co/16x16?text=Y
[cross]: https://placehold.co/16x16?text=N
[full-width]: https://placehold.co/192x108?text=Full-width