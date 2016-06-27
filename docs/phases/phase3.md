# Phase 3: Notebooks and Tags (2 days)

## Rails
### Models
* Notebook
* Tag
* Tagging

### Controllers
* Api::NotebooksController (create, destroy, index, show, update)

### Views
* notebooks/index.json.jbuilder
* notebooks/show.json.jbuilder
* tags/show.json.jbuilder

## Flux
### Views (React Components)
* NotebooksIndex
  - NotebookIndexItem
* NotebookForm
* SearchIndex

### Stores
* Notebook

### Actions
* NotebookActions.receiveAllNotebooks -> triggered by ApiUtil
* NotebookActions.receiveNotebook
* NotebookActions.deleteNotebook
* NotebookActions.fetchAllNotebooks -> triggers ApiUtil
* NotebookActions.fetchNotebook
* NotebookActions.createNotebook
* NotebookActions.editNotebook
* NotebookActions.deleteNotebook

### ApiUtil
* ApiUtil.fetchAllNotebooks
* ApiUtil.fetchNotebook
* ApiUtil.createNotebook
* ApiUtil.editNotebook
* ApiUtil.deleteNotebook

## Gems/Libraries
