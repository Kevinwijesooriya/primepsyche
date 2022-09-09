import React from "react";
import PropTypes from "prop-types";

function PSection(props) {
  const { children } = props;
  return <section {...props}>{children}</section>;
}

PSection.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

PSection.defaultProps = {
  children: <></>,
};

export default PSection;
