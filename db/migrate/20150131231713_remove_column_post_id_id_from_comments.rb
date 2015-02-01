class RemoveColumnPostIdIdFromComments < ActiveRecord::Migration
  def change
    remove_column :comments, :post_id_id
  end
end
