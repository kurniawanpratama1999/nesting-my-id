const cNames = (bases = {}, variants = {}) => {
  bases = Object.entries(bases)
    .map(([key, val]) => val)
    .filter(Boolean)
    .join(' ');

  return (variant = {}, className = '') => {
    variant = Object.entries(variant)
      .map(([key, val]) => variants[key]?.[val] || null)
      .filter(Boolean)
      .join(' ');

    return `${bases} ${variant} ${className}`.trim();
  };
};

export default cNames