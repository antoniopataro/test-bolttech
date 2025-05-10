import type { ISearchRepository, Search } from "@/domain/search";
import { Command } from "@/shared/utils/command";

type Params = {
  endDate: string;
  startDate: string;
  userId: string;
};

type Result = {
  search: Search;
};

export class CreateSearchCommand extends Command {
  constructor(private readonly searchRepository: ISearchRepository) {
    super(CreateSearchCommand.name);
  }

  public async execute(params: Params): Promise<Result> {
    try {
      this.logInitiated();

      const search = await this.searchRepository.create(params);

      this.logFinished();

      return {
        search: search.toSearch(),
      };
    } catch (error) {
      this.logFailed();

      throw error;
    }
  }
}
