import { Searcher } from "@/components/searcher/searcher";

import { components } from "./home.styles";

export const Home: React.FC = () => {
  return (
    <components.root>
      <Searcher />
    </components.root>
  );
};
