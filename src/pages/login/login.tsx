import { AuthType } from "../../constants/auth";
import AuthElement from "../../components/auth/auth";

const LoginPage = () => {
  return (
    <>
      <AuthElement type={AuthType.LOGIN} />
    </>
  );
};

export default LoginPage;
