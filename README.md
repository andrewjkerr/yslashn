#Rails Account Starter

Inspired by [connorjacobsen/rails_starter](https://github.com/connorjacobsen/rails_starter), this is my starting Rails template (with accounts!).

##Current Defaults

- Ruby 2.2.2
- Rails 4.2.3
- Slim for templates
- Sass for stylesheets
- Coffeescript for javascript-y type things
- Puma for the server
- Postgres 9.3.5.1 for DB

##Dependencies

- Ruby
- Some JavaScript runtime

##Configuration

1. Clone this repo:

```
git clone https://github.com/andrewjkerr/rails_account_starter.git
```

2. Run `bundle install`.

3. Change the module name in `config/application.rb` to your application name.

4. Change the title in `application.html/slim` to whatever you want. (By default uses "[provided title] | [module name]" - ex "Home | RailsAccountStarter".)

5. Change the db settings in `config/database.yml` if necessary.

6. Run `rails s`!

7. If you have secret keys to be protected, run `figaro install`!