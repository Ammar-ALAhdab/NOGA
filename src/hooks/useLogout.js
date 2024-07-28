import useAuth from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const useLogout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(["refreshToken"]);

  const logout = async () => {
    setAuth({});
    navigate("/", { replace: true });
    removeCookie("refreshToken");
    removeCookie("role");
    // try {
    //   const response = await axios("/logout", {
    //     withCredentials: true,
    //   });
    // } catch (err) {
    //   console.error(err);
    // }
  };

  return logout;
};

export default useLogout;
