class AddExpiredToCheckIns < ActiveRecord::Migration
  def change
    add_column :check_ins, :expired, :boolean
  end
end
