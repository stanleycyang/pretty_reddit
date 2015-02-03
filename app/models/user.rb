class User < ActiveRecord::Base
  # Downcase the email before saving it

  attr_accessor :remember_token

  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy

  before_save :downcase_email

  # Checks name's presence, length: 50
  validates :name, presence: true, length: {maximum: 50}

  # Checks email's presence, format, uniqueness, and length: 255
  validates :email, presence: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }, uniqueness: {case_sensitive: false}, length: {maximum: 255}
 
  validates :password, length: {minimum: 6}

  # Enforces validation on the virtual password & password_confirmation attributes
  has_secure_password

  def User.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                  BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end

  def User.new_token
    SecureRandom.urlsafe_base64
  end

  def remember
    self.remember_token = User.new_token
    update_attribute(:remember_digest, User.digest(remember_token))
  end

  def authenticated?(remember_token)
    return false if remember_digest.nil?
    BCrypt::Password.new(remember_digest).is_password?(remember_token)
  end

  def forget
    update_attribute(:remember_digest, nil)
  end

  private 

    def downcase_email
      self.email = email.downcase
    end

end
