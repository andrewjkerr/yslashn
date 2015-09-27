class AddThingsToUserKarma < ActiveRecord::Migration
  def change
    change_column :users, :karma, :integer, null: false, default: 0
  end
end
