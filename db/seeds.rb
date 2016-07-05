# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Note.create(title: "Kia's to-do list",
            body: "1. Add sign-up / guest demo options to splash page
2. Add more seed data X
3. Get multiple accounts working
4. Get automatic save working
5. Have note in focus look selected somehow
6. Use CLEAR_ERRORS",
            author_id: 1,
            notebook_id: 1)
Note.create(title: "Groceries", body: "Bread
Avocado
Granola bars
Cereal
Almond milk
Tortilla chips
Cookies
", author_id: 1, notebook_id: 1)
Note.create(title: "Good cat names", body: "Swiffer
Banjo
Wednesday
Mango
Peaches
Basil", author_id: 1, notebook_id: 3)
Note.create(title: "Songs I know on guitar", body: "Skinny Love
Wagon Wheel
We’re All In This Together
Take 'Em Away
Country Roads
Furr
Black River Killer
Nobody Knows Me At All
Thirteen
The Biggest Lie
Yeah! Oh Yeah!
Far From Me
Lua
The Temptation Of Adam
Friend of the Devil
Idaho
Grass Stain
Swan Dive?
You Don’t Make It Easy Babe
Between the Bars
Piazza, New York Catcher
All I Want Is You", author_id: 2, notebook_id: 2)
Note.create(title: "To read", body: "Articles:

I miss you - the New Yorker
Choosing Queer: I was not born this way
Riding the relationship escalator (or not)
Serial
The racist housing policy that made your neighborhood

Books:

The Fifth Season
Bad feminist
Scientific Revolutions
Half of a Yellow Sun
Annihilation
Infinite Jest

To look into:

Latino USA podcast", author_id: 2, notebook_id: 2)

Notebook.create(title: 'Work', description: 'Things related to work', author_id: 1)
Notebook.create(title: 'Personal', description: 'Personal stuff', author_id: 2)
Notebook.create(title: 'Favorite quotes', author_id: 2)
Notebook.create(title: 'Work', author_id: 2)
Notebook.create(title: 'School', author_id: 2)
Notebook.create(title: 'Lab Notes', author_id: 2)

User.create(username: "kia", password: "kiakia")
User.create(username: "guest", password: "password")
