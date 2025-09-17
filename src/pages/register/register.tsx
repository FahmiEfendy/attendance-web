import { AuthType } from "../../constants/auth";
import AuthElement from "../../components/auth/auth";

const RegisterPage = () => {
  return (
    <>
      <AuthElement type={AuthType.REGISTER} />
    </>
  );
};

export default RegisterPage;
