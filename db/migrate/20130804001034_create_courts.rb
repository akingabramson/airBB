class CreateCourts < ActiveRecord::Migration
  def change
    create_table :courts do |t|
      t.string :name
      t.float :latitude
      t.float :longitude

      t.timestamps
    end
    add_index :courts, :latitude
    add_index :courts, :longitude
  end
end
