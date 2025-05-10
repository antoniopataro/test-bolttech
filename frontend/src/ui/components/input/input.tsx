import { components } from "./input.styles";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<Props> = ({ children, ...props }) => {
  return (
    <components.root>
      <components.input {...props} />
      {children}
    </components.root>
  );
};
