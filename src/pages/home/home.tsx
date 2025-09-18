import { useState } from "react";
import { Box, Divider } from "@mui/material";

import ImageViewer from "../../components/image/imageViewer";
import CustomWrapper from "../../components/wrapper/customWrapper";
import { useGetMyAttendanceQuery } from "../../services/attendanceApi";
import ListAttendance from "../../components/attendance/listAttendance";
import SubmitAttendance from "../../components/attendance/submitAttendance";

const HomePage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>();

  const { data: myAttendance, isLoading: isLoadingMyAttendance } =
    useGetMyAttendanceQuery();

  const openImageHandler = (imagePath: string) => {
    setSelectedImage(imagePath);
  };

  const closeImageHandler = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <CustomWrapper>
        <Box sx={{ width: "100%" }}>
          <SubmitAttendance />
          <Divider />
          {myAttendance && (
            <ListAttendance
              onOpen={openImageHandler}
              data={myAttendance}
              isLoading={isLoadingMyAttendance}
            />
          )}
        </Box>
      </CustomWrapper>

      {selectedImage && (
        <ImageViewer image={selectedImage} onClose={closeImageHandler} />
      )}
    </>
  );
};

export default HomePage;
