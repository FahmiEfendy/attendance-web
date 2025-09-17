import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

type CustomTextFieldProps = {
  control: any; // TODO: fix any
  name: string;
  label: string;
  placeholder: string;
  type?: string;
};

const CustomTextField = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
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
        />
      )}
    />
  );
};

export default CustomTextField;
