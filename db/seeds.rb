# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


    posts = Post.create(
      [
        {
          link: "yahoo.com",
          title: "Fun Stuff",
          user_id: 1
        },
        {
          link: "yahoo.com",
          title: "More Fun Stuff",
          user_id: 1
        },
        {
          link: "yahoo.com",
          title: "Awesome Stuff",
          user_id: 1
        },
        {
          link: "yahoo.com",
          title: "This is cool Stuff",
          user_id: 1
        },
      ]
    )