# Noteworthy

[Noteworthy][live-link]

[live-link]: https://noteworthyapp.herokuapp.com

Noteworthy is a web application for writing and storing notes. It is inspired by Evernote and employs Ruby on Rails, a PostgreSQL database, and React.js with a Flux architecture.

## Splash page
![splash]

## Notes
![notes]

## New notebook modal
![notebooks]

[splash]: ./screenshots/splash.png
[notes]: ./screenshots/home.png
[notebooks]: ./screenshots/new_notebook.png

## Features

### Single-page functionality

Noteworthy employs the React Router to create a fluid experience on a single page. All content is rendered to the root page by the static pages controller, and changes to the React Router's hash history determine what content -- in the form of React components -- is rendered at any given time.

```
<Route path="/" component={App}>
  <IndexRoute component={SplashPage} onEnter={_requireAnonymous}/>
  <Route path="notes" component={NoteIndex} onEnter={_ensureLoggedIn}>
    <IndexRoute component={NoteForm}/>
    <Route path=":noteId" component={NoteForm} />
  </Route>
  <Route path="notebooks" component={NotebookIndex} onEnter={_ensureLoggedIn}>
    <Route path=":notebookId" component={NoteIndex}>
      <Route path=":noteId" component={NoteForm} />
    </Route>
  </Route>
</Route>
```

In addition, the notebooks index is a dynamic drawer that gives the user access to notebooks from the landing page without changing the URL.

### Quill.js

Noteworthy makes use of the node package Quill.js to provide rich-text editing.

![quill]

[quill]: ./screenshots/quill.png

Front-end user authentication

Flux loop
Autosave
Tags
Search

Libraries

Quill.js
jBuilder
Webpack
PostgreSQL
jQuery
React Router
BCrypt


* [Original documentation][readme]

[readme]: docs/development_readme.md
