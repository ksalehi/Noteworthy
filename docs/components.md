## Component Hierarchy

**Bolded** components are associated with routes.

* **App**
  * **NotesIndex**
    * NotesIndexItem
      * **NoteDetail**
        * NoteTags
        * NoteEditForm
  * **NotebooksIndex**
    * Search
    * NotebookIndexItem
    * NoteForm

Routes

* App (path '/')
  * NotesIndex (path index) - to render all notes when no notebook is selected
  * NotesIndex (path 'notebooks/:notebookId')
    * NoteDetail (path 'notes/:noteId')
  * NotebooksIndex (path 'notebooks')? See below

Questions

* Why isn't NotebooksIndex a route in the example? Is it something about it taking you immediately to NotesIndex...
* Why is there an index path and a none path for NotesIndex?
* Why is there both a NoteForm in NotesIndexItem and a NoteEditArea in NoteDetail? There is no NoteEditArea in wireframes example.
* Am I supposed to put NoteDetail as a route under NotesIndex too? How do I access NoteDetail whether there is a notebookId provided or not?
