import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { useLogoutMutation } from "../../redux/features/user/userApi";
import { logout } from "../../redux/features/user/userSLice";
import { useAppDispatch } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { TUser } from "../../types/userSateData";

export default function NavbarComponent() {
  const userState = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const user: TUser | null = userState.user;
  let username, first_name, last_name, image, email, reward_point;

  if (user) {
    ({ username, first_name, last_name, image, email, reward_point } = user);
  }

  const [Logout] = useLogoutMutation();

  const handleLogout = async () => {
    const toastId = toast.loading("Logging out...");
    try {
      await Logout({});
      dispatch(logout());
      toast.success("Logged out successfully", { id: toastId });
    } catch (error) {
      toast.error("Logout failed", { id: toastId });
    }
  };

  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const resizeListener = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  const menuItems = user
    ? [
        "Home",
        "Books",
        "Contact Us",
        "My Profile",
        "My Appointments",
        "Log Out",
      ]
    : ["Home", "Books", "Contact Us"];

  return isMobile ? (
    <Navbar
      className="bg-[#ECECEC]"
      position="static"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <RouterLink to="/" className="flex items-center">
            <img src="../../../public/logo.png" alt="" className="h-12 w-12" />
            <p className="font-bold md:text-3xl text-2xl lg:text-4xl">
              Book<span className="text-navPrimary">Donate</span>
            </p>
          </RouterLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <RouterLink
            to={"/sign-up"}
            className={
              location.pathname === "/sign-up"
                ? "text-navPrimary"
                : "text-black"
            }
          >
            Sign Up
          </RouterLink>
        </NavbarItem>
        <NavbarItem>
          <RouterLink to="/login">
            <button
              className="btn bg-navPrimary text-white rounded-md px-3 hover:bg-gray-400
                hover:text-black"
            >
              Login
            </button>
          </RouterLink>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {user && (
          <NavbarMenuItem>
            <div className="gems-style w-28 flex justify-center gap-3 py-2 px-3 items-center rounded-full">
              <div>
                <img
                  src="https://web.programming-hero.com/static/media/gem.8e6eff96.svg"
                  className="h-6 w-6"
                />
              </div>
              <div>
                <p className="font-bold text-xl">{reward_point}</p>
              </div>
            </div>
          </NavbarMenuItem>
        )}
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <RouterLink
              className="w-full text-black hover:text-navPrimary"
              to={
                item === "Home"
                  ? "/"
                  : `/${item.toLowerCase().replace(" ", "-")}`
              }
            >
              {item}
            </RouterLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  ) : (
    <Navbar
      position="static"
      maxWidth="full"
      className="py-3 mx-0 bg-[#ECECEC]"
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:top-4",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-navPrimary",
        ],
      }}
    >
      <NavbarBrand>
        <RouterLink to="/" className="flex items-center gap-1">
          <img src="../../../public/logo.png" alt="" className="h-16 w-16" />
          <p className="font-bold tracking-wider md:text-3xl text-2xl lg:text-4xl">
            Book<span className="text-navPrimary">Donate</span>
          </p>
        </RouterLink>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-6 text-xl" justify="end">
        <NavbarItem isActive={location.pathname === "/"}>
          <RouterLink
            to={"/"}
            className={
              location.pathname === "/" ? "text-navPrimary" : "text-black"
            }
          >
            Home
          </RouterLink>
        </NavbarItem>
        <NavbarItem isActive={location.pathname === "/books"}>
          <RouterLink
            to={"/books"}
            className={
              location.pathname === "/books" ? "text-navPrimary" : "text-black"
            }
          >
            Books
          </RouterLink>
        </NavbarItem>
        <NavbarItem isActive={location.pathname === "/contact-us"}>
          <RouterLink
            to={"/contact-us"}
            className={
              location.pathname === "/contact-us"
                ? "text-navPrimary"
                : "text-black"
            }
          >
            Contact Us
          </RouterLink>
        </NavbarItem>
        <NavbarItem isActive={location.pathname === "/about-us"}>
          <RouterLink
            to={"/about-us"}
            className={
              location.pathname === "/about-us"
                ? "text-navPrimary"
                : "text-black"
            }
          >
            About Us
          </RouterLink>
        </NavbarItem>
        {user && (
          <div className="gems-style flex justify-center gap-3 py-3 px-4 items-center rounded-full border-2">
            <div>
              <img
                src="https://web.programming-hero.com/static/media/gem.8e6eff96.svg"
                className="h-6 w-6"
              />
            </div>
            <div>
              <p className="font-bold text-xl">{reward_point}</p>
            </div>
          </div>
        )}
        {user ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                size="sm"
                src={image as string}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-bold text-navPrimary">{username}</p>
                <p className="font-semibold">
                  {first_name} {last_name}
                </p>
                <p className="font-semibold">{email}</p>
              </DropdownItem>
              <DropdownItem key="settings">My Profile</DropdownItem>
              <DropdownItem key="team_settings">My Appointments</DropdownItem>
              <DropdownItem key="logout" color="danger">
                <button onClick={handleLogout}>Logout</button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <div className="flex items-center justify-end gap-6">
            <NavbarItem>
              <RouterLink
                to={"/sign-up"}
                className={
                  location.pathname === "/sign-up"
                    ? "text-navPrimary"
                    : "text-black"
                }
              >
                Sign Up
              </RouterLink>
            </NavbarItem>
            <NavbarItem>
              <RouterLink to={"/login"}>
                <button
                  className="btn bg-navPrimary text-white rounded-md text-lg px-5 hover:bg-gray-400
                hover:text-black"
                >
                  Login
                </button>
              </RouterLink>
            </NavbarItem>
          </div>
        )}
      </NavbarContent>
    </Navbar>
  );
}
