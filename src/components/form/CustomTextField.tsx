import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

type CustomTextFieldProps = {
  control: any; // TODO: fix any
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  disabled?: boolean;
  isRequired?: boolean;
  errors?: any;
};

const CustomTextField = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
  disabled = false,
  isRequired = false,
  errors = {},
}: CustomTextFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: isRequired ? `${label} is required` : false,
      }}
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
          error={!!errors[name]}
          helperText={errors[name]?.message as string}
        />
      )}
    />
  );
};

export default CustomTextField;
