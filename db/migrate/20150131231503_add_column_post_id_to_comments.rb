class AddColumnPostIdToComments < ActiveRecord::Migration
  def change
    add_reference :comments, :post_id, index: true
  end
end
