import { Link, useLocation, useNavigate } from 'react-router';
function List({ label, type = 'button', redirect = '' }) {
  const navigate = useNavigate();

  const handleRedirectList = () => {
    navigate(redirect);
  };

  const location = useLocation().pathname;

  return type == 'button' ? (
    <li
      onClick={handleRedirectList}
      className={`px-3 py-1 cursor-pointer hover:text-emerald-800 ${
        location.includes(redirect) ? 'font-semibold text-emerald-800' : 'font-normal'
      }`}>
      {label}
    </li>
  ) : (
    <li>
      <Link
        to={redirect}
        className={`px-3 py-1 cursor-pointer hover:text-emerald-800 ${
          location.includes(redirect) ? 'font-semibold text-emerald-800' : 'font-normal'
        }`}>
        {label}
      </Link>
    </li>
  );
}

export default List;
