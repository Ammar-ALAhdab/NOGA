import navData from "../../assets/icons/sideBar/constants";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { useState } from "react";
import useLogout from "../../hooks/useLogout";
import { useCookies } from "react-cookie";

function SideBar({ role }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [cookies, ,] = useCookies("role");
  const logout = useLogout();
  const links = navData[role]?.links || {};
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div
      className={`${
        isExpanded ? "md:w-[150px] lg:w-[200px]" : "w-fit"
      } my-height-sidbar flex items-center justify-end sticky top-4 shrink-0`}
    >
      <aside
        className={`${
          isExpanded ? "w-full md:p-2 p-4" : "w-[50px] px-2 py-4"
        } h-full rounded-[30px] bg-primary flex flex-col items-center justify-between transition-[all] `}
      >
        {!isExpanded && (
          <div className="my-parent-hover">
            <img
              src={navData.profileIcon[0]}
              alt="profile icon"
              width={22}
              height={22}
              className="cursor-pointer my-child-none"
            />
            <img
              src={navData.profileIcon[1]}
              alt="profile icon"
              width={22}
              height={22}
              className="cursor-pointer hidden my-child-block"
            />
          </div>
        )}
        {isExpanded && (
          <>
            <div className="md:w-[50px] md:h-[50px] lg:w-[75px] lg:h-[75px] rounded-full bg-white"></div>
            <div className="w-full text-white text-center">
              <h1 className="md:text-[14px] lg:text-lg mb-2" dir="rtl">
                {cookies.role == "admin" ? "System Admin" : navData[role].role}
              </h1>
              <p className="text-sm">
                {cookies.role == "admin" ? "NOGA" : "some one"}
              </p>
            </div>
          </>
        )}
        <ul className={`${isExpanded ? "w-full" : "w-fit"}`}>
          {Object.entries(links).map(([label, values]) => (
            <li key={label} className="last:mt-16">
              {label === "تسجيل الخروج" ? (
                <button
                  onClick={logout}
                  className={`text-white w-full flex justify-end items-center gap-2 py-2 cursor-pointer ${
                    isExpanded ? "border-b border-white hover:pr-2" : ""
                  } h-[42px] hover:text-yellow-400 hover:border-b-yellow-400 my-parent-hover transition-all`}
                >
                  {isExpanded && (
                    <span className="lg:text-sm md:text-xs">{label}</span>
                  )}
                  <div>
                    <img
                      src={values[0]}
                      alt={values[0]}
                      className="my-child-none md:w-4 lg:w-[22px] md:h-4 lg:h-[22px]"
                    />
                    <img
                      src={values[1]}
                      alt={values[0]}
                      className="hidden my-child-block md:w-4 lg:w-6 md:h-4 lg:h-6"
                    />
                  </div>
                </button>
              ) : (
                <NavLink
                  to={encodeURI(values[2])}
                  className={`text-white w-full flex justify-end items-center gap-2 py-2 cursor-pointer ${
                    isExpanded ? "border-b border-white hover:pr-2" : ""
                  } h-[42px] hover:text-yellow-400 hover:border-b-yellow-400 my-parent-hover transition-all`}
                >
                  {isExpanded && (
                    <span className="lg:text-sm md:text-xs">{label}</span>
                  )}
                  <div>
                    <img
                      src={values[0]}
                      alt={values[0]}
                      className="my-child-none md:w-4 lg:w-[22px] md:h-4 lg:h-[22px]"
                    />
                    <img
                      src={values[1]}
                      alt={values[0]}
                      className="hidden my-child-block md:w-4 lg:w-[22px] md:h-4 lg:h-[22px]"
                    />
                  </div>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
        <button
          className={`w-full ${
            isExpanded ? "rotate-180" : ""
          } transition-[transform] duration-700 my-parent-hover`}
          onClick={toggleSidebar}
        >
          <img
            src={navData.sidebarArrow[0]}
            alt="Sidebar Arrow"
            className="mx-auto rotate-180 my-child-none md:w-5 lg:w-[24px] md:h-5 lg:h-[24px]"
          />
          <img
            src={navData.sidebarArrow[1]}
            alt="Sidebar Arrow"
            className="mx-auto rotate-180 hidden my-child-block md:w-5 lg:w-[24px] md:h-5 lg:h-[24px]"
          />
        </button>
      </aside>
    </div>
  );
}

SideBar.propTypes = {
  role: PropTypes.string,
};

export default SideBar;
