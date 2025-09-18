import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Box, Divider } from "@mui/material";

import { RootState } from "../../store";
import { DecodedToken } from "../../types/auth";
import { ROLE_ENUM } from "../../constants/role";
import ImageViewer from "../../components/image/imageViewer";
import CustomWrapper from "../../components/wrapper/customWrapper";
import ListAttendance from "../../components/attendance/listAttendance";
import SubmitAttendance from "../../components/attendance/submitAttendance";
import {
  useGetAllAttendanceQuery,
  useGetMyAttendanceQuery,
} from "../../services/attendanceApi";

const HomePage = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  const [userData, setUserData] = useState<DecodedToken>();
  const [selectedImage, setSelectedImage] = useState<string | null>();

  const { data: attendanceList, isLoading: isLoadingAttendanceList } =
    useGetAllAttendanceQuery(undefined, {
      skip: userData?.role !== ROLE_ENUM.HR, // Prevent fetch if userData not HR
    });

  const { data: myAttendance, isLoading: isLoadingMyAttendance } =
    useGetMyAttendanceQuery(undefined, {
      skip: userData?.role !== ROLE_ENUM.EMPLOYEE, // Prevent fetch if userData not Employee
    });

  const openImageHandler = (imagePath: string) => {
    setSelectedImage(imagePath);
  };

  const closeImageHandler = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode<DecodedToken>(token);
      setUserData(decoded);
    }
  }, [token]);

  return (
    <>
      <CustomWrapper>
        {userData?.role === ROLE_ENUM.HR ? (
          attendanceList && (
            <Box sx={{ width: "100%" }}>
              <ListAttendance
                onOpen={openImageHandler}
                data={attendanceList}
                isLoading={isLoadingAttendanceList}
                role={userData?.role}
              />
            </Box>
          )
        ) : (
          <Box sx={{ width: "100%" }}>
            <SubmitAttendance role={userData?.role || ""} />
            <Divider />
            {myAttendance && (
              <ListAttendance
                onOpen={openImageHandler}
                data={myAttendance}
                isLoading={isLoadingMyAttendance}
              />
            )}
          </Box>
        )}
      </CustomWrapper>

      {selectedImage && (
        <ImageViewer image={selectedImage} onClose={closeImageHandler} />
      )}
    </>
  );
};

export default HomePage;
