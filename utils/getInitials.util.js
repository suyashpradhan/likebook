export const getInitials = (fullName) => {
  return fullName.split("").slice(0, 1).join("");
};
