# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


User.create(name: "Stanley Yang", email: "stanleyang13@gmail.com", password: "foobar")
user= User.find_by(email: "stanleyang13@gmail.com")

posts = Post.create(
  [
    {
      link: "https://yahoo.com",
      title: "Fun Stuff",
      user: user
    },
    {
      link: "https://google.com",
      title: "More Fun Stuff",
      user: user
    },
    {
      link: "https://espn.com",
      title: "Awesome Stuff",
      user: user
    },
    {
      link: "https://github.com",
      title: "This is cool Stuff",
      user: user
    },
  ]
)

comments = Comment.create(
  [
    {
      body: "what an awesome link!",
      user: user,
      post: Post.first
    },
    {
      body: "this link sux!",
      user: user,
      post: Post.first
    },
    {
      body: "i'm an internet troll, you guys!",
      user: user,
      post: Post.first
    },
  ]
  )