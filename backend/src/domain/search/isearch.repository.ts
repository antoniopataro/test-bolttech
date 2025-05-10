import type { SearchEntity } from "./search.entity";
import type { SearchCreationAttributes } from "./search.types";

export interface ISearchRepository {
  create(data: SearchCreationAttributes): Promise<SearchEntity>;
  findById(id: string): Promise<SearchEntity | null>;
}
