import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toggleSideBar } from "../utils/store/appSlice";

interface Category {
  title: string;
  items: { name: string; value: string }[];
}

const categories: Category[] = [
  {
    title: "Men's Fashion",
    items: [
      { name: "Shirts", value: "mens-shirts" },
      { name: "Shoes", value: "mens-shoes" },
      { name: "Watches", value: "mens-watches" }
    ]
  },
  {
    title: "Women's Fashion",
    items: [
      { name: "Dresses", value: "womens-dresses" },
      { name: "Jewellery", value: "womens-jewellery" },
      { name: "Shoes", value: "womens-shoes" },
      { name: "Watches", value: "womens-watches" }
    ]
  },
  {
    title: "Furniture, Decoration, Kitchen",
    items: [
      { name: "Furniture", value: "furniture" },
      { name: "Home Decorations", value: "home-decoration" },
      { name: "Kitchen Accessories", value: "kitchen-accessories" }
    ]
  },
  {
    title: "Mobile, Laptop, Sports",
    items: [
      { name: "Mobiles", value: "smartphones" },
      { name: "Laptops", value: "laptops" },
      { name: "Sports accessories", value: "sports-accessories" }
    ]
  }
];

const CategorySideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (category: string) => {
    dispatch(toggleSideBar());
    navigate("/products/search?c=" + category);
  };

  return (
    <div className="px-4 pb-2 w-full lg:w-3/12 h-[85vh] overflow-y-scroll absolute border-t-2 bg-white text-zinc-900 z-10">
      {categories.map((category, index) => (
        <ul key={index}>
          <li className="mb-2 mt-5 text-xl font-semibold">
            {category.title}
          </li>
          {category.items.map((item, i) => (
            <li
              key={i}
              className="text-zinc-600 py-2 px-3 cursor-pointer hover:bg-zinc-400 hover:text-white"
              data-value={item.value}
              onClick={(e) => handleClick(e.currentTarget.dataset.value!)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default CategorySideBar;
