import CategoryShop from "./category-shop";

const DisplayCard = () => {
  const sex = [
    {
      sex: "men",
      http: "https://plus.unsplash.com/premium_photo-1733701621462-a74d3d408319?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      sex: "women",
      http: "https://plus.unsplash.com/premium_photo-1682095661711-f5d67d0e75a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZhc2hpb24lMjB3b21hbnxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      sex: "kids",
      http: "https://plus.unsplash.com/premium_photo-1697183203524-3e7c6da4d4e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGtpZCUyMGhvb2RpZXxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  const datas = [
    {
      category: "cloths",
      http: "https://images.unsplash.com/photo-1596918404383-22e2c91f4964?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGZhc2hpb24lMjBjbG90aHN8ZW58MHx8MHx8fDA%3D",
    },
    {
      category: "trousers",
      http: "https://images.unsplash.com/photo-1715532098304-1e81e1f42600?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFzaGlvbiUyMHRyb3VzZXJzfGVufDB8fDB8fHww",
    },
    {
      category: "undies",
      http: "https://images.unsplash.com/photo-1584061634739-88035e420618?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YnJhfGVufDB8fDB8fHww",
    },
    {
      category: "accessories",
      http: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFzaGlvbiUyMGFjY2Vzc29yaWVzfGVufDB8fDB8fHww",
    },
    {
      category: "jewelries",
      http: "https://plus.unsplash.com/premium_photo-1709033404514-c3953af680b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8amV3ZWxyeXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      category: "beauty & style",
      http: "https://images.unsplash.com/photo-1598528738936-c50861cc75a9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXR5JTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D",
    },
  ];

  return (
    <>
      <CategoryShop title={"Shop by categories"} datas={datas} />
      <CategoryShop title={"Shop by sex"} datas={sex} />
    </>
  );
};

export default DisplayCard;
