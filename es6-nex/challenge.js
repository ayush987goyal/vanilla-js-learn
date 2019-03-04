class TownElement {
  constructor(name, buildYear) {
    this.name = name;
    this.buildYear = buildYear;
  }

  getAge() {
    return new Date().getFullYear() - this.buildYear;
  }
}

class Park extends TownElement {
  constructor(name, buildYear, trees, area) {
    super(name, buildYear);
    this.trees = trees;
    this.area = area;
  }

  getTreeDensity() {
    return this.trees / this.area;
  }
}

class Street extends TownElement {
  constructor(name, buildYear, length) {
    super(name, buildYear);
    this.length = length;
  }

  getSizeClassification() {
    let classification = 'normal';

    if (this.length < 1) {
      classification = 'tiny';
    } else if (this.length >= 1 && this.length < 2.5) {
      classification = 'small';
    } else if (this.length >= 2.5 && this.length < 5) {
      classification = 'normal';
    } else if (this.length >= 5 && this.length < 10) {
      classification = 'big';
    } else if (this.length >= 10) {
      classification = 'huge';
    }

    return classification;
  }
}

function printParksReport(parks = []) {
  console.log('-------PARKS REPORT---------');

  const totalParks = parks.length;

  const avgAge = parks.reduce((sum, park) => (sum += park.getAge()), 0) / totalParks;
  console.log(`Our ${totalParks} parks have an average age of ${avgAge} years.`);

  parks.forEach(park => {
    console.log(`${park.name} has a tree density of ${park.getTreeDensity()} trees per sq. km.`);
  });

  const parkWithMoreTrees = parks.find(park => park.trees > 1000);
  console.log(`${parkWithMoreTrees.name} has more than 1000 trees.`);
}

function printStreetsReport(streets = []) {
  console.log('-------STREETS REPORT---------');

  const totalStreets = streets.length;

  const totalLength = streets.reduce((sum, street) => (sum += street.length), 0);
  const averageLength = totalLength / totalStreets;
  console.log(
    `Our ${totalStreets} streets have a total length of ${totalLength} km, with an average of ${averageLength} km.`
  );

  streets.forEach(street => {
    console.log(
      `${street.name}, built in ${street.buildYear}, is a ${street.getSizeClassification()} street`
    );
  });
}

const parks = [
  new Park('Park-1', 1990, 570, 0.75),
  new Park('Park-2', 1998, 1002, 1.1),
  new Park('Park-3', 1970, 758, 0.87)
];
const streets = [
  new Street('Street-1', 1990, 1.7),
  new Street('Street-2', 2010, 5.6),
  new Street('Street-3', 2012, 0.88),
  new Street('Street-4', 1997, 11.3)
];

printParksReport(parks);
printStreetsReport(streets);
