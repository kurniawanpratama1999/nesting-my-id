import { Link, useLocation, useNavigate } from "react-router";
function List({ label, type = "button", redirect = "" }) {
  const navigate = useNavigate();

  const handleRedirectList = () => {
    navigate(redirect);
  };

  const location = useLocation().pathname;

  return type == "button" ? (
    <li>
      <button
        onClick={handleRedirectList}
        className={`px-3 py-1 cursor-pointer hover:text-yellow-400 ${
          location.includes(redirect)
            ? "font-semibold text-yellow-400"
            : "font-normal text-gray-300"
        }`}
      >
        {label}
      </button>
    </li>
  ) : (
    <li>
      <Link
        to={redirect}
        className={`px-3 py-1 cursor-pointer hover:text-yellow-400 ${
          location.includes(redirect)
            ? "font-semibold text-yellow-400"
            : "font-normal text-gray-300"
        }`}
      >
        {label}
      </Link>
    </li>
  );
}

export default List;
