##Angular + Rails Pt. I

Create the app

	$ rails new pretty_reddit --skip-bundle -Td postgresql
	
	$ cd pretty_reddit
##Rails side:

###Remove Turbolinks:

Remove from Gemfile:

	-- gem turbolinks
	
Convert app/views/application.html.erb:

	<%= stylesheet_link_tag    "application"%>
	<%= javascript_include_tag "application"%>
	
Remove from app/assets/javascripts/application.js:

	//= require turbolinks
	
###Remove JBuilder

from Gemfile

	gem 'jbuilder', '~> 1.2'

###Add ActiveModelSerializers & AngularJS-Rails gems:

	gem 'angular-rails-templates'
	gem 'active_model_serializers'
	gem 'angularjs-rails'
	gem 'bcrypt'


Angular Side

###Add angular javascript

Include in your application.js:

	//= require angular
	//= require angular-resource
	
###Setup a view with an Angular app


	rails g controller home index

Then set your root to:

	root 'home#index'

Go into application.html.erb and add ng-app to the <html> tag

	<html ng-app>

Go into views/home/index.html.erb

	{{3 + 4}}

If it returns 7, congratulations!! You have successful set up angularJS and rails together

##User Model

Let's set up RSpec

	$ rails generate rspec:install

Set up a User model

	$ rails g model User name email

Which will throw back

	invoke  active_record
    create    db/migrate/20150128063521_create_users.rb
    create    app/models/user.rb
    invoke    rspec
    create      spec/models/user_spec.rb
    invoke      factory_girl
    create        spec/factories/users.rb

Then, let's run our migration

	$ rake db:migrate

In user_spec.rb

	require 'rails_helper'

	RSpec.describe User, :type => :model do
	  
	  it 'has a valid factory'
	  it 'is invalid without a name'
	  it 'is invalid without an email'
	  it 'is invalid without an email address'
	  it 'is invalid if email is not formatted properly'
	  it 'is invalid if email already exists'
	
	end


Let's check and see if we have a valid user factory

	it 'has a valid factory' do
	    expect(FactoryGirl.build(:user)).to be_valid
	end
	
This test should pass no problem :-)

Let's build a test to check the user's does name exist

	it 'is invalid without a name' do
	    user = FactoryGirl.build(:user, name: nil)
	    expect(user).to be_invalid
	end

In the user model, add the following validation to the user name

	validates :name, presence: true

Let's build a test to check email exist

	it 'is invalid without an email' do
	    user = FactoryGirl.build(:user, email: nil)
	    expect(user).to be_invalid
	end

In the user model, add the following validation to the user email

	validates :email, presence: true

Let's test the email to make sure its properly formatted

	it 'is invalid if email is not formatted properly' do
	
	    user = FactoryGirl.build(:user, email: 'asdfgh')
	    
	    expect(user).to be_invalid
	    
	end

To make it pass, let's

	validates :email, presence: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }

Now, let's write a test to check if the people can make accounts with the same email

	  it 'is invalid if email already exists' do
	    user = FactoryGirl.create(:user, email: 'jack@gmail.com')
	
	    user1 = FactoryGirl.build(:user, email: 'jack@gmail.com')
	
	    user2 = FactoryGirl.build(:user, email: 'jack@gmail.com')
	
	    expect(user1).to be_invalid
	    expect(user2).to be_invalid
	  end

Now, validate it with the following

	validates :email, presence: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }, uniqueness: {case_sensitive: false}

Test a user name to make sure it can't be over 50 characters

	it 'is not valid when name is over 50' do
	    user = FactoryGirl.create(:user)
	    user.name = "a" * 51
	    expect(user).to be_invalid
	end

Then write the code in user.rb

	validates :name, presence: true, length: {maximum: 50}

With your user model working, let's create the users controller

	$ rails generate controller Users

Generate migration for password digest

	rails g migration add_password_digest_to_users password_digest:string

Rake the db

	rake db:migrate

In the user model, add has_secure_password

	has_secure_password


Let's create a test for minimum password length:

	 it 'is should have a minimum length' do
	
	   user = FactoryGirl.create(:user)
	   user.password = user.password_confirmation = "a" * 5
	   expect(user).to be_invalid
	
	 end

Then, validate in your user.rb model

	validates :password, length: {minimum: 6}

