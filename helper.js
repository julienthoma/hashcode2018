export const calcDist = (pointA, pointB) => 
  Math.abs(pointA.row - pointB.row) + Math.abs(pointA.column - pointB.column);

export const calcVehicleRideDistance = (vehicle, ride) => {
  const rideDistance = calcDist(ride.start, ride.finish);
  const taxiDistance = calcDist(vehicle.currentPoint, ride.start);

  return rideDistance + taxiDistance;
};
