export const carsSelector = (state) => ({
  cars: state.car.list
});

export const searchCarResultSelector = (state) => ({
  searchedCar: state.car.searchedCar
});

export const carMakersSelector = (state) => ({
  makers: state.car.makers
});

export const modelsOfMakerSelector = (state) => ({
  modelsOfMaker: state.car.modelsOfMaker
});

export const carSelectedSelector = (state) => ({
  carSelected: state.car.selected
});

export const carOfWeekSelector = (state) => ({
  carOfWeek: state.car.carOfWeek
});
