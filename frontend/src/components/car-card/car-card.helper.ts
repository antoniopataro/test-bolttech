import carBlack from "@/assets/car-black.png";
import carComfort from "@/assets/car-comfort.png";
import carDiamond from "@/assets/car-diamond.png";
import carWhite from "@/assets/car-white.png";

const images = [carBlack, carComfort, carDiamond, carWhite];

class CarCardHelper {
  public getRandomCarImage() {
    return images[Math.floor(Math.random() * images.length)];
  }
}

export const carCardHelper = new CarCardHelper();
