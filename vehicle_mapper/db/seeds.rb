Vehicle.create!([{
  plate: "AAAA-00",
}, {
  plate: "BBBB-11",
},{
  plate: "CCCC-22",
},{
  plate: "DDDD-33",
},{
  plate: "EEEE-44",
},{
  plate: "FFFF-55",
},{
  plate: "GGGG-66",
},{
  plate: "HHHH-77",
}])

Waypoint.create!([{
  latitude: "-33.4539",
  longitude: "-70.6039",
  sent_at: "",
  vehicles_id: 1
},{
  latitude: "-33.4350",	
  longitude: "-70.6158",
  sent_at: "2024-01-01 00:10:00",
  vehicles_id: 2
},{
  latitude: "-34.1619",	
  longitude: "-70.7408",
  sent_at: "2024-01-01 00:20:00",
  vehicles_id: 8
},{
  latitude: "-33.4372",	
  longitude: "-70.6572",
  sent_at: "2024-01-01 00:30:00",
  vehicles_id: 3
},{
  latitude: "-33.5000",	
  longitude: "-70.7167",
  sent_at: "2024-01-01 00:40:00",
  vehicles_id: 4
},{
  latitude: "-33.4219",	
  longitude: "-70.7350",
  sent_at: "2024-01-01 00:50:00",
  vehicles_id: 5
},{
  latitude: "-33.5669",	
  longitude: "-70.6750",
  sent_at: "2024-01-01 01:00:00",
  vehicles_id: 5
},{
  latitude: "-33.4589",	
  longitude: "-70.6989",
  sent_at: "2024-01-01 03:00:00",
  vehicles_id: 6
},{
  latitude: "-33.3678",	
  longitude: "-70.6339",
  sent_at: "2024-01-01 04:00:00",
  vehicles_id: 7
}
]);