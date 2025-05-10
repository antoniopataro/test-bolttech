import { useMemo } from "react";
import Skeleton from "react-loading-skeleton";

import type { CarEntity } from "@/entities/car.entity";
import { currencyUtils } from "@/shared/utils/currency";

import { carCardHelper } from "./car-card.helper";
import { components } from "./car-card.styles";

type Props = {
  car: CarEntity;
  days: number;
};

export const CarCard: React.FC<Props> = ({ car, days }) => {
  const image = useMemo(() => {
    return carCardHelper.getRandomCarImage();
  }, []);

  const pricingDaily = car.getDailyPricing();
  const pricingDailyFormatted = currencyUtils.formatCurrency(pricingDaily);
  const pricingTotal = car.getTotalPricing();
  const pricingTotalFormatted = currencyUtils.formatCurrency(pricingTotal);

  return (
    <components.root>
      <components.left.root>
        <components.left.image src={image} />
      </components.left.root>
      <components.center.root>
        <components.center.description.root>
          <components.center.description.brand>
            {car.brand}
          </components.center.description.brand>
          <components.center.description.model>
            {car.model}
          </components.center.description.model>
        </components.center.description.root>
        <components.center.stock>Stock: {car.stock}</components.center.stock>
      </components.center.root>
      <components.right.root>
        <components.right.pricing.root>
          <components.right.pricing.daily>
            {pricingDailyFormatted}/day
          </components.right.pricing.daily>
          <components.right.pricing.total>
            Total for {days} {days === 1 ? "day" : "days"}:{" "}
            {pricingTotalFormatted}
          </components.right.pricing.total>
        </components.right.pricing.root>
      </components.right.root>
    </components.root>
  );
};

export const CarCardSkeleton: React.FC = () => {
  return (
    <components.root>
      <components.left.root>
        <Skeleton borderRadius={16} height={84} width={84} />
      </components.left.root>
      <components.center.root>
        <components.center.description.root>
          <components.center.description.brand>
            <Skeleton height={15.5} width={42} />
          </components.center.description.brand>
          <components.center.description.model>
            <Skeleton height={24.5} width={64} />
          </components.center.description.model>
        </components.center.description.root>
        <components.center.stock>
          <Skeleton height={13} width={42} />
        </components.center.stock>
      </components.center.root>
      <components.right.root>
        <components.right.pricing.root>
          <components.right.pricing.daily>
            <Skeleton height={24.5} width={72} />
          </components.right.pricing.daily>
          <components.right.pricing.total>
            <Skeleton height={15.5} width={42} />
          </components.right.pricing.total>
        </components.right.pricing.root>
      </components.right.root>
    </components.root>
  );
};
