import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export function BottomWarning({ label, to, ButtonText }) {
  return (
    <div className="py-2 text-em flex justify-center">
      <div>{label}</div>
      <Link className="pointer underline pl-1 cursor-pointer" to={to}>
        {ButtonText}
      </Link>
    </div>
  );
}
