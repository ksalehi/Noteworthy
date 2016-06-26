# Schema Information


## notes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
body        | text      |
author_id   | integer   | not null, foreign key to users, indexed
notebook_id | integer   | not null, foreign key to notebooks, indexed

# notebooks
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
author_id   | integer   | not null, foreign key to users, indexed
description | string    |

# tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null

# taggings

column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
note_id     | integer   | not null, foreign key to notes, indexed
tag_id      | integer   | not null, foreign key to tags, indexed

* Why does the example have name included in the taggings join table?

# users

column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null        
session_token   | string    | not null, indexed, unique

* Is reminders a core feature // should I include it in my schema regardless?
