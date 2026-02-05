import { Link } from "react-router-dom";
import "../pages/ProductList.css";
import { Truncate } from "../components/Truncate";


const ProductList = ({products}) => {

  return (
    <div className="product-list-container">
      <ul>
          {products.map(product=> <li key={product._id}>
            <Link to={`/admin-dashboard/products/${product._id}`}>
            <div>
              <div className="product-list-img">
              <img src={product.images} alt={product.title}  style={{width: "10rem"}}/>
              </div>
              <div>
                <h3>{product.title}</h3>
                <Truncate text={product.description} length={30}/>
              </div>
            </div>
            </Link>
          </li>)}
      </ul>
    </div>
  )
}

export default ProductList;

