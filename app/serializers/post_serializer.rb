class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :link, :created_at
  has_many :comments, serializer: CommentSerializer
  

  delegate :current_user, to: :scope


  
end
