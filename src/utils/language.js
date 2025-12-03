export const findByLanguage = (data) => {
  let result = {};
  if (data) {
    const language = localStorage.getItem("language") || "english";
    data.forEach((item) => {
      // Get the key (sport name) from the object
      const sportKey = Object.keys(item)[0];
      // Add the sport data in the result object, using the language key
      result[sportKey] = item[sportKey][language];
    });
    return result;
  }
};

export const languageValue = (valueByLanguage, key) => {
  return valueByLanguage
    ? valueByLanguage[key]
    : key
        .split("_") // Split by underscores
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        ) // Capitalize each word
        .join(" ");
};
