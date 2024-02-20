import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { HiArrowLeft } from "react-icons/hi";

const BackLink = ({ to, children }) => {
  return (
    <Link to={to}>
      <HiArrowLeft size="24" />
      {children}
    </Link>
  );
};

BackLink.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  children: PropTypes.node.isRequired,
};

export default BackLink;