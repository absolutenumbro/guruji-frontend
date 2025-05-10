import React, { Fragment, useEffect } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";
import Testimonials from "../Testimonials/Testimonials";
import { FaStar } from "react-icons/fa";
import VisionMission from "../VisionMission/VisionMission";


const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const {
    products,
    loading,
    error,
  } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Products - Astro World" />
          
          <div className="products-banner">
          <h1>Our Products</h1> 
          <p>Get our latest Products</p>
          </div>

          <section className="products-intro">
            <h2>Our Products</h2>
            <div className="products-description">
              <p>
                Explore our carefully curated collection of astrological products designed to enhance your spiritual journey. 
                Each product is crafted with precision and infused with positive energy to help you achieve harmony and balance in life. 
                From powerful crystals to sacred yantras, our products are selected to support your spiritual growth and well-being.
              </p>
            </div>
            <div className="products-divider">
              {/* <FaStar className="star-icon" /> */}
            </div>
          </section>

          <section className="products-showcase">
            <div className="products-container">
              {products &&
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </section>

          <WhyChooseUs />
          <VisionMission />
          <Testimonials />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
