import  { useState } from 'react';

const AdvancedSearch = ({ data }) => {
  const [filters, setFilters] = useState({
    category: '',
    quantity: '',
    price: '',
    origin: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const filterData = (item) => {
    const { category, quantity, price, origin } = filters;
    return (
      (!category || item.category.includes(category)) &&
      (!quantity || item.quantity >= quantity) &&
      (!price || item.price <= price) &&
      (!origin || item.origin.includes(origin))
    );
  };

  const filteredData = data.filter(filterData);

  return (
    <div>
      <h2>Advanced Search</h2>
      <div>
        <label>
          Category:
          <input name="category" value={filters.category} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Quantity:
          <input name="quantity" type="number" value={filters.quantity} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Price:
          <input name="price" type="number" value={filters.price} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Origin:
          <input name="origin" value={filters.origin} onChange={handleChange} />
        </label>
      </div>
      <h3>Results</h3>
      <ul>
        {filteredData.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdvancedSearch;
