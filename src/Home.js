import React, { useEffect, useState } from "react";
import "./Home.css";
import Product from "./Product";
import FlipMove from "react-flip-move";
import { Database } from "@three0dev/js-sdk";
import { useStateValue } from "./StateProvider";
import { CircularProgress } from "@material-ui/core";

import { env } from "./env"

// https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_45M_v2_2x._CB432458382_.jpg
// https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg

function Home() {
  const [{ products }, dispatch] = useStateValue();
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [])

  const fetchProducts = async () => {
    setLoading(true);

    const docstore = await Database.DocStore(env.productsDB)

    let productsSnapshot = docstore.get();

    let items = productsSnapshot.map((product) => {
      let { title, price, rating, image } = product;
      return {
        id: product._id,
        title,
        image,
        price,
        rating
      }
    });
    dispatch({
      type: "SET_PRODUCTS",
      products: items
    });
    setLoading(false);
  }

  return (
    <div className="home">
      <img
        className="home__image"
        src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_45M_v2_2x._CB432458382_.jpg"
      />

      {loading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
          <p style={{ marginTop: "50px" }}>Fetching products from database</p>
        </div>
      ) : (
        <>
          <FlipMove
            appearAnimation="accordionVertical"
            enterAnimation="fade"
            leaveAnimation="fade"
            delay={200}
            staggerDelayBy={150}
          >
            <div className="home__row">
              {products.map(({ id, title, price, rating, image }) => {
                if (id !== "8e45b8a7-3044-4731-9a67-b0a2b14a6841") {
                  return (
                    <Product
                      key={id}
                      id={id}
                      title={title}
                      price={price}
                      rating={rating}
                      image={image}
                    />
                  );
                }
              })}
            </div>
          </FlipMove>

          <div className="home__rowlarge">
            <Product
              id="8e45b8a7-3044-4731-9a67-b0a2b14a6841"
              title="Samsung LC49HG90DMUXEN 48.9-inch Ultra Wide Curved Monitor (Black)"
              price={100000}
              rating={5}
              image="https://images-na.ssl-images-amazon.com/images/I/81vlA84pg6L._SX679_.jpg"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
