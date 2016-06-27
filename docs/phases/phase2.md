# Phase 2: Flux Architecture and Note CRUD (2 days)

## Rails
### Models

### Controllers

### Views

## Flux
### Views (React Components)
* NotesIndex
  - NotesIndexItem
* NoteForm

### Stores
* NoteStore

### Actions
* NoteActions.receiveAllNotes -> triggered by ApiUtil
* NoteActions.receiveNote
* NoteActions.deleteNote
* NoteActions.fetchAllNotes -> triggers ApiUtil
* NoteActions.fetchNote
* NoteActions.createNote
* NoteActions.editNote
* NoteActions.destroyNote

### ApiUtil
* ApiUtil.fetchAllNotes
* ApiUtil.fetchNote
* ApiUtil.createNote
* ApiUtil.editNote
* ApiUtil.deleteNote

## Gems/Libraries
* Flux Dispatcher (npm)
* Twitter Bootstrap
