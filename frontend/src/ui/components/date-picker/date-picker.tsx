import DatePicker from "react-datepicker";
import { PatternFormat } from "react-number-format";

import { Icon } from "@/ui/components/icon/icon";

import { components } from "./date-picker.styles";

import "react-datepicker/dist/react-datepicker.css";

type Props = {
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  selected?: Date | null;
};

export const DatePickerInput: React.FC<Props> = ({
  onChange,
  placeholder,
  selected,
}) => {
  return (
    <components.root>
      <DatePicker
        customInput={
          <PatternFormat
            allowEmptyFormatting={false}
            customInput={components.input}
            format="##/##/####"
            mask="_"
            placeholder={placeholder}
          />
        }
        dateFormat="MM/dd/yyyy"
        minDate={new Date()}
        onChange={onChange}
        onChangeRaw={(e) => {
          if (e?.target instanceof HTMLInputElement) {
            const value = e.target.value.replace(/\D/g, "");

            if (value.length === 8) {
              const day = parseInt(value.slice(0, 2));
              const month = parseInt(value.slice(2, 4)) - 1;
              const year = parseInt(value.slice(4, 8));

              if (year < 1000 || year > 9999) {
                return;
              }

              const date = new Date(year, month, day);

              if (!isNaN(date.getTime())) {
                onChange?.(date);
              }
            }
          }
        }}
        placeholderText={placeholder}
        popperClassName="date-picker-popper"
        popperPlacement="bottom-start"
        selected={selected}
        strictParsing={false}
      />
      <Icon use="calendar" />
    </components.root>
  );
};
