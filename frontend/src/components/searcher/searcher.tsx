import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button } from "@/ui/components/button/button";
import { DatePickerInput } from "@/ui/components/date-picker/date-picker";

import { SearcherProvider, useSearcher } from "./searcher.context";
import type { SearcherSchema } from "./searcher.schema";
import { searcherSchema } from "./searcher.schema";
import { components } from "./searcher.styles";

type Props = {
  defaultValues?: SearcherSchema;
  isLoading?: boolean;
};

const Component: React.FC<Props> = ({ defaultValues, isLoading }) => {
  const navigate = useNavigate();

  const { createSearch, isLoading: isLoadingCreateSearch } = useSearcher();

  const form = useForm<SearcherSchema>({
    defaultValues,
    resolver: zodResolver(searcherSchema),
  });

  const onSubmit = useCallback(
    async (data: SearcherSchema) => {
      const search = await createSearch(data);

      if (!search) {
        return;
      }

      navigate(`/search/${search.id}`);
    },
    [createSearch, navigate],
  );

  return (
    <components.root onSubmit={form.handleSubmit(onSubmit)}>
      <components.header.root>
        <components.header.title>Search for a car:</components.header.title>
        <components.header.subtitle>
          Book your next car rental with ease.
        </components.header.subtitle>
      </components.header.root>
      <components.fields.root>
        <components.fields.date.root>
          <DatePickerInput
            onChange={(date) => {
              if (!date) {
                return;
              }

              form.setValue("startDate", date);
            }}
            placeholder="Pick-up date"
            selected={form.watch("startDate")}
          />
          {form.formState.errors.startDate && (
            <components.fields.date.error>
              {form.formState.errors.startDate.message}
            </components.fields.date.error>
          )}
        </components.fields.date.root>
        <components.fields.date.root>
          <DatePickerInput
            onChange={(date) => {
              if (!date) {
                return;
              }

              form.setValue("endDate", date);
            }}
            placeholder="Drop-off date"
            selected={form.watch("endDate")}
          />
          {form.formState.errors.endDate && (
            <components.fields.date.error>
              {form.formState.errors.endDate.message}
            </components.fields.date.error>
          )}
        </components.fields.date.root>
      </components.fields.root>
      <Button
        disabled={isLoading || isLoadingCreateSearch}
        icon="magnifying-glass"
        loading={isLoading || isLoadingCreateSearch}
        type="submit"
      >
        Search
      </Button>
    </components.root>
  );
};

export const Searcher: React.FC<Props> = ({ ...props }) => {
  return (
    <SearcherProvider>
      <Component {...props} />
    </SearcherProvider>
  );
};
