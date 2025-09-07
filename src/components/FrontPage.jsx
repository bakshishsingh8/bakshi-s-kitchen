import { useNavigate, Link } from "react-router-dom";
import "../style/Home.css";
import "../style/cards.css";

export default function FrontPage() {
  const navigate = useNavigate();

  const categories = [
    {
      img: "https://thumbs.dreamstime.com/b/low-angle-photo-fast-food-items-delicious-inviting-photography-374125010.jpg",
      title: "Fast Food",
      description: "Quick bites with bold flavors and unbeatable crunch.",
      id: 1
    },
    {
      img: "https://hips.hearstapps.com/hmg-prod/images/chinese-food-68602c98ca7ab.jpg",
      title: "Chinese Food",
      description: "Authentic taste with noodles, dumplings & stir-fries.",
      id: 2
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIxuDVSOHhkXWd-reUJpUbXg7fK1dN_MD7Zg&s",
      title: "Indian Veg Food",
      description: "Traditional spices blended in vegetarian delights.",
      id: 3
    },
    {
      img: "https://c.ndtvimg.com/2021-04/umk8i7ko_pasta_625x300_01_April_21.jpg",
      title: "Italian Food",
      description: "Classic pastas, pizzas & irresistible sauces.",
      id: 4
    },
    {
      img: "https://images.slurrp.com/prod/recipe_images/taste/grilled-seafood-platter-1619715184_ZLYZFRY8F9LEP4AVZARH.webp",
      title: "Sea Food",
      description: "Fresh ocean flavors with a perfect smoky twist.",
      id: 5
    },
    {
      img: "https://blog.swiggy.com/wp-content/uploads/2024/10/Image1_-Tandoori-Chicken-1-1024x538.jpg",
      title: "Non-Veg Food",
      description: "Succulent meats cooked with rich spices & aroma.",
      id: 6
    }
  ];

  return (
    <div>
      {/* ---- Home Section ---- */}
      <div className="side-bar">
        <div className="text">
          <h1>Your Favorite Spot for <br />Delicious Moments.</h1>
          <p>
            “Delicious recipes, cooked with love in every bite.” <br />
            “Hit the order button to pick your favorite dishes.”
          </p>
          <br />
          <Link to="/CC">
          </Link>
        </div>
      </div>

      {/* ---- Cards Section ---- */}
      <div className="caaards-main">
        <div className="cards-container">
          {categories.map((item) => (
            <div className="card-text" key={item.id}>
              <img src={item.img} alt={item.title} className="card-image" />
              <h2 className="card-title">{item.title}</h2>
              <p className="card-description">{item.description}</p>
              <button
                className="button"
                onClick={() => navigate(`/menu/${item.id}`)}
              >
                View Menu
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
