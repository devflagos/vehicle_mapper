class CreateVehicles < ActiveRecord::Migration[7.1]
  def change
    create_table :vehicles do |t|
      t.string :plate
      t.datetime :created_at

      t.timestamps
    end
    add_index :vehicles, :plate, unique: true
  end
end
