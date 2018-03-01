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

const run = fileName => {
  console.time(fileName);
  const { vehicles, rideCount, rides, steps } = parseFile(`./${fileName}.in`);

  const resultVehicles = createVehicles(vehicles, steps);
  const fullVehicles = [];

  for (let i = 0; i < rideCount; i++) {
    const currentRide = rides[i];

    for (let j = 0; j < vehicles; j++) {
      const currentVehicle = resultVehicles[j];

      const expectedSteps = calcVehicleRideDistance(
        currentVehicle,
        currentRide
      );
      const currentGameTime = steps - currentVehicle.stepsLeft;
      const distanceToRideStart = calcDist(
        currentVehicle.currentPoint,
        currentRide.start
      );

      console.log(
        distanceToRideStart,
        currentGameTime,
        expectedSteps,
        currentRide.earliestStart
      );

      if (
        expectedSteps <= currentVehicle.stepsLeft &&
        expectedSteps + currentGameTime <= currentRide.latestFinish &&
        distanceToRideStart + currentGameTime === currentRide.earliestStart
      ) {
        currentVehicle.stepsLeft -= expectedSteps;
        currentVehicle.currentPoint = { ...currentRide.finish };
        currentVehicle.rides.push(currentRide.id);
        currentRide.isAssigned = true;
        break;
      }
    }
  }

  while (true) {
    // find best vehicle ride combo

    for (let j = 0; j < vehicles; j++) {
      const currentVehicle = resultVehicles[j];

      for (let i = 0; i < rideCount; i++) {
        const currentRide = rides[i];

        
      }
    }
  }

  writeOutput(`./${fileName}.out`, resultVehicles);
  console.timeEnd(fileName);
};

describe("calcDist", () => {
  it("calc", () => {
    expect(
      calcDist(
        {
          row: 0,
          column: 0
        },
        {
          row: 2,
          column: 1
        }
      )
    ).toBe(3);

    expect(
      calcDist(
        {
          row: 0,
          column: 0
        },
        {
          row: 2,
          column: 2
        }
      )
    ).toBe(4);
  });

  it("calcVehicleDistance", () => {
    const testRide = {
      id: 0,
      start: {
        row: 2,
        column: 3
      },
      finish: {
        row: 1,
        column: 3
      },
      earliestStart: 2,
      latestFinish: 9
    };

    const testVehicle = {
      id: 2,
      rides: [2, 1],
      currentPoint: {
        row: 0,
        column: 0
      }
    };

    expect(calcVehicleRideDistance(testVehicle, testRide)).toBe(6);
  });
});

describe("main", () => {
  it("example", () => {
    run("a_example");
    // run("b_should_be_easy");
    // run("c_no_hurry");
    // run("d_metropolis");
    // run("e_high_bonus");
  });
});
