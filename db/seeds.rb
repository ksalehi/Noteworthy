# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Note.create(title: "Note1", body: "Body1", author_id: 1, notebook_id: 1)
Note.create(title: "Note2", body: "Body2", author_id: 1, notebook_id: 1)
Note.create(title: "Note3", body: "Body3", author_id: 1, notebook_id: 3)
Note.create(title: "Note4", author_id: 2, notebook_id: 2)
Note.create(title: "Note5", author_id: 2, notebook_id: 2)

Notebook.create(title: 'Notebook1', description: 'Desc1', author_id: 1)
Notebook.create(title: 'Notebook2', description: 'Desc2', author_id: 2)
Notebook.create(title: 'Notebook3', author_id: 1)

User.create(username: "kia", password: "kiakia")
User.create(username: "muenster", password: "salehi")
