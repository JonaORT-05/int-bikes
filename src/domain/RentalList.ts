import type { BikeType, Rental } from "./Rental.ts";

export class RentalList {
  #items: Rental[] = [];

  add(item: Rental): void {
    const exists = this.#items.some(
      (rental) => rental.bikeCode === item.bikeCode,
    );
    if (exists) {
      throw new Error("Esa bicicleta ya está alquilada.");
    }
    this.#items.push(item);
  }

  remove(_bikeCode: string): void {

    const indexBike = this.#items.findIndex(
      (rental) => rental.bikeCode === _bikeCode,
    );
    
    if(indexBike !== -1){
      this.#items.splice(indexBike,1);
    }
  }

  getItems(): readonly Rental[] {
    return [...this.#items];
  }

  getByType(type: BikeType): readonly Rental[] {
    return this.#items.filter((rental) => rental.bikeType === type);
  }

  totalIncome(): number {
    return this.#items.reduce((total, rental) => total + rental.cost(), 0);
  }

  totalLateFees(): number {
   const totalCostLateHours = this.#items
  .filter(rental => rental.lateHours > 0)
  .reduce((total, rental) => total + rental.pricePerHour, 0);
  const totalLateHours = this.#items.reduce((total, rental) => total + rental.lateHours, 0);
    return totalCostLateHours*totalLateHours*2;
  }
}
