import type { CarEntity } from "@/entities/car.entity";
import type { SearchEntity } from "@/entities/search.entity";

import { CarCard, CarCardSkeleton } from "../car-card/car-card";

import { components } from "./listing.styles";

type Props = {
  isLoading: boolean;
  offers: CarEntity[] | null;
  search: SearchEntity;
};

export const Listing: React.FC<Props> = ({ isLoading, offers, search }) => {
  if (isLoading) {
    return (
      <components.root>
        {Array.from({ length: 3 }).map((_, index) => (
          <components.item key={index}>
            <CarCardSkeleton />
          </components.item>
        ))}
      </components.root>
    );
  }

  if (!offers || offers.length === 0) {
    return (
      <components.empty.paragraph>
        <components.empty.text>No cars found. </components.empty.text>
        <components.empty.link to="/">Go back</components.empty.link>
      </components.empty.paragraph>
    );
  }

  return (
    <components.root>
      {offers.map((car) => (
        <components.item key={car.id}>
          <components.link to={`/search/${search.id}/book/${car.id}`}>
            <CarCard car={car} days={search.getDays()} />
          </components.link>
        </components.item>
      ))}
    </components.root>
  );
};
