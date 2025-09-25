// /////////////////////////////
import { useEffect, useState, useRef } from "react";
import { Search } from "lucide-react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  storeWholeValue,
  removeItem,
  clearCart,
} from "../redux/counter/counterSlice";
import { getGeminiSuggestion } from "../gamini.js";
import "../style/Menu.css";
import "../style/search-filter.css";
import "../style/menu-animation.css";

export default function MenuPage() {
  const { id } = useParams();
  const categoryId = parseInt(id);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.counter.foodItem);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchRef = useRef(null);

  // --- Static Menus
  const menus = {

     1: [
      { id: 1, childId: "1-1", name: "Cheese Burger", price: 120, img: "https://img.freepik.com/free-photo/classic-cheese-burger-with-beef-cutlet-vegetables-onions-isolated-white-background_123827-29709.jpg?semt=ais_hybrid&w=740&q=80", description: "Juicy beef patty with melted cheese, fresh lettuce, and sauces." },
      { id: 2, childId: "1-2", name: "French Fries", price: 80, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzt8lCFiXLokm_zxL9pDOzt3qWCslRXBR8Zg&s", description: "Crispy golden fries with a pinch of salt." },
      { id: 3, childId: "1-3", name: "Spring Roll", price: 50, img: "https://redhousespice.com/wp-content/uploads/2021/12/whole-spring-rolls-and-halved-ones-scaled.jpg", description: "Crunchy rolls stuffed with veggies and spices." },
      { id: 4, childId: "1-4", name: "Hot Dog", price: 100, img: "https://www.licious.in/blog/wp-content/uploads/2016/07/Hot-Dogs.jpg", description: "Sausage in a soft bun with mustard and ketchup." },
      { id: 5, childId: "1-5", name: "Donuts", price: 200, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStIh-cqS6LsrlWeFRiWulZq4L3BqaIJg6BPA&s", description: "Sweet, fluffy donuts glazed with sugar." },
      { id: 6, childId: "1-6", name: "Fried Chicken", price: 280, img: "https://t3.ftcdn.net/jpg/06/10/82/10/360_F_610821014_f7Jm2AO7taNJwEIlNDTxCkb4s4thrZlu.jpg", description: "Crispy, golden-brown fried chicken with juicy meat." },
      { id: 7, childId: "1-7", name: "Cold Drinks", price: 80, img: "https://images.herzindagi.info/image/2022/May/cold-drink-hacks-to-know.jpg", description: "Refreshing fizzy drinks served chilled." },
      { id: 8, childId: "1-8", name: "Shake", price: 50, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNXzDrWXZgnTge-Ejhf2S9NRKj_wN-0TtTFQ&s", description: "Thick milkshake with creamy flavor." }
    ],
    2: [
      { id: 1, childId: "2-1", name: "Hakka Noodles", price: 150, img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/07/hakka-noodles-recipe.jpg", description: "Stir-fried noodles tossed with veggies and sauces." },
      { id: 2, childId: "2-2", name: "Spring Rolls", price: 120, img: "https://cdn-legfb.nitrocdn.com/aiHDyxrcHRjWsojZyJGgKsBUscbMvcPi/assets/images/optimized/rev-8729426/www.gurkhas.com.au/wp-content/uploads/2024/07/Spring-Roll-with-Plum-sauce1-1.jpg", description: "Deep-fried rolls filled with spiced veggies." },
      { id: 3, childId: "2-3", name: "Chilli Chicken", price: 299, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-UTf66TOQLCMSRXncZitp83GJz8wqSktNWA&s", description: "Spicy chicken tossed with chilies and soy sauce." },
      { id: 4, childId: "2-4", name: "Dumplings", price: 180, img: "https://maplefromcanada.ca/uploads/2024/07/Recette-dumpling-champignons-erable-2-1200x900-1-600x450.jpg", description: "Steamed or fried dough pockets with fillings." },
      { id: 5, childId: "2-5", name: "Manchurian", price: 150, img: "https://www.temptingtreat.com/wp-content/uploads/2025/02/manchurian-with-product-p1-2.jpg", description: "Crispy balls cooked in Indo-Chinese sauce." },
      { id: 6, childId: "2-6", name: "Sweet and Sour Pork", price: 120, img: "https://cdn.sanity.io/images/2r0kdewr/production/0bc6f529c1200c84a8465d9317c3029898a4d4fa-1500x844.jpg", description: "Tangy pork cooked in sweet and sour sauce." },
      { id: 7, childId: "2-7", name: "Chicken Lollipop", price: 220, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrq0X38bc1xgwo6_5V_SUMwxiTWCanRjv83g&s", description: "Crispy fried chicken wings in lollipop style." },
      { id: 8, childId: "2-8", name: "Chinese Tea", price: 80, img: "https://images.prismic.io/orientalmart/ZpfBAh5LeNNTxPCp_chinese-tea-2644251_1280.jpg?auto=format,compress", description: "Traditional tea served hot and soothing." }
    ],
    3: [
      { id: 1, childId: "3-1", name: "Paneer Butter Masala", price: 180, img: "https://www.cookwithmanali.com/wp-content/uploads/2019/05/Paneer-Butter-Masala.jpg", description: "Creamy tomato-based curry with soft paneer cubes, mildly spiced and rich in flavor." },
      { id: 2, childId: "3-2", name: "Dal Tadka", price: 150, img: "https://www.cookwithmanali.com/wp-content/uploads/2014/08/Dal-Tadka-500x375.jpg", description: "Yellow lentils tempered with ghee, garlic, and aromatic spices." },
      { id: 3, childId: "3-3", name: "Roti", price: 20, img: "https://static.toiimg.com/thumb/75542650.cms?imgsize=2236995&width=800&height=800", description: "Soft whole wheat flatbread, perfect to pair with curries." },
      { id: 4, childId: "3-4", name: "Malai Kofta", price: 200, img: "https://tse1.mm.bing.net/th/id/OIP.uxz1bkgARi-fzT7qninxeAHaE8?pid=Api&P=0&h=180", description: "Fried paneer and potato dumplings served in a rich, creamy gravy." }, 
      { id: 5, childId: "3-5", name: "Palak Paneer", price: 250, img: "https://www.yummytummyaarthi.com/wp-content/uploads/2021/11/palak-paneer-1.jpg", description: "Paneer cubes cooked in smooth spinach gravy with Indian spices." },
      { id: 6, childId: "3-6", name: "Chole Bhature", price: 50, img: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Chole_Bhature_from_Nagpur.JPG", description: "Spiced chickpea curry served with deep-fried fluffy bread." },
      { id: 7, childId: "3-7", name: "Dahi Vada", price: 180, img: "https://www.cubesnjuliennes.com/wp-content/uploads/2020/06/Soft-Dahi-Vada-Recipe.jpg", description: "Soft lentil dumplings soaked in yogurt, topped with chutneys and spices." },
      { id: 8, childId: "3-8", name: "Avial", price: 150, img: "https://www.vegrecipesofindia.com/wp-content/uploads/2011/11/avial-recipe-11.jpg", description: "Kerala-style mixed vegetable curry cooked with coconut and yogurt." }
    ],
    4: [
      { id: 1, childId: "4-1", name: "Margherita Pizza", price: 250, img: "https://recipes.heart.org/-/media/AHA/Recipe/Recipe-Images/Classic-Margherita-Pizza-with-Whole-Wheat-Pizza-Crust.jpg?sc_lang=en&hash=8669621DF39E46A90612215CFACFE313", description: "Classic pizza topped with fresh mozzarella, basil, and tomato sauce." },
      { id: 2, childId: "4-2", name: "White Sauce Pasta", price: 200, img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2024/04/white-sauce-pasta.jpg", description: "Creamy pasta tossed in rich béchamel sauce with herbs." },
      { id: 3, childId: "4-3", name: "Cheesy Garlic Bread", price: 100, img: "https://feelgoodfoodie.net/wp-content/uploads/2023/03/Garlic-Cheese-Bread-08.jpg", description: "Toasted bread topped with garlic butter and melted cheese." },
      { id: 4, childId: "4-4", name: "Ragu alla Bolognese", price: 250, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCV8RnOzLgxTq1j4E6ohDjoDxXEe7yp20grA&s", description: "Traditional Italian meat sauce slow-cooked with tomatoes and herbs." },
      { id: 5, childId: "4-5", name: "Lasagna", price: 50, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu1FpZrLwZ6m54v_cOA4PMNifIwcfo7Qs2VQ&s", description: "Layered pasta with cheese, béchamel, and savory meat sauce." },
      { id: 6, childId: "4-6", name: "Cacio e Pepe", price: 180, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOGaE1_UpCQEByPqu3bjt33aPA7KEnEbRt_Q&s", description: "Roman pasta dish made with pecorino cheese and black pepper." },
      { id: 7, childId: "4-7", name: "Risotto alla Milanese", price: 250, img: "https://cookingitalians.com/wp-content/uploads/2024/11/Risotto-alla-Milanese.jpg", description: "Creamy risotto flavored with saffron and Parmesan cheese." },
      { id: 8, childId: "4-8", name: "Gnocchi", price: 150, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSESCaSZyfowShkt3h-MxRPzbuEATseHIosAg&s", description: "Soft potato dumplings served with choice of sauce." }
    ],
    5: [
      { id: 1, childId: "5-1", name: "Grilled Fish", price: 350, img: "https://static01.nyt.com/images/2021/08/18/dining/20Porgyrex1/12Porgyrex2-jumbo.jpg", description: "Fresh fish marinated with spices and grilled to perfection." },
      { id: 2, childId: "5-2", name: "Prawns Curry", price: 400, img: "https://glebekitchen.com/wp-content/uploads/2021/10/southindianprawncurrytopbowl.jpg", description: "Juicy prawns simmered in a spicy coconut-based curry." },
      { id: 3, childId: "5-3", name: "Crab Masala", price: 450, img: "https://www.indrani-will-teach.com/wp-content/uploads/2022/11/crab.jpg", description: "Delicious crab cooked with aromatic spices in thick masala gravy." },
      { id: 4, childId: "5-4", name: "Sushi and Sashimi", price: 350, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbksYzjT3MRWXxA0jUpzDNVVz3ACfWC8xNbQ&s", description: "Japanese delicacy of vinegared rice with raw fish and seafood slices." },
      { id: 5, childId: "5-5", name: "Lobster Rolls", price: 400, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKpyZOcn2_CmTEwRx7Z62VseW9W9ddk0M0Tg&s", description: "Fresh lobster meat tossed in mayo, served in a soft roll." },
      { id: 6, childId: "5-6", name: "Grilled Salmon", price: 450, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUD-8MZYYVW7oIqJ0dVHgznmWopJASmGJJkg&s", description: "Tender salmon fillet grilled with herbs and lemon." },
      { id: 7, childId: "5-7", name: "Cioppino", price: 350, img: "https://bertolli.com/wp-content/uploads/2017/07/CioppinoAllaArrabbiata-d.jpg", description: "Italian-American seafood stew with fish, shellfish, and tomato broth." },
      { id: 8, childId: "5-8", name: "Moqueca", price: 400, img: "https://static01.nyt.com/images/2016/03/16/dining/16MOQUECA/16MOQUECA-superJumbo.jpg", description: "Brazilian seafood stew made with coconut milk and spices." }
    ],
    6: [
      { id: 1, childId: "6-1", name: "Tandoori Chicken", price: 300, img: "https://www.easycookingwithmolly.com/wp-content/uploads/2023/11/air-fryer-whole-tandoori-chicken-3-480x480.jpg", description: "Chicken marinated in yogurt and spices, roasted in a clay oven." },
      { id: 2, childId: "6-2", name: "Chicken Biryani", price: 280, img: "https://www.licious.in/blog/wp-content/uploads/2022/06/chicken-hyderabadi-biryani-01.jpg", description: "Fragrant basmati rice cooked with marinated chicken and spices." },
      { id: 3, childId: "6-3", name: "BBQ Ribs", price: 500, img: "https://realhousemoms.com/wp-content/uploads/Grilled-Ribs-RECIPE-CARD.jpg", description: "Juicy pork ribs slow-cooked and glazed with smoky BBQ sauce." },
      { id: 4, childId: "6-4", name: "Grilled Fish", price: 350, img: "https://static01.nyt.com/images/2021/08/18/dining/20Porgyrex1/12Porgyrex2-jumbo.jpg", description: "Freshly grilled fish with lemon and seasoning." },
      { id: 5, childId: "6-5", name: "Tunde Kebab", price: 400, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxcYKEHQVHMs8AQrEl5X8jbBHJnIUqFphEFw&s", description: "Famous Lucknowi kebab, soft and melt-in-mouth minced meat." },
      { id: 6, childId: "6-6", name: "Lamb Vindaloo", price: 450, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShndk69Wa2GWFMDdM7m-4NG0PW5udUbtVwlQ&s", description: "Spicy Goan curry made with tender lamb and vinegar-based sauce." },
      { id: 7, childId: "6-7", name: "Butter Chicken", price: 350, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_sZZjpyR1dUFAMRo5b7BzEIaPWLaDk0UUdA&s", description: "Succulent chicken cooked in creamy tomato-based sauce." },
      { id: 8, childId: "6-8", name: "Mutton Keema", price: 400, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKgit9mwVqlhFCYyyG8CBIWTh6GciXNxN9kw&s", description: "Minced mutton slow-cooked with spices and herbs." }
    ]
   
  };

  // --- Close search bar on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Load menu for category by default
  useEffect(() => {
    setLoading(true);
    setMenu(menus[categoryId] || []);
    setLoading(false);
    window.scrollTo(0, 0);
  }, [categoryId]);

  // --- Handle Search (Gemini + fallback)
  useEffect(() => {
    if (!searchTerm.trim()) {
      setMenu(menus[categoryId] || []);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      // const dynamicMenus = await getGeminiSuggestion(searchTerm);

      // if (dynamicMenus.length > 0) {
      //   setMenu(dynamicMenus);
      // } else {
      //   // fallback to static filter
      //   const filtered = (menus[categoryId] || []).filter(
      //     (item) =>
      //       item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      //       item.description.toLowerCase().includes(searchTerm.toLowerCase())
      //   );
      //   setMenu(filtered);
      // }
       const filtered = (menus[categoryId] || []).filter(
          (item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setMenu(filtered);
      setLoading(false);
    }, 500); // debounce

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, categoryId]);

  const categoryNames = {
    1: "Fast Food",
    2: "Chinese Food",
    3: "Indian Food",
    4: "Italian Food",
    5: "Seafood",
    6: "Mughlai Food",
  };

  // --- Add to cart with animation
  const handleAddWithAnimation = (menuItem, e) => {
    const img = e.currentTarget.closest(".menu-card").querySelector("img");
    const cart = document.querySelector("#cart-icon");
    if (!img || !cart) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = cart.getBoundingClientRect();
    const imgX = imgRect.left + window.scrollX;
    const imgY = imgRect.top + window.scrollY;
    const cartCenterX = cartRect.left + window.scrollX + cartRect.width / 2;
    const cartCenterY = cartRect.top + window.scrollY + cartRect.height / 2;

    const clone = img.cloneNode(true);
    clone.style.position = "absolute";
    clone.style.left = `${imgX}px`;
    clone.style.top = `${imgY}px`;
    clone.style.width = `${imgRect.width}px`;
    clone.style.height = `${imgRect.height}px`;
    clone.style.borderRadius = "12px";
    clone.style.transition = "all .6s ease-in-out";
    clone.style.zIndex = 1000;
    document.body.appendChild(clone);

    requestAnimationFrame(() => {
      clone.style.left = cartCenterX - 15 + "px";
      clone.style.top = cartCenterY - 15 + "px";
      clone.style.width = "40px";
      clone.style.height = "40px";
      clone.style.opacity = "0.5";
      clone.style.borderRadius = "50%";
    });

    clone.addEventListener(
      "transitionend",
      () => {
        clone.remove();
        if (cartItems.length > 0 && !cartItems[0].childId.startsWith(`${categoryId}-`)) {
          dispatch(clearCart());
        }
        dispatch(storeWholeValue(menuItem));
      },
      { once: true }
    );
  };

  const handleRemoveWithAnimation = (menuItem, e) => {
    const menuCard = e.currentTarget.closest(".menu-card");
    const img = menuCard.querySelector("img");
    const cart = document.querySelector("#cart-icon");
    if (!img || !cart) return;

    const imgRect = img.getBoundingClientRect();
    const cartRect = cart.getBoundingClientRect();

    const imgX = imgRect.left + window.scrollX;
    const imgY = imgRect.top + window.scrollY;
    const cartCenterX = cartRect.left + window.scrollX + cartRect.width / 2;
    const cartCenterY = cartRect.top + window.scrollY + cartRect.height / 2;

    const clone = img.cloneNode(true);
    clone.style.position = "absolute";
    clone.style.left = cartCenterX - 15 + "px";
    clone.style.top = cartCenterY - 15 + "px";
    clone.style.width = "40px";
    clone.style.height = "40px";
    clone.style.borderRadius = "50%";
    clone.style.opacity = "0.5";
    clone.style.transition = "all 0.6s ease-in-out";
    clone.style.zIndex = 1000;
    document.body.appendChild(clone);

    requestAnimationFrame(() => {
      clone.style.left = imgX + "px";
      clone.style.top = imgY + "px";
      clone.style.width = imgRect.width + "px";
      clone.style.height = imgRect.height + "px";
      clone.style.borderRadius = "12px";
      clone.style.opacity = "1";
    });

    clone.addEventListener(
      "transitionend",
      () => {
        clone.remove();
        dispatch(removeItem(menuItem.childId));
      },
      { once: true }
    );
  };

  // Filtering logic (safeguarded)
  const validMenu = Array.isArray(menu) ? menu : [];
  let filteredMenus = validMenu.filter(
    (menuItem) =>
      menuItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      menuItem.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (priceFilter) {
    filteredMenus = filteredMenus.filter((item) => {
      if (priceFilter === "low") return item.price < 100;
      if (priceFilter === "medium") return item.price >= 100 && item.price <= 300;
      if (priceFilter === "high") return item.price > 300;
      return true;
    });
  }


  return (
    <div className="menu-background">
      <div className="cards-main">
        <div className="heading-dev">
          <h2 className="menu-title">{categoryNames[categoryId]} Items</h2>
          <br />
          <div className="search-wrapper" ref={searchRef}>
            {!searchOpen ? (
              <button
                className="search-icon-btn"
                onClick={() => setSearchOpen(true)}
              >
                <Search size={22} />
              </button>
            ) : (
              <input
                type="text"
                placeholder="Search Item..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="menu-search"
                autoFocus
              />
            )}
          </div>
          <div className="menu-filters">
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="filter-dropdown"
            >
              <option value="">Filter by Price</option>
              <option value="low">Low (&lt;100)</option>
              <option value="medium">Medium (100-300)</option>
              <option value="high">High (&gt;300)</option>
            </select>
          </div>
        </div>

        <div className="menu-Container">
          {loading ? (
            <p>Loading...</p>
          ) : filteredMenus.length > 0 ? (
            filteredMenus.map((menuItem, i) => {
              const existing = cartItems.find(
                (f) => f.childId === menuItem.childId
              );
              // console.log(menuItem);
              return (
                <div className="menu-card" key={`${menuItem.name}-${i}`}>
                  <img
                    src={menuItem.img}
                    alt={menuItem.name}
                    className="menu-image"
                  />
                  <div className="menu-info">
                    <h3 className="menu-name">{menuItem.name}</h3>
                    <p className="menu-price">₹{menuItem.price}</p>
                  </div>
                  <div className="menu-details">
                    <h3>{menuItem.name}</h3>
                    <p>{menuItem.description}</p>
                    <div className="menu-actions">
                      <button
                        className="add-btn"
                        onClick={(e) => handleAddWithAnimation(menuItem, e)}
                      >
                        +
                        {existing && (
                          <span className="item-qty-badge">
                            {existing.quantity}
                          </span>
                        )}
                      </button>
                      {existing && (
                        <button
                          className="remove-btn"
                          onClick={(e) =>
                            handleRemoveWithAnimation(menuItem, e)
                          }
                        >
                          –
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="filter-notice">
              <p className="no-items-message">No items found for your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

