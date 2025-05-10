import type { ISearchRepository, Search, SearchEntity } from "@/domain/search";
import { Command } from "@/shared/utils/command";

type Params = {
  searchId: string;
};

type RelatedEntities = {
  search: SearchEntity;
};

type Result = {
  search: Search;
};

export class GetSearchCommand extends Command {
  constructor(private readonly searchRepository: ISearchRepository) {
    super(GetSearchCommand.name);
  }

  public async execute(params: Params): Promise<Result> {
    try {
      this.logInitiated();

      const { search } = await this.getRelatedEntities(params);

      this.logFinished();

      return {
        search: search.toSearch(),
      };
    } catch (error) {
      this.logFailed();

      throw error;
    }
  }

  private async getRelatedEntities(params: Params): Promise<RelatedEntities> {
    const { searchId } = params;

    const search = await this.searchRepository.findById(searchId);

    if (!search) {
      throw new Error("Search not found.");
    }

    return {
      search,
    };
  }
}
