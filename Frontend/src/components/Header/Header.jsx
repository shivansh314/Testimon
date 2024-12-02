import React from "react";
import LogoutBtn from "./LogoutBtn";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector( (state) => state.auth.userData)

  const navigate = useNavigate();

  const navItems = [
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Get Started",
      slug: "/register",
      active: !authStatus,
    },
    {
      name: "Create",
      slug: "/createSpace",
      active: authStatus,
    },
    {
      name: "review",
      slug: "/reviews/createReview/673ba2a589788e6fc6ffcbe6",
      active: authStatus,
    },
  ];

  return (
    <div className="w-screen h-auto border-b-[0.5px] border-b-gray-200  bg-white">

        <nav className="relative w-screenmax-w-screen-xl flex flex-wrap items-center justify-between mx-auto pb-2 pt-2 pr-4 pl-4 ">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
          </div>
          <ul
            className="flex flex-col font-normal
          rtl:space-x-reverse md:flex-row md:mt-0 "
          >
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <Link to={item.slug}>
                    <button
                      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                    >
                      {item.name}
                    </button>
                  </Link>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
            {authStatus && userData && userData.$id ? (
              <li>
                <Link to={`/profile/${userData.$id}`}>
                  <img
                    src="https://community.thriveglobal.com/wp-content/uploads/2018/01/Happy_guy.jpg"
                    className="w-10 h-10 rounded-3xl ml-2 object-cover"
                    alt=""
                  />
                </Link>
              </li>
            ) : (
              <div></div> // Show loading until userData is available
            )}

          </ul>
        </nav>

    </div>
  );
}

export default Header;