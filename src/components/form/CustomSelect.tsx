import React from "react";
import { Controller } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

type Option = {
  key: string;
  label: string;
};

type CustomSelectProps = {
  name: string;
  control: any; // TODO: fix any
  label: string;
  options: Option[];
  fullWidth?: boolean;
};

export function CustomSelect({
  name,
  control,
  label,
  options,
  fullWidth = true,
}: CustomSelectProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl fullWidth={fullWidth} error={!!fieldState.error}>
          <InputLabel>{label}</InputLabel>
          <Select {...field} label={label} value={field.value || ""}>
            {options.map((opt) => (
              <MenuItem key={opt.key} value={opt.key}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
          {fieldState.error && (
            <FormHelperText>{fieldState.error.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
