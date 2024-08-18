class CreateVehicles < ActiveRecord::Migration[7.2]
  def change
    create_table :vehicles do |t|
      t.string :plate

      t.timestamps
    end
    add_index :vehicles, :plate, unique: true
  end
end
