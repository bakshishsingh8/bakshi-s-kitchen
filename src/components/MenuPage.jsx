

import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../style/cards.css";
import "../style/Menu.css";
import { useDispatch, useSelector } from "react-redux";
import { storeWholeValue, removeItem } from "../redux/counter/counterSlice";

export default function MenuPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const categoryId = parseInt(id);
  const dispatch = useDispatch();

  // 👇 Get cart items from Redux
  const cartItems = useSelector((state) => state.counter.foodItem);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);

  const categoryNames = {
    1: "Fast Food",
    2: "Chinese Food",
    3: "Indian Food",
    4: "Italian Food",
    5: "Seafood",
    6: "Mughlai Food",
  };

  const menus = {
    1: [
      { id: 1, childId: "1-1", name: "Cheese Burger", price: 120, img: "https://img.freepik.com/free-photo/classic-cheese-burger-with-beef-cutlet-vegetables-onions-isolated-white-background_123827-29709.jpg?semt=ais_hybrid&w=740&q=80" },
      { id: 2, childId: "1-2", name: "French Fries", price: 80, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzt8lCFiXLokm_zxL9pDOzt3qWCslRXBR8Zg&s" },
      { id: 3, childId: "1-3", name: "Spring Roll", price: 50, img: "https://redhousespice.com/wp-content/uploads/2021/12/whole-spring-rolls-and-halved-ones-scaled.jpg" },
      { id: 4, childId: "1-4", name: "Hot Dog", price: 100, img: "https://www.licious.in/blog/wp-content/uploads/2016/07/Hot-Dogs.jpg" },
      { id: 5, childId: "1-5", name: "Donuts", price: 200, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStIh-cqS6LsrlWeFRiWulZq4L3BqaIJg6BPA&s" },
      { id: 6, childId: "1-6", name: "Fride Chicken", price: 280, img: "https://t3.ftcdn.net/jpg/06/10/82/10/360_F_610821014_f7Jm2AO7taNJwEIlNDTxCkb4s4thrZlu.jpg" },
      { id: 7, childId: "1-7", name: "Cold Drinks", price: 80, img: "https://images.herzindagi.info/image/2022/May/cold-drink-hacks-to-know.jpg" },
      { id: 8, childId: "1-8", name: "Shake", price: 50, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNXzDrWXZgnTge-Ejhf2S9NRKj_wN-0TtTFQ&s" }
    ],
    2: [
      { id: 1, childId: "2-1", name: "Hakka Noodles", price: 150, img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/07/hakka-noodles-recipe.jpg" },
      { id: 2, childId: "2-2", name: "Spring Rolls", price: 120, img: "https://cdn-legfb.nitrocdn.com/aiHDyxrcHRjWsojZyJGgKsBUscbMvcPi/assets/images/optimized/rev-8729426/www.gurkhas.com.au/wp-content/uploads/2024/07/Spring-Roll-with-Plum-sauce1-1.jpg" },
      { id: 3, childId: "2-3", name: "Chilli Chicken", price: 299, img: "https://www.licious.in/blog/wp-content/uploads/2022/04/shutterstock_1498639676-min.jpg" },
      { id: 4, childId: "2-4", name: "Dumplings", price: 180, img: "https://maplefromcanada.ca/uploads/2024/07/Recette-dumpling-champignons-erable-2-1200x900-1-600x450.jpg" },
      { id: 5, childId: "2-5", name: "Manchurian", price: 150, img: "https://www.temptingtreat.com/wp-content/uploads/2025/02/manchurian-with-product-p1-2.jpg" },
      { id: 6, childId: "2-6", name: "Sweet and Sour Pork.", price: 120, img: "https://cdn.sanity.io/images/2r0kdewr/production/0bc6f529c1200c84a8465d9317c3029898a4d4fa-1500x844.jpg" },
      { id: 7, childId: "2-7", name: "Chicken lollipop", price: 220, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrq0X38bc1xgwo6_5V_SUMwxiTWCanRjv83g&s" },
      { id: 8, childId: "2-8", name: "Chinese Tea", price: 80, img: "https://images.prismic.io/orientalmart/ZpfBAh5LeNNTxPCp_chinese-tea-2644251_1280.jpg?auto=format,compress" }
    ],
    3: [
      { id: 1, childId: "3-1", name: "Paneer Butter Masala", price: 180, img: "https://www.cookwithmanali.com/wp-content/uploads/2019/05/Paneer-Butter-Masala.jpg" },
      { id: 2, childId: "3-2", name: "Dal Tadka", price: 150, img: "https://www.cookwithmanali.com/wp-content/uploads/2014/08/Dal-Tadka-500x375.jpg" },
      { id: 3, childId: "3-3", name: "Roti", price: 20, img: "https://static.toiimg.com/thumb/75542650.cms?imgsize=2236995&width=800&height=800" },
      { id: 4, childId: "3-4", name: "Malai Kofta", price: 200, img: "https://tse1.mm.bing.net/th/id/OIP.uxz1bkgARi-fzT7qninxeAHaE8?pid=Api&P=0&h=180" },
      { id: 5, childId: "3-5", name: "Palak Paneer", price: 250, img: "https://www.yummytummyaarthi.com/wp-content/uploads/2021/11/palak-paneer-1.jpg" },
      { id: 6, childId: "3-6", name: "Chole Bhature", price: 50, img: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Chole_Bhature_from_Nagpur.JPG" },
      { id: 7, childId: "3-7", name: "Dahi Vada", price: 180, img: "https://www.cubesnjuliennes.com/wp-content/uploads/2020/06/Soft-Dahi-Vada-Recipe.jpg" },
      { id: 8, childId: "3-8", name: "Avial", price: 150, img: "https://www.vegrecipesofindia.com/wp-content/uploads/2011/11/avial-recipe-11.jpg" }
    ],
    4: [
      { id: 1, childId: "4-1", name: "Margherita Pizza", price: 250, img: "https://recipes.heart.org/-/media/AHA/Recipe/Recipe-Images/Classic-Margherita-Pizza-with-Whole-Wheat-Pizza-Crust.jpg?sc_lang=en&hash=8669621DF39E46A90612215CFACFE313" },
      { id: 2, childId: "4-2", name: "White Sauce Pasta", price: 200, img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2024/04/white-sauce-pasta.jpg" },
      { id: 3, childId: "4-3", name: "Cheesy Garlic Bread", price: 100, img: "https://feelgoodfoodie.net/wp-content/uploads/2023/03/Garlic-Cheese-Bread-08.jpg" },
      { id: 4, childId: "4-4", name: "Ragu alla Bolognese", price: 250, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCV8RnOzLgxTq1j4E6ohDjoDxXEe7yp20grA&s" },
      { id: 5, childId: "4-5", name: "Lasagna", price: 50, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu1FpZrLwZ6m54v_cOA4PMNifIwcfo7Qs2VQ&s" },
      { id: 6, childId: "4-6", name: "Cacio e Pepe", price: 180, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOGaE1_UpCQEByPqu3bjt33aPA7KEnEbRt_Q&s" },
      { id: 7, childId: "4-7", name: "Risotto alla Milanese", price: 250, img: "https://cookingitalians.com/wp-content/uploads/2024/11/Risotto-alla-Milanese.jpg" },
      { id: 8, childId: "4-8", name: "Gnocchi", price: 150, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSESCaSZyfowShkt3h-MxRPzbuEATseHIosAg&s" }
    ],
    5: [
      { id: 1, childId: "5-1", name: "Grilled Fish", price: 350, img: "https://static01.nyt.com/images/2021/08/18/dining/20Porgyrex1/12Porgyrex2-jumbo.jpg" },
      { id: 2, childId: "5-2", name: "Prawns Curry", price: 400, img: "https://glebekitchen.com/wp-content/uploads/2021/10/southindianprawncurrytopbowl.jpg" },
      { id: 3, childId: "5-3", name: "Crab Masala", price: 450, img: "https://www.indrani-will-teach.com/wp-content/uploads/2022/11/crab.jpg" },
      { id: 4, childId: "5-4", name: "Sushi and Sashimi", price: 350, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbksYzjT3MRWXxA0jUpzDNVVz3ACfWC8xNbQ&s" },
      { id: 5, childId: "5-5", name: "Lobster Rolls", price: 400, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKpyZOcn2_CmTEwRx7Z62VseW9W9ddk0M0Tg&s" },
      { id: 6, childId: "5-6", name: "Grilled Salmon", price: 450, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUD-8MZYYVW7oIqJ0dVHgznmWopJASmGJJkg&s" },
      { id: 7, childId: "5-7", name: "Cioppino", price: 350, img: "https://bertolli.com/wp-content/uploads/2017/07/CioppinoAllaArrabbiata-d.jpg" },
      { id: 8, childId: "5-8", name: "Moqueca", price: 400, img: "https://static01.nyt.com/images/2016/03/16/dining/16MOQUECA/16MOQUECA-superJumbo.jpg" }
    ],
    6: [
      { id: 1, childId: "6-1", name: "Tandoori Chicken", price: 300, img: "https://www.easycookingwithmolly.com/wp-content/uploads/2023/11/air-fryer-whole-tandoori-chicken-3-480x480.jpg" },
      { id: 2, childId: "6-2", name: "Chicken Biryani", price: 280, img: "https://www.licious.in/blog/wp-content/uploads/2022/06/chicken-hyderabadi-biryani-01.jpg" },
      { id: 3, childId: "6-3", name: "BBQ Ribs", price: 500, img: "https://realhousemoms.com/wp-content/uploads/Grilled-Ribs-RECIPE-CARD.jpg" },
      { id: 4, childId: "6-4", name: "Grilled Fish", price: 350, img: "https://static01.nyt.com/images/2021/08/18/dining/20Porgyrex1/12Porgyrex2-jumbo.jpg" },
      { id: 5, childId: "6-5", name: "Tunde Kebab", price: 400, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxcYKEHQVHMs8AQrEl5X8jbBHJnIUqFphEFw&s" },
      { id: 6, childId: "6-6", name: "Lamb Vindaloo", price: 450, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShndk69Wa2GWFMDdM7m-4NG0PW5udUbtVwlQ&s" },
      { id: 7, childId: "6-7", name: "Butter Chicken", price: 350, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_sZZjpyR1dUFAMRo5b7BzEIaPWLaDk0UUdA&s" },
      { id: 8, childId: "6-8", name: "Mutton Keema", price: 400, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKgit9mwVqlhFCYyyG8CBIWTh6GciXNxN9kw&s" }
    ]

    // other categories ...
  };

  return (
    <div className="menu-background">
      <div className="cards-main">
        <h2 className="menu-title">{categoryNames[categoryId]} Items</h2>
        <br />
        {/* <button className="button back-btn" onClick={() => navigate("/")}>
          ← Back
        </button> */}

        <div className="menu-cards">
          {menus[categoryId]?.map((menuItem, i) => {
            // 👇 find if this item already exists in cart
            const existing = cartItems.find(
              (f) => f.childId === menuItem.childId
            );
            console.log(menuItem, 'menus itemeee')

            return (
              <div className="menu-card" key={`${menuItem.name}-${i}`}>
                <img
                  src={menuItem.img}
                  alt={menuItem.name}
                  className="menu-image"
                />
                <h3 className="menu-name">{menuItem.name}</h3>
                <p className="menu-price">₹{menuItem.price}</p>
                <div className="menu-actions">
                  {/* Add button */}
                  <button
                    className="add-btn"
                    onClick={() => dispatch(storeWholeValue(menuItem))}
                  >
                    +
                    {existing && (
                      <span className="item-qty-badge">{existing.quantity}</span>
                    )}
                  </button>

                  {/* Remove button (decrease quantity or remove if 0) */}
                  {existing && (
                    <button
                      className="remove-btn"
                      style={{zIndex:999}}
                      onClick={() => dispatch(removeItem(menuItem.childId))}
                    >
                      –
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
