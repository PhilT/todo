User.create([{name: 'Phil'}, {name: 'Joe'}])
User.create(name: 'Joe')
Category.create([{name: 'feature'}, {name: 'bug'}, {name: 'refactor'}, {name: 'UI'}])

Task.create(name: 'A really cool task that everyone one wants to do',
            created_at: 2.days.ago,
            completed_at: Time.now,
            category: Category.first,
            created_by: User.last)

Task.create(name: 'Totally awesome thing we need to do',
            created_at: 1.day.ago,
            due_at: 1.day.ago,
            category: Category.second,
            created_by: User.first)
