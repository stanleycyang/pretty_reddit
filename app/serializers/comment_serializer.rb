class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body, :commenter, :created_at

  def commenter
    return {id: object.user.id, name: object.user.name}

  end

end
