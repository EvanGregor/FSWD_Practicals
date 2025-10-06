import React from 'react'
import data from '../Data.json'; 
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleSubmit = (index) => {
    const product = data[index]
    const productName = product.title
    alert(productName + ' has been added to the cart')
    if (window.confirm("Are you sure you want to purchase it?")) {
      navigate('/mycart', { state: { product } });
    }
  };

  return (
    <div className = "container text-center">
      <div className="row">
        {data.map((item, index) => (
          <div className = 'col-12 col-sm-6 col-md-4 col-lg-3 text-center mb-4' key={index}>
            <img src={item.url} alt={item.title} style={{ width: '240px' }} />
            <p>
              <strong>{item.title}</strong>
              <br />₹{item.price}
            </p>
            <input 
              type='button'
              value='Add to Cart'
              className='btn btn-primary'
              onClick={() => handleSubmit(index)}
            />
          </div>
        ))}
      </div>
    </div>
  )   
}

export default Home