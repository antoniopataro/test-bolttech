import { components } from "./button.styles";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<Props> = ({ children, ...props }) => {
  return <components.root {...props}>{children}</components.root>;
};
