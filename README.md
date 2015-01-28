##Angular + Rails Pt. I

Create the app

	$ rails new pretty_reddit --skip-bundle -Td postgresql
	
	$ cd pretty_reddit

##Setting up GEMFILE

Go into Gemfile

First, take out turbolinks
	
	-- gem turbolinks

Then, add the following: 


	gem 'active_model_serializers'
	gem 'angular-rails-templates'
	gem 'bower-rails'
	gem 'bcrypt', '~> 3.1.7'
	
	group :test, :development do
		gem 'rspec-rails'
		gem 'factory_girl_rails'
		gem 'better_errors'
	end 


Then run bundle in the terminal

	$ bundle install
	$ bundle update

##Set up database

Set up the database

	$ rake db:create

Turn on your server to make sure this is working:

	$ rails server

##Bower

Install node if you don't have it

	$ brew install node

Then install bower

	$ npm install bower
	

Then initialize bower.json

	$ rails g bower_rails:initialize json

In bower.json, add:

	{
	  "lib": {
	    "name": "bower-rails generated lib assets",
	    "dependencies": {
	      
	    }
	  },
	  "vendor": {
	    "name": "bower-rails generated vendor assets",
	    "dependencies": {
	      "angular": "latest",
	      "bootstrap-sass-official": "latest"
	    }
	  }
	}

Run:

	$ rake bower:install

Which will return:

	/usr/local/bin/bower install -p
	bower cached        git://github.com/angular/bower-angular.git#1.3.11
	bower validate      1.3.11 against git://github.com/angular/bower-angular.git#*
	bower cached        git://github.com/twbs/bootstrap-sass.git#3.3.3
	bower validate      3.3.3 against git://github.com/twbs/bootstrap-sass.git#*
	bower cached        git://github.com/jquery/jquery.git#2.1.3
	bower validate      2.1.3 against git://github.com/jquery/jquery.git#>= 1.9.0
	bower install       bootstrap-sass-official#3.3.3
	bower install       angular#1.3.11
	bower install       jquery#2.1.3
	
	bootstrap-sass-official#3.3.3 bower_components/bootstrap-sass-official
	└── jquery#2.1.3
	
	angular#1.3.11 bower_components/angular
	
	jquery#2.1.3 bower_components/jquery

##Configuring AngularJS

In application.rb


	  class Application < Rails::Application
	    config.assets.paths << Rails.root.join("vendor","assets","bower_components")
	    config.assets.paths << Rails.root.join("vendor","assets","bower_components","bootstrap-sass-official","assets","fonts")
	
	    config.assets.precompile << %r(.*.(?:eot|svg|ttf|woff)$)
	  end

In assets.rb

		Rails.application.config.assets.precompile += %w( bootstrap/glyphicons-halflings-regular.woff2 )


Adjust application.js

	//= require jquery
	//= require jquery_ujs
	//= require angular
	//= require angular-rails-templates
	//= require_tree .

Adjust application.css.scss

	@import "bootstrap-sass-official/assets/stylesheets/bootstrap-sprockets";
	@import "bootstrap-sass-official/assets/stylesheets/bootstrap";

##Single Page App

In routes, set the default route to:

	root 'home#index'
	
Add the action index to home_controller.rb

	def index
	end

Create the folder

	$ mkdir app/views/home

Create index.html in app/views/application

	$ touch app/views/home/index.html.erb

Remove any turbolinks references, such as in application.html

	  <%= stylesheet_link_tag    'application', media: 'all', 'data-turbolinks-track' => true %>
	 
	  <%= javascript_include_tag 'application', 'data-turbolinks-track' => true %>

And adjust to:

	  <%= stylesheet_link_tag    'application', media: 'all' %>
	  
	  <%= javascript_include_tag 'application' %>

Start your rails server

	$ rails server

In application.html.erb, add in the opening <html> tag

	<html ng-app>

In the application.html.erb page, add in the <body> tag the following:

	{{3 + 4}}

If your app returns a 7 on a blank screen, congratulations! You have set up angular with rails!

##Model Testing

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
	  it 'returns full name as a string'
	  it 'is invalid without an email address'
	  it 'is invalid if email is not formatted properly'
	  it 'is invalid if email already exists'
	
	end


Let's check and see if we have a valid user factory

	it 'has a valid factory' do
	    expect(FactoryGirl.build(:user)).to be_valid
	end

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