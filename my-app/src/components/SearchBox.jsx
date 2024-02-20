import PropTypes from "prop-types";
import { HiSearch } from "react-icons/hi";

const SearchBox = ({ value, onChange }) => {
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <HiSearch />
      <div>Search term...</div>
    </div>
  );
};

SearchBox.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default SearchBox;
