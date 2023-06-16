export default function categoryAsObjects() {
    return cats.map((cat, index) => {
      return {
        cat,
        id: index
      };
    });
  }
  
  const cats = [
    "CatA",
    "CatB",
    "CatC",
    "CatD",
  ];