class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :user_id, :post_id, :created_at

  delegate :current_user, to: :scope

end
