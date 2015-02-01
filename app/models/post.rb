class Post < ActiveRecord::Base
  belongs_to :user
  has_many :comments, dependent: :destroy

  default_scope->{order(created_at: :desc)}  

  validates :link, presence: true, format: {with: /https?:\/\/[\S]+/}
  validates :title, presence: true, length: {maximum: 50}
end
