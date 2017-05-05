# Setup

Create DB and run seeds (creates some initial users, categories
and tasks)

    rails db:setup

# Usage

    rails s

Browse to http://localhost:3000

API endpoints

* [GET|POST|PATCH] /tasks[/:id]
* [GET] /categories

# Testing

    rails test

A few tests covering the API. Installed tape with the intention of testing
frontend code but trouble setting up with Yarn meant I had to abandon.

Also tried to setup system tests (I thought I'd at least have JS coverage at a
high level) but this is another new feature of 5.1 and the Capybara
configuration isn't working out of the box on my machine. I left the test I
setup in `test/system/general_stories_test`.

Normally I'd use RSpec but Minitest has come along way and there is something
to be said for the simplicity of it so I stuck with the Rails default for this.
I find it useful to revisit the defaults especially with a new release.
Conventions  are the core of Rails and keeping up with them benefits working in
teams.

# Architecture

Rails 5.1 application serving a Json API. Vanilla ES2015 with a few lightweight
libraries to handle domready and ajax, date picker and fonts.

I like to keep frameworks away from a new project until it's clear what
direction it's heading in so this constraint was good news to me.

I could have gone with Rails API for this one but that would have meant using
a second server such as node to run the frontend code. Using Rails to serve
the initial page seemed simpler for this task.

Ajax errors are just bubbled up to and displayed on the page for now. Similar
to Rails in development mode.

# Problems

In hindsight picking Rails 5.1 that had been released just a few days ago was
probably not the best idea but I was keen to check out the new features and in
particular thought that the Yarn integration would help me with getting the JS
side of things going quickly which it did in the end.

I had a few false starts trying to decide what aspects of Rails I needed. I
probably would have picked API only Rails and gone with Node and run it
separately if I had to do it again but it's convenient to be able to run
it with a single server.

There is a lot more refactoring that could be done in the JS. DOM manipulation
needs to be separated from server requests and events. Of course this would have
happened if I had got tape running.

I could probably have used a few more JS libraries. In fact, I looked into
adding a client-side templating engine but being new to Yarn and getting issues
setting up caused me to abandon this too.

# Missing features

* No late tag or created date
* Deletion
* Editing

I felt it better to ensure the core features and UI was production ready before
adding further features.

# Improvements

Performance could be improved by adding new items to the end of the list

# New features

Reordering could be implemented by drag and drop

# UPDATES

I've now added Browserify to allow proper module loading instead of polluting
the global namespace. This also allows tests to be added using Tape.

I've moved the HTML into JS Templates (under `app/assets/templates`)
