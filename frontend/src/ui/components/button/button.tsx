import { Icon, type Icons } from "../icon/icon";
import { LoadingSpinner } from "../loading-spinner/loading-spinner";

import { components } from "./button.styles";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: Icons;
  loading?: boolean;
};

export const Button: React.FC<Props> = ({
  children,
  icon,
  loading,
  ...props
}) => {
  return (
    <components.root {...props}>
      {loading ? <LoadingSpinner /> : icon ? <Icon use={icon} /> : null}
      {children}
    </components.root>
  );
};
