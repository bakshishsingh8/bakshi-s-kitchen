import '../style/cards.css';
import {Link} from 'react-router-dom';
// import Fast-food from 'https://thumbs.dreamstime.com/b/low-angle-photo-fast-food-items-delicious-inviting-photography-374125010.jpg';
export default function Cards() {
  return (
    <div className="cards-main">

      <div className="cards-container">
        <div className="card-text">
          <img
            src="https://thumbs.dreamstime.com/b/low-angle-photo-fast-food-items-delicious-inviting-photography-374125010.jpg"
            alt="Fast Food" />
          <h2>Fast Food</h2>
          <button className='button'><Link to="/FF">About</Link></button>

        </div>
        <div className="card-text">
          <img
            src="https://hips.hearstapps.com/hmg-prod/images/chinese-food-68602c98ca7ab.jpg?crop=0.689xw:1.00xh;0.265xw,0&resize=640:*" />
          <h2>Chinese Food</h2>
          <button className='button'>Click for Menu</button>
        </div>

        <div className="card-text">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIxuDVSOHhkXWd-reUJpUbXg7fK1dN_MD7Zg&s" alt="indian ffood" />
          <h2>Indian veg-Food</h2>
          <button className='button'>Click for Menu</button>
        </div>

        <div className="card-text">
          <img src="https://c.ndtvimg.com/2021-04/umk8i7ko_pasta_625x300_01_April_21.jpg?im=FaceCrop,algorithm=dnn,width=1200,height=886" />
          <h2>Italian Food</h2>
          <button className='button'>Click for Menu</button>

        </div>
        <div className="card-text">
          <img src="https://images.slurrp.com/prod/recipe_images/taste/grilled-seafood-platter-1619715184_ZLYZFRY8F9LEP4AVZARH.webp" />
          <h2>Sea Food</h2>
          <button className='button'>Click for Menu</button>

        </div>
        <div className="card-text">
          <img src='https://blog.swiggy.com/wp-content/uploads/2024/10/Image1_-Tandoori-Chicken-1-1024x538.jpg' />
          <h2>non-veg Food</h2>
          <button className='button'>Click for Menu</button>

        </div>

        <div className="card-text">
          <img
            src="https://hips.hearstapps.com/hmg-prod/images/chinese-food-68602c98ca7ab.jpg?crop=0.689xw:1.00xh;0.265xw,0&resize=640:*"
            alt="Chinese Food"
            className="card-image"
          />
          <h2 className="card-title">Chinese Food</h2>
          <p className="card-description">
            Savor the authentic flavors of China with our wide variety of noodles, dumplings, and sizzling stir-fries.
          </p>
          <ul className="card-features">
            <li>🍜 Fresh Ingredients</li>
            <li>🥢 Authentic Taste</li>
            <li>🔥 Spicy & Mild Options</li>
          </ul>
          <button className="button">View Full Menu</button>
        </div>

      </div>
    </div>
  );
}