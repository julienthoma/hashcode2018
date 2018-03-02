const fileparser = require("./fileparser");
const { calcDist, calcVehicleRideDistance } = require("./helper");
const parseFile = fileparser.parseFile;
const writeOutput = fileparser.writeOutput;

const createVehicles = (vehicleCount, steps) => {
  const vehicles = [];
  for (var i = 0; i < vehicleCount; i++) {
    vehicles.push({
      id: i,
      rides: [],
      currentPoint: { row: 0, column: 0 },
      stepsLeft: steps
    });
  }
  return vehicles;
};

const createVehicleRideCombinations = (vehicles, rides) => {
  const rideCombinations = [];
  rides.forEach(ride => {
    vehicles.forEach(vehicle => {
      rideCombinations.push({
        rideId: ride.id,
        vehicleId: vehicle.id,
        score: 0
      });
    });
  });
  return rideCombinations;
};

const calcScore = (combination, rideMap, vehicleMap, steps, bonus) => {
  const ride = rideMap[combination.rideId];
  const vehicle = vehicleMap[combination.vehicleId];
  const rideDist = calcDist(ride.start, ride.finish);
  const totalDist = calcVehicleRideDistance(vehicle, ride);
  const currentGameTime = steps - vehicle.stepsLeft;
  let score = rideDist;

  const distanceToRideStart = calcDist(vehicle.currentPoint, ride.start);
  if (
    totalDist > vehicle.stepsLeft ||
    totalDist + currentGameTime > ride.latestFinish
  ) {
    return 0;
  }

  if (distanceToRideStart + currentGameTime === ride.earliestStart) {
    score += bonus;
  }

  return score;
};

const run = fileName => {
  console.time(fileName);
  const { vehicles, rideCount, rides, steps, bonus } = parseFile(
    `./${fileName}.in`
  );

  const _vehicles = createVehicles(vehicles, steps);

  let rideCombinations = createVehicleRideCombinations(_vehicles, rides);

  console.log(rides.length);

  while (true) {
    // recalc score
    rideCombinations.forEach(combination => {
      const currentVehicle = _vehicles[combination.vehicleId];
      const currentRide = rides[combination.rideId];

      combination.score = calcScore(
        combination,
        rides,
        _vehicles,
        steps,
        bonus
      );
      combination.stepsNeeded = calcVehicleRideDistance(
        currentVehicle,
        currentRide
      );
    });

    rideCombinations.sort((a, b) => b.score - a.score);
    const currentRideCombination = rideCombinations.shift();

    if (!currentRideCombination || currentRideCombination.score === 0) {
      break;
    }

    const currentVehicle = _vehicles[currentRideCombination.vehicleId];
    const currentRide = rides[currentRideCombination.rideId];
    currentVehicle.rides.push(currentRideCombination.rideId);
    currentVehicle.currentPoint = { ...currentRide.finish };
    currentVehicle.stepsLeft -= currentRideCombination.stepsNeeded;

    rideCombinations = rideCombinations.filter(
      combination => combination.rideId !== currentRideCombination.rideId
    );

    console.log(currentRide.id);
  }

  console.log(rides);
  console.log(_vehicles);

  writeOutput(`./${fileName}.out`, _vehicles);
  console.timeEnd(fileName);
};

describe("main", () => {
  it("example", () => {
    // run("a_example");
    // run("b_should_be_easy");
    run("c_no_hurry");
    // run("d_metropolis");
    // run("e_high_bonus");
  });
});
