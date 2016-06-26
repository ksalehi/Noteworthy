## Component Hierarchy

**Bolded** components are associated with routes.

* **App**
  * **NotesIndex**
    * NotesIndexItem
    * NoteForm
  * **NotebooksIndex**
    * Search
    * NotebookIndexItem
    * NoteForm

Routes

* App (path '/')
  * NotesIndex (path index)
  * NotesIndex (path 'notebooks/notebookId')
  * NotebooksIndex (path 'notebooks')
    * NotebookIndexItem
    * NotebookForm

Questions

* Why isn't NotebooksIndex a route in the example?
* Why is there a NoteDetail component in the example?
* Why is there an index path and a none path for NotesIndex?
