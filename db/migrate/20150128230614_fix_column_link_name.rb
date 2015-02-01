class FixColumnLinkName < ActiveRecord::Migration
  def change
    rename_column :posts, :links, :link
  end
end
