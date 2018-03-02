const fileparser = require("./fileparser");
const { calcDist, calcVehicleRideDistance } = require("./helper");
const parseFile = fileparser.parseFile;
const writeOutput = fileparser.writeOutput;

const createVehicles = (vehicleCount, steps) => {
  const vehicles = [];
  for (var i = 1; i <= vehicleCount; i++) {
    vehicles.push({
      id: i,
      rides: [],
      currentPoint: {
        row: 0,
        column: 0
      },
      stepsLeft: steps
    });
  }

  return vehicles;
};

const createVehicleRideCombinations = (vehicles, rides) => {
  const vehicleRideCombinations = {};
  const vehicleMap = {};
  const rideMap = {};
  const rideCombinations = [];

  vehicles.forEach(vehicle => {
    vehicleMap[vehicle.id] = vehicle;
  });

  rides.forEach(ride => {
    rideMap[ride.id] = ride;
    vehicleRideCombinations[ride.id] = {};

    vehicles.forEach(vehicle => {
      vehicleRideCombinations[ride.id][vehicle.id] = {
        score: 0
      };

      rideCombinations.push({
        rideId: ride.id,
        vehicleId: vehicle.id,
        score: 0
      });
    });
  });

  return {
    vehicleRideCombinations,
    vehicleMap,
    rideMap,
    rideCombinations
  };
};

const calcScore = (combination, rideMap, vehicleMap, steps, bonus) => {
  const ride = rideMap[combination.rideId];
  const vehicle = vehicleMap[combination.vehicleId];

  const rideDistance = calcDist(ride.start, ride.finish);
  const totalDistance = calcVehicleRideDistance(vehicle, ride);
  let score = rideDistance;
  const currentGameTime = steps - vehicle.stepsLeft;
  
  const distanceToRideStart = calcDist(vehicle.currentPoint, ride.start);
  if (
    totalDistance > vehicle.stepsLeft ||
    totalDistance + currentGameTime > ride.latestFinish
  ) {
    return 0;
  }

  if (distanceToRideStart + currentGameTime === ride.earliestStart) {
    score += bonus;
  }

  return score;
};

const calcScoreForAllCombinations = (
  rideCombinations,
  vehicleMap,
  rideMap,
  steps,
  bonus
) => {
  rideCombinations.forEach(combination => {
    const currentVehicle = vehicleMap[combination.vehicleId];
    const currentRide = rideMap[combination.rideId];

    combination.score = calcScore(
      combination,
      rideMap,
      vehicleMap,
      steps,
      bonus
    );
    combination.stepsNeeded = calcVehicleRideDistance(currentVehicle, currentRide);
  });

  return rideCombinations;
};

const run = fileName => {
  console.time(fileName);
  const { vehicles, rideCount, rides, steps, bonus } = parseFile(
    `./${fileName}.in`
  );

  const _vehicles = createVehicles(vehicles, steps);
  const resultVehicles = [];

  let {
    vehicleRideCombinations,
    vehicleMap,
    rideMap,
    rideCombinations
  } = createVehicleRideCombinations(_vehicles, rides);

  calcScoreForAllCombinations(
    rideCombinations,
    vehicleMap,
    rideMap,
    steps,
    bonus
  );

  console.log(rideCombinations);

  while (true) {
    rideCombinations.sort((a,b) => b.score - a.score);
    const currentRideCombination = rideCombinations.shift();

    console.log(rideCombinations.length);
    console.log(currentRideCombination);

    const currentVehicle = _vehicles[currentRideCombination.vehicleId];
    const currentRide = rideMap[currentRideCombination.rideId];
    currentVehicle.rides.push(currentRideCombination.rideId);
    currentVehicle.currentPoint = { ...currentRide.finish };
    currentVehicle.stepsLeft -= currentRideCombination.stepsNeeded;

    rideCombinations = rideCombinations.filter(combination => combination.rideId === currentRideCombination.rideId);

    break;
  }

  console.log(rideCombinations);

  // for (let i = 0; i < rideCount; i++) {
  //   const currentRide = rides[i];

  //   for (let j = 0; j < vehicles; j++) {
  //     const currentVehicle = resultVehicles[j];

  //     const expectedSteps = calcVehicleRideDistance(
  //       currentVehicle,
  //       currentRide
  //     );
  //     const currentGameTime = steps - currentVehicle.stepsLeft;
  //     const distanceToRideStart = calcDist(
  //       currentVehicle.currentPoint,
  //       currentRide.start
  //     );

  //     console.log(
  //       distanceToRideStart,
  //       currentGameTime,
  //       expectedSteps,
  //       currentRide.earliestStart
  //     );

  //     if (
  //       expectedSteps <= currentVehicle.stepsLeft &&
  //       expectedSteps + currentGameTime <= currentRide.latestFinish &&
  //       distanceToRideStart + currentGameTime === currentRide.earliestStart
  //     ) {
  //       currentVehicle.stepsLeft -= expectedSteps;
  //       currentVehicle.currentPoint = { ...currentRide.finish };
  //       currentVehicle.rides.push(currentRide.id);
  //       currentRide.isAssigned = true;
  //       break;
  //     }
  //   }
  // }

  writeOutput(`./${fileName}.out`, resultVehicles);
  console.timeEnd(fileName);
};

describe("main", () => {
  it("example", () => {
    run("a_example");
    // run("b_should_be_easy");
    // run("c_no_hurry");
    // run("d_metropolis");
    // run("e_high_bonus");
  });
});
