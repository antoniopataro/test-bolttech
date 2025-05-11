import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { DocumentType } from "@/shared/enums";
import { DatePickerInput } from "@/ui/components/date-picker/date-picker";

import {
  licenseFormSchema,
  type LicenseFormSchema,
} from "./license-form.schema";
import { components } from "./license-form.styles";

type Props = {
  defaultValues?: LicenseFormSchema;
  isLoading?: boolean;
  message?: string;
  onSubmit: (data: LicenseFormSchema) => Promise<void>;
};

export const LicenseForm: React.FC<Props> = ({
  defaultValues,
  isLoading,
  message,
  onSubmit,
}) => {
  const form = useForm<LicenseFormSchema>({
    defaultValues: {
      ...defaultValues,
      type: DocumentType.LICENSE,
    },
    resolver: zodResolver(licenseFormSchema),
  });

  return (
    <components.root>
      <components.header.root>
        <components.header.title>
          Verify your driver's license:
        </components.header.title>
        {message && (
          <components.header.message>{message}</components.header.message>
        )}
      </components.header.root>
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
        <components.form.button
          disabled={isLoading}
          icon="document-text"
          loading={isLoading}
          type="submit"
        >
          Save
        </components.form.button>
      </components.form.root>
    </components.root>
  );
};
