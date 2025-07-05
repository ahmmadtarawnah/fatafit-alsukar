import { useState, useEffect } from "react";
import { Cloud, Star, Gift, Sun, Moon, Sparkles, Home, X, User, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoImg from "../Shared/Screenshot_2025-05-09_132412-removebg-preview (1).png";
import Swal from 'sweetalert2';

export default function KidFriendlyNavbarArabic() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeItem, setActiveItem] = useState("الصفحة الرئيسية");
  const [hoveredItem, setHoveredItem] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [activitiesDropdownOpen, setActivitiesDropdownOpen] = useState(false);
  const [mobileActivitiesDropdownOpen, setMobileActivitiesDropdownOpen] =
    useState(false);
  const [donationDropdownOpen, setDonationDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userFullName, setUserFullName] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Check login status from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/users/me", {
      credentials: "include",
    })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        setIsLoggedIn(!!data.user);
        if (data.user) {
          setUserFullName(data.user.fullName);
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
        setUserFullName("");
      });
  }, [location]);

  // Update active item based on current route
  useEffect(() => {
    const pathToName = {
      "/": "الصفحة الرئيسية",
      "/Activities": "مجتمع فتافيت",
      "/donation": "  التبرعات",
      "/Services": "خدماتنا",
      "/contact": "تواصل معنا",
      "/login": "سجل معنا",
      "/patientrequest": "سجل معنا",
      "/volunteerrequest": "سجل معنا",
      "/membershiprequest": "سجل معنا",
      "/success-stories": "قصص النجاح",
    };
    setActiveItem(pathToName[location.pathname] || "الصفحة الرئيسية");
  }, [location]);

  const navItems = [
    { name: "الصفحة الرئيسية", path: "/", icon: <Home className="w-5 h-5" /> },
    {
      name: "مجتمع فتافيت",
      path: "/Activities",
      icon: <Star className="w-5 h-5" />,
    },
    {
      name: " التبرعات ",
      path: "/donation",
      icon: <Gift className="w-5 h-5" />,
    },
    {
      name: "خدماتنا",
      path: "/Services",
      icon: <Sun className="w-5 h-5" />,
    },
    {
      name: "تواصل معنا",
      path: "/contact",
      icon: <Cloud className="w-5 h-5" />,
    },
    {
      name: "سجل معنا",
      path: "/login",
      icon: <Sparkles className="w-5 h-5" />,
    },
  ];

  // Dropdown options for 'سجل معنا'
  const signupOptions = [
    { label: "تسجيل مستفيد/خدمة", to: "/patientrequest" },
    { label: "تسجيل متطوع", to: "/volunteerrequest" },
    { label: "تسجيل عضوية", to: "/membershiprequest" },
    { label: "تسجيل دخول ", to: "/login" },
  ];

  // Dropdown options for 'الفعاليات والنشاطات'
  const activitiesOptions = [
    { label: "الأخبار و الفعاليات", to: "/Activities" },
    { label: "نصائح", to: "/articles" },
    { label: "قصص ملهمة", to: "/success-stories" },
    { label: "أرشيف المحتوى", to: "/archive" },
    { label: "النادي الصيفي", to: "/summer-club" },
  ];

  // Add donation options array
  const donationOptions = [
    { label: "تبرع نقدي", to: "/donation/cash" },
    { label: "تبرع عيني / اجهزة", to: "/donation/items" },
  ];

  // Create emoji bubbles that float up randomly
  const EmojiBubbles = () => {
    const emojiBubbles = [];
    const emojis = ["✨", "🌟", "🎈", "🎁", "🚀", "🌈", "😊", "🦄"];

    for (let i = 0; i < 8; i++) {
      const randomLeft = Math.floor(Math.random() * 100);
      const randomDelay = Math.floor(Math.random() * 5);
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

      emojiBubbles.push(
        <div
          key={i}
          className="absolute text-xl opacity-0 animate-float"
          style={{
            left: `${randomLeft}%`,
            animationDelay: `${randomDelay}s`,
            fontSize: `${Math.random() * 10 + 16}px`,
          }}
        >
          {randomEmoji}
        </div>
      );
    }

    return (
      <div className="absolute w-full h-full overflow-hidden pointer-events-none">
        {emojiBubbles}
      </div>
    );
  };

  // Function to render each icon based on the item name
  const getIcon = (name) => {
    switch (name) {
      case "الصفحة الرئيسية":
        return <Home className="w-5 h-5" />;
      case "مجتمع فتافيت":
        return <Star className="w-5 h-5" />;
      case "تبرع لحبة سكر":
      case " التبرعات ":
        return <Gift className="w-5 h-5" />;
      case "خدماتنا":
        return <Sun className="w-5 h-5" />;
      case "تواصل معنا":
        return <Cloud className="w-5 h-5" />;
      case "سجل معنا":
        return <Sparkles className="w-5 h-5" />;
      default:
        return <Star className="w-5 h-5" />;
    }
  };

  // navItems without سجل معنا if logged in
  const navItemsFiltered = isLoggedIn
    ? navItems.filter((item) => item.name !== "سجل معنا")
    : navItems;

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        setIsLoggedIn(false);
        setUserFullName("");
        await Swal.fire({
          icon: 'success',
          title: 'تم تسجيل الخروج',
          text: 'تم تسجيل خروجك بنجاح!',
          confirmButtonText: 'حسناً'
        });
        navigate("/");
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'خطأ',
        text: 'حدث خطأ أثناء تسجيل الخروج',
        confirmButtonText: 'حسناً'
      });
    }
  };

  return (
    <nav
      className={`w-full transition-all duration-500 z-50 ${
        scrollPosition > 20 ? "bg-white shadow-lg py-1" : "bg-white py-3"
      }`}
    >
      {/* Decorative top rainbow border */}
      <div className="h-2 w-full bg-gradient-to-r from-blue-300 via-blue-400 to-blue-300 relative overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full animate-shimmer bg-gradient-to-r from-transparent via-white to-transparent"
          style={{ backgroundSize: "200% 100%" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Background floating elements */}
        <EmojiBubbles />

        <div className="flex flex-row-reverse items-center justify-between w-full">
          {/* Logo section */}
          <Link
            to="/"
            className="flex-shrink-0 flex items-center relative min-w-[60px] sm:min-w-[80px] md:min-w-[160px]"
            style={{ zIndex: 2 }}
          >
            <div
              className={`
                w-24 sm:w-32 md:w-40 flex items-center justify-center
                transition-all duration-300
                ${scrollPosition > 20 ? "scale-90" : ""}
              `}
              style={{ height: "72px", position: "relative" }}
            >
              <img
                src={logoImg}
                alt="كتاكيت السكر Logo"
                className="object-contain"
                style={{
                  height: "110px",
                  width: "auto",
                  marginTop: "-19px",
                  marginBottom: "-19px",
                  display: "block",
                  maxWidth: "100%",
                }}
              />
            </div>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 focus:outline-none transition-all duration-300 overflow-hidden shadow-md"
            aria-label="فتح القائمة"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {isOpen ? (
                <X className="w-6 h-6 text-blue-500" />
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-6 h-1 bg-blue-500 rounded-full mb-1"></div>
                  <div className="w-6 h-1 bg-blue-500 rounded-full mb-1"></div>
                  <div className="w-6 h-1 bg-blue-500 rounded-full"></div>
                </div>
              )}
            </div>
          </button>

          {/* Desktop menu */}
          <div className="hidden md:block w-full">
            <div
              className="flex items-center justify-center gap-2 lg:gap-4 px-2"
              dir="rtl"
            >
              {navItemsFiltered.map((item) =>
                item.name === "سجل معنا" ? (
                  <div
                    key={item.name}
                    className="relative group"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button
                      type="button"
                      className={`
                        text-base lg:text-lg font-medium px-2 lg:px-3 py-2 
                        rounded-full transition-all duration-300 
                        relative group whitespace-nowrap
                        ${
                          activeItem === item.name
                            ? "text-white bg-blue-500 shadow-md animate-pulse-subtle"
                            : "text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                        }
                      `}
                    >
                      <div className="flex items-center gap-1 lg:gap-2 justify-center">
                        {getIcon(item.name)}
                        <span className="whitespace-nowrap">{item.name}</span>
                      </div>
                    </button>
                    {/* Dropdown menu */}
                    <div
                      className={`absolute right-0 w-48 bg-white rounded-lg shadow-lg border border-blue-100 transition-all duration-300 z-50 overflow-hidden
                        ${
                          dropdownOpen
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                        }
                      `}
                      style={{ transitionProperty: "opacity, transform", minWidth: '220px', whiteSpace: 'nowrap' }}
                    >
                      {signupOptions.map((opt) => (
                        <Link
                          key={opt.to}
                          to={opt.to}
                          className="block px-4 py-3 text-blue-600 hover:bg-blue-50 hover:text-[#2B6CB0] transition-all text-base"
                          onClick={() => setDropdownOpen(false)}
                        >
                          {opt.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : item.name === "مجتمع فتافيت" ? (
                  <div
                    key={item.name}
                    className="relative group"
                    onMouseEnter={() => setActivitiesDropdownOpen(true)}
                    onMouseLeave={() => setActivitiesDropdownOpen(false)}
                  >
                    <button
                      type="button"
                      className={`
                        text-base lg:text-lg font-medium px-2 lg:px-3 py-2 
                        rounded-full transition-all duration-300 
                        relative group whitespace-nowrap
                        ${
                          activeItem === item.name
                            ? "text-white bg-blue-500 shadow-md animate-pulse-subtle"
                            : "text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                        }
                      `}
                    >
                      <div className="flex items-center gap-1 lg:gap-2 justify-center">
                        {getIcon(item.name)}
                        <span className="whitespace-nowrap">{item.name}</span>
                      </div>
                    </button>
                    {/* Dropdown menu */}
                    <div
                      className={`absolute right-0 w-48 bg-white rounded-lg shadow-lg border border-blue-100 transition-all duration-300 z-50 overflow-hidden
                        ${
                          activitiesDropdownOpen
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                        }
                      `}
                      style={{ transitionProperty: "opacity, transform" }}
                    >
                      {activitiesOptions.map((opt) => (
                        <Link
                          key={opt.to}
                          to={opt.to}
                          className="block px-4 py-3 text-blue-600 hover:bg-blue-50 hover:text-[#2B6CB0] transition-all text-base"
                          onClick={() => setActivitiesDropdownOpen(false)}
                        >
                          {opt.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : item.name.trim() === "التبرعات" ? (
                  <div
                    key={item.name}
                    className="relative group"
                    onMouseEnter={() => setDonationDropdownOpen(true)}
                    onMouseLeave={() => setDonationDropdownOpen(false)}
                  >
                    <button
                      type="button"
                      className={`
                        text-base lg:text-lg font-medium px-2 lg:px-3 py-2 
                        rounded-full transition-all duration-300 
                        relative group whitespace-nowrap
                        ${
                          activeItem === item.name
                            ? "text-white bg-blue-500 shadow-md animate-pulse-subtle"
                            : "text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                        }
                      `}
                    >
                      <div className="flex items-center gap-1 lg:gap-2 justify-center">
                        {getIcon(item.name)}
                        <span className="whitespace-nowrap">{item.name}</span>
                      </div>
                    </button>
                    {/* Dropdown menu */}
                    <div
                      className={`absolute right-0 w-48 bg-white rounded-lg shadow-lg border border-blue-100 transition-all duration-300 z-50 overflow-hidden
                        ${
                          donationDropdownOpen
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                        }
                      `}
                      style={{ transitionProperty: "opacity, transform", minWidth: '220px', whiteSpace: 'nowrap' }}
                    >
                      {donationOptions.map((opt) => (
                        <Link
                          key={opt.to}
                          to={opt.to}
                          className="block px-4 py-3 text-blue-600 hover:bg-blue-50 hover:text-[#2B6CB0] transition-all text-base"
                          onClick={() => setDonationDropdownOpen(false)}
                        >
                          {opt.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    onMouseEnter={() => setHoveredItem(item.name)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className={`
                      text-base lg:text-lg font-medium px-2 lg:px-3 py-2 
                      rounded-full transition-all duration-300 
                      relative group
                      whitespace-nowrap
                      ${
                        activeItem === item.name
                          ? "text-white bg-blue-500 shadow-md animate-pulse-subtle"
                          : "text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                      }
                    `}
                  >
                    <div className="flex items-center gap-1 lg:gap-2 justify-center">
                      {getIcon(item.name)}
                      <span className="whitespace-nowrap">{item.name}</span>
                    </div>
                    {/* Floating bubbles on hover */}
                    {hoveredItem === item.name && !activeItem === item.name && (
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute -bottom-2 left-1/4 w-2 h-2 bg-blue-300 rounded-full animate-float-fast"></div>
                        <div
                          className="absolute -bottom-2 left-2/4 w-1 h-1 bg-blue-200 rounded-full animate-float-fast"
                          style={{ animationDelay: "0.3s" }}
                        ></div>
                        <div
                          className="absolute -bottom-2 left-3/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-float-fast"
                          style={{ animationDelay: "0.6s" }}
                        ></div>
                      </div>
                    )}
                    {/* Active item sparkles */}
                    {activeItem === item.name && (
                      <>
                        <span className="absolute top-0 left-0 w-2 h-2 bg-yellow-200 rounded-full animate-ping"></span>
                        <span
                          className="absolute bottom-0 right-0 w-2 h-2 bg-yellow-200 rounded-full animate-ping"
                          style={{ animationDelay: "0.5s" }}
                        ></span>
                      </>
                    )}
                  </Link>
                )
              )}
              {/* Profile icon and logout button if logged in */}
              {isLoggedIn && (
                <div className="relative group flex items-center gap-2">
                  <button
                    type="button"
                    className="text-blue-500 hover:text-blue-700 px-2 py-2 rounded-full flex items-center gap-2 font-medium text-base lg:text-lg focus:outline-none"
                    tabIndex={0}
                    style={{ position: 'relative' }}
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <User className="w-5 h-5" />
                    <span>{userFullName || "الملف الشخصي"}</span>
                  </button>
                  {/* Dropdown menu */}
                  <div
                    className="absolute left-0 top-full mt-2 min-w-[160px] bg-white rounded-lg shadow-lg border border-blue-100 z-50 transition-all duration-200 overflow-hidden opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
                    style={{ transitionProperty: 'opacity, transform' }}
                    tabIndex={-1}
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-3 text-blue-600 hover:bg-blue-50 hover:text-[#2B6CB0] transition-all text-base"
                      tabIndex={0}
                    >
                      الملف الشخصي
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-right block px-4 py-3 text-red-500 hover:bg-red-50 hover:text-red-700 transition-all text-base"
                      tabIndex={0}
                    >
                      تسجيل الخروج
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
          dir="rtl"
        >
          <div className="pt-20 pb-6 px-4">
            <div className="flex flex-col space-y-4">
              {navItemsFiltered.map((item) =>
                item.name === "سجل معنا" ? (
                  <div key={item.name} className="relative">
                    <button
                      type="button"
                      onClick={() => setMobileDropdownOpen((v) => !v)}
                      className={`
                        text-lg font-medium px-4 py-3 
                        rounded-full transition-all duration-300 
                        relative group w-full text-right
                        ${
                          activeItem === item.name
                            ? "text-white bg-blue-500 shadow-md"
                            : "text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3 justify-end">
                        {getIcon(item.name)}
                        <span>{item.name}</span>
                      </div>
                    </button>
                    {/* Dropdown menu */}
                    <div
                      className={`transition-all duration-300 overflow-hidden bg-white rounded-lg shadow-lg border border-blue-100 mt-2 z-50
                        ${
                          mobileDropdownOpen
                            ? "max-h-60 opacity-100"
                            : "max-h-0 opacity-0"
                        }
                      `}
                      style={{ transitionProperty: "max-height, opacity" }}
                    >
                      {signupOptions.map((opt) => (
                        <Link
                          key={opt.to}
                          to={opt.to}
                          className="block px-4 py-3 text-blue-600 hover:bg-blue-50 hover:text-[#2B6CB0] transition-all text-base"
                          onClick={() => {
                            setIsOpen(false);
                            setMobileDropdownOpen(false);
                          }}
                        >
                          {opt.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : item.name === "مجتمع فتافيت" ? (
                  <div key={item.name} className="relative">
                    <button
                      type="button"
                      onClick={() => setMobileActivitiesDropdownOpen((v) => !v)}
                      className={`
                        text-lg font-medium px-4 py-3 
                        rounded-full transition-all duration-300 
                        relative group w-full text-right
                        ${
                          activeItem === item.name
                            ? "text-white bg-blue-500 shadow-md"
                            : "text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3 justify-end">
                        {getIcon(item.name)}
                        <span>{item.name}</span>
                      </div>
                    </button>
                    {/* Dropdown menu */}
                    <div
                      className={`transition-all duration-300 overflow-hidden bg-white rounded-lg shadow-lg border border-blue-100 z-50
                        ${
                          mobileActivitiesDropdownOpen
                            ? "max-h-60 opacity-100"
                            : "max-h-0 opacity-0"
                        }
                      `}
                      style={{ transitionProperty: "max-height, opacity" }}
                    >
                      {activitiesOptions.map((opt) => (
                        <Link
                          key={opt.to}
                          to={opt.to}
                          className="block px-4 py-3 text-blue-600 hover:bg-blue-50 hover:text-[#2B6CB0] transition-all text-base"
                          onClick={() => {
                            setIsOpen(false);
                            setMobileActivitiesDropdownOpen(false);
                          }}
                        >
                          {opt.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : item.name.trim() === "التبرعات" ? (
                  <div
                    key={item.name}
                    className="relative group"
                    onMouseEnter={() => setMobileDropdownOpen((v) => !v)}
                    onMouseLeave={() => setMobileDropdownOpen(false)}
                  >
                    <button
                      type="button"
                      className={`
                        text-lg font-medium px-4 py-3 
                        rounded-full transition-all duration-300 
                        relative group w-full text-right
                        ${
                          activeItem === item.name
                            ? "text-white bg-blue-500 shadow-md"
                            : "text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                        }
                      `}
                    >
                      <div className="flex items-center gap-3 justify-end">
                        {getIcon(item.name)}
                        <span>{item.name}</span>
                      </div>
                    </button>
                    {/* Dropdown menu */}
                    <div
                      className={`transition-all duration-300 overflow-hidden bg-white rounded-lg shadow-lg border border-blue-100 mt-2 z-50
                        ${
                          mobileDropdownOpen
                            ? "max-h-60 opacity-100"
                            : "max-h-0 opacity-0"
                        }
                      `}
                      style={{ transitionProperty: "max-height, opacity" }}
                    >
                      {donationOptions.map((opt) => (
                        <Link
                          key={opt.to}
                          to={opt.to}
                          className="block px-4 py-3 text-blue-600 hover:bg-blue-50 hover:text-[#2B6CB0] transition-all text-base"
                          onClick={() => {
                            setIsOpen(false);
                            setMobileDropdownOpen(false);
                          }}
                        >
                          {opt.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => {
                      setIsOpen(false);
                      setActiveItem(item.name);
                      setMobileDropdownOpen(false);
                    }}
                    className={`
                      text-lg font-medium px-4 py-3 
                      rounded-full transition-all duration-300 
                      relative group
                      ${
                        activeItem === item.name
                          ? "text-white bg-blue-500 shadow-md"
                          : "text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      {getIcon(item.name)}
                      <span>{item.name}</span>
                    </div>
                  </Link>
                )
              )}
              {/* Profile icon and logout if logged in (mobile) */}
              {isLoggedIn && (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium px-4 py-3 rounded-full transition-all duration-300 relative group w-full text-right flex items-center gap-3 justify-end text-blue-500 hover:text-blue-700 hover:bg-blue-50"
                  >
                    <User className="w-5 h-5" />
                    <span>{userFullName || "الملف الشخصي"}</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="text-lg font-medium px-4 py-3 rounded-full transition-all duration-300 relative group w-full text-right flex items-center gap-3 justify-end text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>تسجيل الخروج</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer decoration - cloud border */}
      <div className="h-3 w-full bg-gradient-to-r from-blue-100 via-blue-300 to-blue-100 relative">
        <div className="absolute inset-0 flex justify-between items-center">
          <div className="w-6 h-6 rounded-full bg-white translate-y-1/2 translate-x-6"></div>
          <div className="w-8 h-8 rounded-full bg-white translate-y-1/2"></div>
          <div className="w-4 h-4 rounded-full bg-white translate-y-1/2 -translate-x-10"></div>
          <div className="w-5 h-5 rounded-full bg-white translate-y-1/2 -translate-x-5"></div>
          <div className="w-7 h-7 rounded-full bg-white translate-y-1/2 translate-x-10"></div>
        </div>
      </div>

      {/* Add global animations */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-500%);
            opacity: 0;
          }
        }

        @keyframes float-fast {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100%);
            opacity: 0;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse-subtle {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          75%,
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        .animate-float {
          animation: float 8s linear infinite;
        }

        .animate-float-fast {
          animation: float-fast 2s linear infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </nav>
  );
}
