export default function categoryAsObjects() {
    return cats.map((cat, index) => {
      return {
        cat,
        id: index
      };
    });
  }
  
  const cats = [
    "Marketing",
    "Innovation",
    "Improvements",
    "Sales",
    "Finance",
    "Human Resource",
    "Coding",
    "Architecture",
  ];