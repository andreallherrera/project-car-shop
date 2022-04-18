const motoMock = {
  params: {
    model: 'Honda CG Titan 125',
    year: 1963,
    color: 'red',
    buyValue: 3500,
    category: 'Street',
    engineCapacity: 125
  },
  moto: {
    _id: '4edd40c86762e0fb12000003',
    model: 'Honda CG Titan 125',
    year: 1963,
    color: 'red',
    buyValue: 3500,
    category: 'Street',
    engineCapacity: 125
  },
  invalid: {
    model: 'Honda CG Titan 125',
    color: 'red',
    buyValue: 3500,
    category: 'Street',
    engineCapacity: 125
  },
  list: [
    {
      _id: '4edd40c86762e0fb12000003',
      model: 'Honda CG Titan 125',
      year: 1963,
      color: 'red',
      buyValue: 3500,
      category: 'Street',
      engineCapacity: 125
    },
    {
      _id: '4edd40c56732e0fb12000003',
      model: 'Honda',
      year: 1980,
      color: 'blue',
      buyValue: 3800,
      category: 'Street',
      engineCapacity: 125
    }
  ],
  updated: {
      _id: '4edd40c86762e0fb12000003',
      model: 'Honda CG Titan 125',
      year: 1963,
      color: 'black',
      buyValue: 3500,
      category: 'Street',
      engineCapacity: 125
  }
}

export default motoMock;