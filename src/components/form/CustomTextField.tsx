import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

type CustomTextFieldProps = {
  control: any; // TODO: fix any
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  disabled?: boolean;
};

const CustomTextField = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
  disabled = false,
}: CustomTextFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          id={name}
          label={label}
          variant="outlined"
          placeholder={placeholder}
          type={type}
          fullWidth
          disabled={disabled}
        />
      )}
    />
  );
};

export default CustomTextField;
