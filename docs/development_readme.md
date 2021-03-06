# Noteworthy

[Heroku][live-link]

[live-link]: https://noteworthyapp.herokuapp.com

## Minimum Viable Product

Noteworthy is a web application for note management and storage modeled after Evernote. It will be built using Ruby on Rails and React.js.  By the end of Week 9, this app will, at a minimum, meet the following specifications:

- [X] Hosting on Heroku
- [X] New account creation, login, and guest/demo login
- [X] A production README, replacing this README
- [X] Notes
  - [X] Smooth, bug-free navigation
  - [X] Adequate seed data to demonstrate the site's features
  - [X] Adequate CSS styling
- [X] Notebooks for organizing notes
  - [X] Smooth, bug-free navigation
  - [X] Adequate seed data to demonstrate the site's features
  - [X] Adequate CSS styling
- [X] Tags for notes
  - [X] Smooth, bug-free navigation
  - [X] Adequate seed data to demonstrate the site's features
  - [X] Adequate CSS styling
- [X] Rich Text Editing of notes
  - [X] Smooth, bug-free navigation
  - [X] Adequate seed data to demonstrate the site's features
  - [X] Adequate CSS styling

## Design Docs
* [View Wireframes][views]
* [React Components][components]
* [Flux Cycles][flux-cycles]
* [API endpoints][api-endpoints]
* [DB schema][schema]

[views]: docs/views.md
[components]: docs/components.md
[flux-cycles]: docs/flux-cycles.md
[api-endpoints]: docs/api-endpoints.md
[schema]: docs/schema.md

## Implementation Timeline

### Phase 1: Back-end setup and front-end user authentication (1 day, due W1 Tu 6pm)

**Objective:** Basic rails project with authentication

- [X] create new project
- [X] create `User` model
- [X] roll authentication
- [X] create user signup/login pages
- [X] create blank landing page after login

### Phase 2: Note model, API, basic APIUtil (1.5 days, due W1 Th 12pm)

**Objective:** Notes can be created, read, updated and destroyed through
the API.

- [X] create `Note` model
- [X] seed database
- [X] create jBuilder views for notes
- [X] setup Webpack & Flux scaffold
- [X] setup `APIUtil` to interact with the API
- [X] test out API in console

### Phase 3: Flux architecture and router (1.5 days, due W1 F 6pm)

**Objective:** Notes can be created, read, updated and destroyed through the
UI.

- [X] set up flux loop with skeleton files
- [X] setup React Router
- implement each note component, building out the flux loop as needed:
  - [X] `NotesIndex`
  - [X] `NoteIndexItem`
  - [X] `NoteForm`
- [X] highlight the NoteIndexItem of the note currently being edited
after editing
- [X] clean up any remaining login/signup errors / routes

### Phase 4: Start styling (0.5 days, due W2 M 12pm)

**Objective:** Existing pages look polished.

- [X] create basic style guide
- [X] position elements on the page
- [X] add basic colors & styles
- [X] notes display how long ago they were created
- [X] save notes to the DB when the form loses focus or is left idle

### Phase 5: Notebooks (1 day, due W2 Tu 12pm)

**Objective:** Notes belong to notebooks, and can be viewed by notebook.

- [X] create `Notebook` model
- build out API, Flux loop, and components for:
  - [X] Notebook CRUD
  - [X] adding notes requires a notebook
  - [X] viewing notes by notebook
- [X] Style new views

### Phase 6: Tags (1 day, due W2 Th 6pm)

**Objective:** Notes can be tagged

- [X] create `Tag` model and join table
- build out API, Flux loop, and components for:
  - [X] fetching tags for note
  - [X] adding tags to note
  - [X] creating tags while adding to note
- [X] Style new elements

### Phase 7: Add styling capabilities (0.5 days, due W2 F 12pm)

**objective:** Enable complex styling of notes.

- [X] Integrate `react-quill` (based on Quill.js).
- [X] Style new Quill elements.

### Phase 8: Styling cleanup and seeding (0.5 days, due W2 F 6pm)

**objective:** Make the site more polished.

- [X] Get feedback on UI from others
- [X] Refactor HTML classes & CSS rules
- [X] Add modals, transitions, and other styling flourishes.

### Bonus Features (TBD)
- [ ] Search through notes for blocks of text
- [ ] Pagination / infinite scroll for Notes Index
- [ ] Set reminders on notes
- [ ] Changelogs for notes
- [ ] Multiple sessions
- [ ] moving notes to a different notebook

[phase-one]: docs/phases/phase1.md
[phase-two]: docs/phases/phase2.md
[phase-three]: docs/phases/phase3.md
[phase-four]: docs/phases/phase4.md
