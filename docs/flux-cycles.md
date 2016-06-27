# Flux Cycles

## Notes Flux Cycles

* `fetchAllNotes`
  * Invoked from `NotesIndex` `ComponentDidMount` / `ComponentWillReceiveProps`
  * `NoteActions` calls `ApiUtil.fetchAllNotes`
  * `ApiUtil` makes 'GET' request to `/api/notes` with `receiveAllNotes` as success callback
  * `receiveAllNotes` dispatches payload to `NotesStore`
  * `NotesStore` updates `_notes` and emits change
  * `NotesIndex` listens for changes from NotesStore and re-renders accordingly

* `createNote`
  * Invoked from `NotesIndex` button `onClick`
  * `NoteActions` calls `ApiUtil.CreateNote`
  * `ApiUtil` makes 'POST' request to `/api/notes` with `receiveNote` as success callback
  * `receiveNote` dispatches payload to NotesStore
  * `NotesStore` updates `_notes` and emits change
  * `NotesIndex` listens for changes from `NotesStore` and re-renders accordingly

* `fetchNote`
  * Invoked from `NoteDetail` on `ComponentDidMount` / `ComponentWillReceiveProps`
  * `ApiUtil` makes 'GET' request to `/api/notes/:noteId`
  * `receiveNote` invoked on success
  * `NotesStore` updates `_notes` and emits change
  * `NoteDetail` listens for changes and re-renders to show note content

* `editNote`
  * Invoked from `NoteDetail` on `ComponentDidMount` / `ComponentWillReceiveProps`
  * `ApiUtil` makes 'PATCH' request to `/api/notes/:noteId`
  * `receiveNote` invoked on success
  * `NotesStore` updates `_notes` and emits change
  * `NoteDetail` listens for changes and re-renders to show note content

* `removeNote`
  * Invoked from `NoteDetail` button `onClick`
  * `ApiUtil` makes 'DELETE' request to `/api/notes/:noteId`
  * `removeNote` invoked on success
  * `NotesStore` updates `_notes` and emits change
  * `NoteDetail` listens for changes and re-renders to show note content

* **Why does the example say updatePost (editPost here) should make a POST request? Why not PATCH?**

## Notebook Flux Cycles

* `fetchAllNotebooks`
  * Invoked from `NotebooksIndex` `ComponentDidMount` / `ComponentWillReceiveProps`
  * `NotebookActions` calls `ApiUtil.fetchAllNotebooks`
  * `ApiUtil` makes 'GET' request to `/api/notebooks` with `receiveAllNotebooks` as success callback
  * `receiveAllNotebooks` dispatches payload to `NotebooksStore`
  * `NotebooksStore` updates `_notebooks` and emits change
  * `NotebooksIndex` listens for changes from NotesStore and re-renders accordingly

* `createNotebook`
  * Invoked from `NotebooksIndex` button `onClick`
  * `NotebookActions` calls `ApiUtil.CreateNotebook`
  * `ApiUtil` makes 'POST' request to `/api/notebooks` with `receiveNotebook` as success callback
  * `receiveNotebook` dispatches payload to NotebooksStore
  * `NotebooksStore` updates `_notebooks` and emits change
  * `NotebooksIndex` listens for changes from `NotebooksStore` and re-renders accordingly

* `fetchNotebook`
  * **Invoked from `NotebooksIndex` button `onClick`?**
  * `ApiUtil` makes 'GET' request to `/api/notebooks/:notebookId`
  * `receiveNotebook` invoked on success
  * `NotebooksStore` updates `_notebooks` and emits change
  * `NotebooksIndex` listens for changes and re-renders to show note content (?)

* `editNotebook`
  * Invoked from `NotebooksIndex` on `ComponentDidMount` / `ComponentWillReceiveProps`
  * `ApiUtil` makes 'PATCH' request to `/api/notebooks/:notebookId`
  * `receiveNotebook` invoked on success
  * `NotebooksStore` updates `_notebooks` and emits change
  * `NotebooksIndex` listens for changes and re-renders (?)

* `removeNotebook`
  * Invoked from `NotebooksIndex` button `onClick`
  * `ApiUtil` makes 'DELETE' request to `/api/notebooks/:notebookId`
  * `removeNotebook` invoked on success
  * `NotebooksStore` updates `_notebooks` and emits change
  * `NotebooksIndex` listens for changes and re-renders (?)

* **Why is there a reference to a `NotebookDetail` component here that isn't in the wireframes or components list? The 'notebook detail' view is just a `NotesIndex` with the route `/notebooks/notebookId`, I'm confused. ***

* **Need to add search bar flux cycles**
