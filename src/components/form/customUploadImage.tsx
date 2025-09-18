import { useDropzone } from "react-dropzone";
import { Controller } from "react-hook-form";
import { useState, useCallback } from "react";
import { Box, FormControl, FormLabel, Typography } from "@mui/material";

type CustomUploadImageProps = {
  name: string;
  control: any;
};

const CustomUploadImage = ({ name, control }: CustomUploadImageProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop,
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <>
          <FormControl fullWidth>
            <FormLabel>Photo</FormLabel>
            <Box
              {...getRootProps()}
              sx={{
                border: "2px dashed #aaa",
                borderRadius: 2,
                padding: 3,
                textAlign: "center",
                cursor: "pointer",
                marginTop: 1,
              }}
            >
              <input
                {...getInputProps()}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setPreview(URL.createObjectURL(file));
                    onChange(file);
                  }
                }}
              />
              <Typography variant="body2" color="textSecondary">
                Click here or drag & drop to upload an image
              </Typography>
            </Box>
          </FormControl>

          {preview && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 2,
                width: "100%",
              }}
            >
              <Box
                component="img"
                src={preview}
                alt="Uploaded"
                sx={{
                  maxWidth: "100%",
                  maxHeight: 300,
                  objectFit: "contain",
                  borderRadius: 2,
                  boxShadow: 1,
                }}
              />
            </Box>
          )}
        </>
      )}
    />
  );
};

export default CustomUploadImage;
