const carMock = {
  params: {
    model: 'Ferrari Maranello',
    year: 1963,
    color: 'red',
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2
  },
  car: {
    _id: '4edd40c86762e0fb12000003',
    model: 'Ferrari Maranello',
    year: 1963,
    color: 'red',
    buyValue: 3500000,
    seatsQty: 2,
    doorsQty: 2
  }, 
  list: [
    {
      id: '4edd40c86762e0fb12000003',
      model: 'Ferrari Maranello',
      year: 1963,
      color: 'red',
      buyValue: 3500000,
      seatsQty: 2,
      doorsQty: 2
    }, {
      _id: '4edd40c86762e0fb12555503',
      model: 'Fiat Uno',
      year: 1963,
      color: 'blue',
      buyValue: 3500,
      seatsQty: 4,
      doorsQty: 4
    }
  ],
  updated: {
    id: '4edd40c86762e0fb12000003',
    model: 'Fiat Uno',
    year: 1963,
    color: 'blue',
    buyValue: 35000,
    seatsQty: 2,
    doorsQty: 2
  }, 
  invalid: {
    model: 'So',
    year: 2025,
    color: 'black',
    buyValue: 40000,
    seatsQty: 6,
    doorsQty: 4,
  }
}

export default carMock;