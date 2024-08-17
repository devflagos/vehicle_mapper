class CreateWaypoints < ActiveRecord::Migration[7.1]
  def change
    create_table :waypoints do |t|
      t.integer :vehicle_id
      t.string :latitude
      t.string :longitude
      t.datetime :sent_at

      t.timestamps
    end
  end
end
