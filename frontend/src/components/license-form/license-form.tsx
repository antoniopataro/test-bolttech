import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { DocumentType } from "@/shared/enums";
import { Button } from "@/ui/components/button/button";
import { DatePickerInput } from "@/ui/components/date-picker/date-picker";

import {
  licenseFormSchema,
  type LicenseFormSchema,
} from "./license-form.schema";
import { components } from "./license-form.styles";

type Props = {
  isLoading?: boolean;
  onSubmit: (data: LicenseFormSchema) => Promise<void>;
};

export const LicenseForm: React.FC<Props> = ({ isLoading, onSubmit }) => {
  const form = useForm<LicenseFormSchema>({
    defaultValues: {
      type: DocumentType.LICENSE,
    },
    resolver: zodResolver(licenseFormSchema),
  });

  return (
    <components.root>
      <components.title>Verify your driver's license</components.title>
      <components.form.root onSubmit={form.handleSubmit(onSubmit)}>
        <components.form.fields.root>
          <components.form.fields.date.root>
            <DatePickerInput
              onChange={(date) => {
                if (!date) {
                  return;
                }

                form.setValue("expirationDate", date);
              }}
              placeholder="License expiration date"
              selected={form.watch("expirationDate")}
            />
            {form.formState.errors.expirationDate && (
              <components.form.fields.date.error>
                {form.formState.errors.expirationDate.message}
              </components.form.fields.date.error>
            )}
          </components.form.fields.date.root>
        </components.form.fields.root>
        <Button disabled={isLoading} type="submit">
          Save
        </Button>
      </components.form.root>
    </components.root>
  );
};
