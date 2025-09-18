import CancelIcon from "@mui/icons-material/Cancel";
import { Dialog, DialogContent, IconButton } from "@mui/material";

type ImageViewerProps = {
  image: string;
  onClose: () => void;
};

const ImageViewer = ({ image, onClose }: ImageViewerProps) => {
  return (
    <>
      <Dialog open={!!image} onClose={onClose} maxWidth="lg">
        <DialogContent
          sx={{
            p: 0,
            m: 0,
            background: "transparent",
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              margin: "1rem",
              color: "white",
            }}
          >
            <CancelIcon sx={{ width: "35px", height: "35px" }} />
          </IconButton>
          {image && (
            <img
              src={`${process.env.REACT_APP_API_URL}/${image}`}
              alt="attendance_photo"
              style={{
                width: "100%",
                maxHeight: "40vh",
                objectFit: "contain",
                display: "block",
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageViewer;
