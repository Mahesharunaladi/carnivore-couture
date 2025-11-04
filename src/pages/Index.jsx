import React from 'react';

function Index() {
  return (
    <>
      <style>{`
        /* RESET & BASE */
        * { margin:0; padding:0; box-sizing:border-box; }
        body {
          background: #0f0f0f;
          color: #fff;
          font-family: 'Montserrat', sans-serif;
          line-height: 1.6;
          overflow-x: hidden;
        }

        /* HEADER */
        header {
          padding: 1rem 5%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 1000;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(10px);
        }
        .logo { font-family: 'Playfair Display', serif; font-size: 1.8rem; font-weight: 700; }
        .cart { font-size: 1.5rem; cursor: pointer; }

        /* HERO */
        .hero {
          height: 100vh;
          background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url('/hero-meat (1).jpg') center/cover no-repeat;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 0 5%;
        }
        .hero h1 {
          font-family: 'Playfair Display', serif;
          font-size: 4.5rem;
          margin-bottom: 1rem;
          letter-spacing: 2px;
        }
        .hero p {
          font-size: 1.3rem;
          margin-bottom: 2rem;
          max-width: 700px;
        }
        .btn {
          background: #e63946;
          color: white;
          padding: 1rem 2.5rem;
          border: none;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
          transition: 0.3s;
        }
        .btn:hover { background: #d00000; transform: scale(1.05); }

        /* SECTION TITLE */
        .section-title {
          text-align: center;
          padding: 4rem 5% 2rem;
        }
        .section-title h2 {
          font-family: 'Playfair Display', serif;
          font-size: 3rem;
          margin-bottom: 0.5rem;
        }
        .section-title p {
          color: #aaa;
          font-size: 1.1rem;
        }

        /* PRODUCTS GRID */
        .products {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          padding: 0 5% 4rem;
        }
        .product-card {
          background: #1a1a1a;
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.3s;
          position: relative;
        }
        .product-card:hover { transform: translateY(-10px); }
        .product-card img {
          width: 100%;
          height: 220px;
          object-fit: cover;
        }
        .badge {
          position: absolute;
          top: 15px;
          left: 15px;
          background: linear-gradient(135deg, #ff6b6b, #feca57);
          color: white;
          padding: 0.4rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
        }
        .product-info {
          padding: 1.5rem;
        }
        .product-info h3 {
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
        }
        .price {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .price .current {
          font-size: 1.5rem;
          font-weight: 700;
          color: #e63946;
        }
        .price .old {
          font-size: 1.1rem;
          color: #666;
          text-decoration: line-through;
        }
        .add-to-cart {
          background: #e63946;
          color: white;
          border: none;
          width: 100%;
          padding: 0.8rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: 0.3s;
        }
        .add-to-cart:hover { background: #d00000; }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .hero h1 { font-size: 3rem; }
          .hero p { font-size: 1.1rem; }
          .section-title h2 { font-size: 2.2rem; }
        }
      `}</style>
      <header>
        <div className="logo">Carnivore Couture</div>
        <div className="cart">Cart</div>
      </header>

      <section className="hero">
        <h1>CarnivoreCouture</h1>
        <p>Premium meat delivery service with exciting offers just for you!</p>
        <button className="btn">Shop Now</button>
      </section>

      <div className="section-title">
        <h2>FEATURED PRODUCTS</h2>
        <p>Our most popular premium selections</p>
      </div>

      <div className="products">
        <div className="product-card">
          <img src="https://images.unsplash.com/photo-1606890658317-7d14490b76fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Chicken Breast" />
          <div className="badge">PREMIUM</div>
          <div className="product-info">
            <h3>PREMIUM CHICKEN BREAST</h3>
            <div className="price">
              <span className="current">₹3,750</span>
              <span className="old">₹5,200</span>
            </div>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        </div>

        <div className="product-card">
          <img src="https://images.unsplash.com/photo-1625937288805-2d59eaccd7a4?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Chicken Wings" />
          <div className="badge">BESTSELLER</div>
          <div className="product-info">
            <h3>CHICKEN WINGS</h3>
            <div className="price">
              <span className="current">₹2,800</span>
              <span className="old">₹3,500</span>
            </div>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        </div>

        <div className="product-card">
          <img src="/steak.jpg" alt="Steak Slices" />
          <div className="badge">PREMIUM</div>
          <div className="product-info">
            <h3>PREMIUM STEAK</h3>
            <div className="price">
              <span className="current">₹3,750</span>
              <span className="old">₹5,200</span>
            </div>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        </div>

        <div className="product-card">
          <img src="/chicken-breast.jpg" alt="Chicken Breast" />
          <div className="badge">BESTSELLER</div>
          <div className="product-info">
            <h3>CHICKEN BREAST</h3>
            <div className="price">
              <span className="current">₹2,800</span>
              <span className="old">₹3,500</span>
            </div>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        </div>

        <div className="product-card">
          <img src="/product-chicken.jpg" alt="Chicken Breast" />
          <div className="badge">PREMIUM</div>
          <div className="product-info">
            <h3>PREMIUM CHICKEN BREAST</h3>
            <div className="price">
              <span className="current">₹3,750</span>
              <span className="old">₹5,200</span>
            </div>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        </div>

        <div className="product-card">
          <img src="/product-wings.jpg" alt="Chicken Wings" />
          <div className="badge">BESTSELLER</div>
          <div className="product-info">
            <h3>CHICKEN WINGS</h3>
            <div className="price">
              <span className="current">₹2,800</span>
              <span className="old">₹3,500</span>
            </div>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        </div>

        <div className="product-card">
          <img src="/product-mutton.jpg" alt="Mutton" />
          <div className="badge">PREMIUM</div>
          <div className="product-info">
            <h3>PREMIUM MUTTON</h3>
            <div className="price">
              <span className="current">₹3,750</span>
              <span className="old">₹5,200</span>
            </div>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        </div>

        <div className="product-card">
          <img src="/product-thighs.jpg" alt="Chicken Thighs" />
          <div className="badge">BESTSELLER</div>
          <div className="product-info">
            <h3>CHICKEN THIGHS</h3>
            <div className="price">
              <span className="current">₹2,800</span>
              <span className="old">₹3,500</span>
            </div>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        </div>

        <div className="product-card">
          <img src="https://images.unsplash.com/photo-1626645735805-50e12c8af7d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Whole Chicken" />
          <div className="product-info">
            <h3>WHOLE CHICKEN</h3>
            <div className="price">
              <span className="current">₹4,500</span>
            </div>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;