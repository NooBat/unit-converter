const express = require('express');
const router = express.Router();

const units = [
  { name: 'Millimeter', value: 'mm', type: 'length' },
  { name: 'Centimeter', value: 'cm', type: 'length' },
  { name: 'Meter', value: 'm', type: 'length' },
  { name: 'Kilometer', value: 'km', type: 'length' },
  { name: 'Inch', value: 'in', type: 'length' },
  { name: 'Foot', value: 'ft', type: 'length' },
  { name: 'Yard', value: 'yd', type: 'length' },
  { name: 'Mile', value: 'mi', type: 'length' },
  { name: 'Milligram', value: 'mg', type: 'weight' },
  { name: 'Gram', value: 'g', type: 'weight' },
  { name: 'Kilogram', value: 'kg', type: 'weight' },
  { name: 'Pound', value: 'lb', type: 'weight' },
  { name: 'Ounce', value: 'oz', type: 'weight' },
  { name: 'Celsius', value: '°C', type: 'temperature' },
  { name: 'Fahrenheit', value: '°F', type: 'temperature' },
  { name: 'Kelvin', value: 'K', type: 'temperature' },
];

router.post('/result', function (req, res, next) {
  const { fromUnit, toUnit, value } = req.body;
  const from = units.find((unit) => unit.value === fromUnit);
  const to = units.find((unit) => unit.value === toUnit);
  const type = from.type;

  if (!from || !to) {
    return res.status(400).send('Invalid unit');
  }

  let result;

  if (type === 'length') {
    const lengthConversions = {
      mm: 0.001,
      cm: 0.01,
      m: 1,
      km: 1000,
      in: 0.0254,
      ft: 0.3048,
      yd: 0.9144,
      mi: 1609.34,
    };

    result =
      (value * lengthConversions[from.value]) / lengthConversions[to.value];
  } else if (type === 'weight') {
    const weightConversions = {
      mg: 0.001,
      g: 1,
      kg: 1000,
      lb: 453.592,
      oz: 28.3495,
    };

    result =
      (value * weightConversions[from.value]) / weightConversions[to.value];
  } else {
    if (from.name === 'Celsius') {
      result =
        to.name === 'Fahrenheit' ? (value * 9) / 5 + 32 : parseFloat(value) + 273.15;
    } else if (from.name === 'Fahrenheit') {
      result =
        to.name === 'Celsius'
          ? ((value - 32) * 5) / 9
          : ((parseFloat(value) - 32) * 5) / 9 + 273.15;
    } else {
      result =
        to.value === 'Celsius'
          ? value - 273.15
          : ((parseFloat(value) - 273.15) * 9) / 5 + 32;
    }
  }

  res.render('result', {
    title: 'Unit Converter - Result',
    fromUnit,
    toUnit,
    value,
    result,
    type,
  });
});

router.get('/:type', function (req, res, next) {
  const type = req.params.type;
  res.render('index', {
    title: 'Unit Converter',
    type,
    units: units.filter((unit) => unit.type === type),
  });
});

module.exports = router;
