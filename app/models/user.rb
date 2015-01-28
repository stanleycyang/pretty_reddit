class User < ActiveRecord::Base
  # Downcase the email before saving it
  before_save { self.email = email.downcase }

  # Checks name's presence, length: 50
  validates :name, presence: true, length: {maximum: 50}

  # Checks email's presence, format, uniqueness, and length: 255
  validates :email, presence: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }, uniqueness: {case_sensitive: false}, length: {maximum: 255}

  validates :password, length: {minimum: 6}

  # Enforces validation on the virtual password & password_confirmation attributes
  has_secure_password
end
