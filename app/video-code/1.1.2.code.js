"use strict";
/**
 *  Volume 1:
 *     section 1, video 2
 *
 * circle area = πr^2
 * rect area   = w * len
 * radius      = diam / 2
 * total area  = (topCircleArea * 2) + sideArea
 * Final surface area ~ 1256.64 square units
 */

const pi = Math.PI;

const multiply = (n, m) => n * m;
const sum      = (a, b) => a + b;
const divide   = (n, d) => n / d;
const squared  = n => n ** 2;
const doubled  = n => n * 2;


const height = 5;
const diam   = 5;

const diamToRadius = (diam) => divide(diam, 2);
const toPerimeter = (diam) => multiply(pi, diam);

const areaCircle = (radius) => multiply(pi, squared(radius));
const areaRect = multiply;

const surfaceAreaCylinder = (height, diameter) => sum(
  doubled(
    areaCircle(
      diamToRadius(diameter)
    )
  ),
  areaRect(
    height,
    toPerimeter(diameter)
  )
);

// function surfaceAreaCylinder(height, diameter) {
//   const areaTop = areaCircle(diamToRadius(diameter));
//   // const areaTop = (radius) => multiply(pi, squared(diamToRadius(diam)));
//   const sideArea = areaRect(height, toPerimeter(diameter));
//   // const topBottom = (diam) => multiply(2, areaTop);

//   return sum(doubled(areaTop), sideArea);
// }


const totalArea = surfaceAreaCylinder(height, diam);


// debugger;

export {multiply, sum, divide, squared, doubled};
