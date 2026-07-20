export const machineData = {
  name: "ALL STROKE",

  type: "Carousel",

  status: "running",

  plcConnected: true,

  totalStations: 24,

  temperature: "36°C",

  speed: "145 RPM",

  uptime: "12 Hours",

  stations: Array.from({ length: 24 }, (_, index) => ({
    id: index + 1,

    status: "running",
  })),
};