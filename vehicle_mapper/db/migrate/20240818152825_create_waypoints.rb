class CreateWaypoints < ActiveRecord::Migration[7.2]
  def change
    create_table :waypoints do |t|
      t.string :latitude
      t.string :longitude
      t.datetime :sent_at
      t.timestamps
      t.references :vehicles,   foreign_key: true
    end
  end
end
