class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :link, :created_at
  
  has_one :user, root: :poster
  has_many :comments
  
  #if we wanted to just return the poster's name as a string, rather than a whole object, we could do this and add :poster to the list of attributes at the top
  # def poster
  #   object.user.name
  # end  
end
