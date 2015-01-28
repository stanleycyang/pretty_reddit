##Angular + Rails Pt. I

Create the app

	rails new pretty_reddit --skip-bundle -Td postgresql
	
	cd pretty_reddit

Go into Gemfile

First, take out turbolinks
	
	-- gem turbolinks

Then, add the following: 


	gem 'active_model_serializers'
	gem 'angular-rails-templates'
	gem 'bower-rails'
	
	group :test, :development do
		gem 'rspec-rails'
		gem 'factory_girl_rails'
		gem 'better_errors'
	end 


Then run bundle in the terminal

	bundle install

Set up the database

	rake db:create

Turn on your server to make sure this is working:

	rails s


Install node if you don't have it

	brew install node

Then install bower

	npm install bower
	

Then initialize bower.json

	rails g bower_rails:initialize json

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

	rake bower:install

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
	

In routes, set the default route to:

	root 'application#index'
	
Add the action index to application_controller.rb

	def index
	end

Create the folder

	mkdir app/views/application

Create index.html in app/views/application

	touch app/views/application/index.html.erb

Remove any turbolinks references, such as in application.html

	 <%= stylesheet_link_tag    'application', media: 'all', 'data-turbolinks-track' => true %>
	 
	  <%= javascript_include_tag 'application', 'data-turbolinks-track' => true %>

And adjust to:

	<%= stylesheet_link_tag    'application', media: 'all' %>
	  <%= javascript_include_tag 'application' %>

Start your rails server

	rails server

In application.html.erb, add in the opening <html> tag

	<html ng-app>

In the application.html.erb page, add in the <body> tag the following:

	{{3 + 4}}

If your app returns a 7 on a blank screen, congratulations! You have set up angular with rails!