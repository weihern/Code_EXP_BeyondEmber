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
    "Risk",
    "Sales",
    "Marketing",
    "CatB",
    "CatC",
    "CatD",
    "CatA",
    "CatB",
    "CatC",
    "CatD",
    "CatA",
    "CatB",
    "CatC",
    "CatD",
  ];