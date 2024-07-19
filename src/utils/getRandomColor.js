const getRandomSoftColor = () => {
  const colors = [
    "#FFB6C1", // LightPink
    "#FFDEAD", // NavajoWhite
    "#FFE4B5", // Moccasin
    "#FFDAB9", // PeachPuff
    "#E6E6FA", // Lavender
    "#E0FFFF", // LightCyan
    "#F0FFF0", // HoneyDew
    "#F5F5DC", // Beige
    "#FFFACD", // LemonChiffon
    "#F5DEB3", // Wheat
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default getRandomSoftColor;
