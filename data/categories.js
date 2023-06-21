export default function categoryAsObjects() {
    return cats.map((cat, index) => {
      return {
        cat,
        id: index
      };
    });
  }
  
  const cats = [
    "Improvements",
    "Innovation",
    "Marketing",
    "Risk",
    "Sales",

  ];