Add a resources :users to routes.rb

	root 'home#index'
	resources :users

Now we have a working User model!

##Post Model

Let's create a Post model!

	$ rails g model Post link title user:references

Let's create a Comment model!

	$ rails g model Comment body:string user:references
	
	$ rails g controller Comments 

Rake our db

	$ rake db:migrate
	
It will return the following: 

	 invoke  active_record
      create    db/migrate/20150128220206_create_posts.rb
      create    app/models/post.rb
      invoke    rspec
      create      spec/models/post_spec.rb
      invoke      factory_girl
      create        spec/factories/posts.rb

Include resources for posts in routes.rb

	resources :posts

The tests are 

	it 'has a valid factory for post'
	it 'is invalid without a link'
	it 'has a valid link format'
	it 'is invalid without a title'
	it 'has a title less than 50 characters long'


Let's test the Post Factory

	it "has a valid factory for post" do
	    expect(FactoryGirl.build(:user)).to be_valid
	end

This should pass with the default factory :-)


Create a test for name

	it 'is invalid without a name' do     
	    post = FactoryGirl.build(:post, link: nil)    
	    expect(post).to be_invalid    
	end

Validate the link in Post.rb

	validates :link, presence: true

Check if the link has a correct format

	it 'has a valid link format' do
	   post = FactoryGirl.build(:post, link: 'sadas')
	   expect(post).to be_invalid
	 end

Change the link validation in post.rb to

	validates :link, presence: true, format: {with: /https?:\/\/[\S]+/}

Check if the post is invalid without a title

	  it 'is invalid without a title' do
	    post = FactoryGirl.build(:post, title: nil)
	    expect(post).to be_invalid
	  end

Change the title validation in post.rb to

	validates :title, presence: true

Check if the post title is invalid when over 50 characters

	it 'is invalid when title is over 50 characters' do

	    post = FactoryGirl.build(:post)
	    post.title = "a" * 51
	    expect(post).to be_invalid
	
	end

Validate the title length by adding

	validates :title, presence: true, length: {maximum: 50}

Finish this section off by generating a posts controller

	rails g controller posts

#Rails API Layer

Let's turn our user controller to an API layer
	
In routes.rb, add a namespace :api around the resources and default the format to JSON

	namespace :api, defaults: {format: :json} do
	    # Resource for our users
		resources :users, only: [ :create, :update, :destroy]
	
	    # Resource for users' posts
	    resources :posts, except: [ :new, :edit]
	end


In the inflections.rb file, let's add the acronym for 'API'

		ActiveSupport::Inflector.inflections(:en) do |inflect|
	  inflect.acronym 'API'
	end

`Restart your rails server now.`

Now wrap your UsersController class in the module API users_controller.rb

	module API
	  class UsersController < ApplicationController
	
	    
	    
	
	  end
	end

Create an API direction in the controllers folder

	mkdir app/controllers/api

Move your users_controller.rb and posts_controller.rb into app/controllers/api

	mv app/controllers/users_controller.rb app/controllers/api
	
	mv app/controllers/posts_controller.rb app/controllers/api


Now, let's make sure your controller has all the actions

	module API
	  class UsersController < ApplicationController
	  	
	  	respond_to :json	  	
	
	    def create
	    end
	
	    def update
	    end
	
	    def destroy
	    end
	
	
	  end
	end

For posts_controller.rb

	module API
	  class PostsController < ApplicationController
	
	    respond_to :html, :xml, :json
	
	    def index      
	    end
	
	    def show
	    end
	
	    def create
	    end
	
	    def update
	    end
	
	    def destroy
	    end
	
	  end
	end


Generate sessions controller

	$ rails generate controller Sessions new
	
Update the routes

	namespace :api, defaults: {format: :json} do
	    # Resource for our users
	    resources :users, only: [ :create, :update, :destroy]
	
	    # Resource for users' posts
	    resources :posts, except: [ :new, :edit]
	
	    resources :sessions, only: [:new, :create, :destroy]
	  end
	

Create post serializer

	$ rails g serializer post

Create comment serializer

	$ rails g serializer comment


##AngularJS

Create app.js
	
Create routing.js

Create maincontroller.js

Create a templates folder in javascript

	mkdir app/assets/javascripts/templates

In here we can create our templates for angular routing