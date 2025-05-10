import { v4 as uuidv4 } from "uuid";

import type { SearchCreationAttributes } from "@/domain/search";
import { SearchEntity } from "@/domain/search";
import { type ISearchRepository } from "@/domain/search";

export class InMemorySearchRepository implements ISearchRepository {
  private searches: SearchEntity[] = [];

  //

  public async create(data: SearchCreationAttributes): Promise<SearchEntity> {
    const search = new SearchEntity({
      ...data,
      id: uuidv4(),
    });

    this.searches.push(search);

    return search;
  }

  public async findById(id: string): Promise<SearchEntity | null> {
    const search = this.searches.find((search) => search.id === id);

    if (!search) {
      return null;
    }

    return search;
  }
}
