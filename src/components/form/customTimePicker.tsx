import dayjs from "dayjs";
import { Controller } from "react-hook-form";
import { Box, FormLabel } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, TimeField } from "@mui/x-date-pickers";

type CustomTimePickerProps = {
  name: string;
  value: string | null;
  label: string;
  control: any;
};

const CustomTimePicker = ({
  name,
  value,
  label,
  control,
}: CustomTimePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Box>
            <FormLabel>{label}</FormLabel>
            <TimeField
              {...field}
              disabled={true}
              value={dayjs(value, "HH:mm:ss")}
              ampm={false}
              format="HH:mm:ss"
              slotProps={{
                textField: {
                  fullWidth: true,
                  error: false,
                },
              }}
              sx={{ marginTop: ".5rem" }}
            />
          </Box>
        )}
      />
    </LocalizationProvider>
  );
};

export default CustomTimePicker;
