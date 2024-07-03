import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../utils/api.js";
import { listPricingTypes } from "../utils/api";

function CreateOrder() {
  let initialState = {
    pricing_scheme: "",
    rate: "",
  };

  const [newOrder, setNewOrder] = useState(initialState);
  const navigate = useNavigate();
  const [pricingSchemes, setPricingSchemes] = useState([]);

  async function submitHandler(evt) {
    evt.preventDefault();
    try {
      await createOrder(newOrder);
      // navigate to home page where orders are listed
      navigate("/orders");
    } catch (error) {
      console.error("Error creating order:", error);
    }
  }

  function changeHandler(evt) {
    const { name, value } = evt.target;
    setNewOrder({ ...newOrder, [name]: value });
  }

  useEffect(() => {
    const fetchPricingSchemes = async () => {
      try {
        const response = await fetch(listPricingTypes);
        if (!response.ok) {
          throw new Error("Failed to fetch pricing schemes");
        }
        const data = await response.json();
        setPricingSchemes(data);
      } catch (error) {
        console.error("Error fetching pricing schemese:", error);
      }
    };
    fetchPricingSchemes();
  }, []);

  return (
    <div>
      <h1>Create Order</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="pricing_scheme">Pricing Scheme</label>
          <select
            id="pricing_scheme"
            name="pricing_scheme"
            value={newOrder.pricing_scheme}
            onChange={changeHandler}
          >
            <option value="">Select a pricing scheme</option>
            <option value="Variable-based">Variable-based</option>
            <option value="Fixed Pricing">Fixed Pricing</option>
            {/* <option value="">Select Pricing Scheme</option>
            {pricingSchemes.map((scheme) => (
              <option key={scheme.value} value={scheme.value}>
                {scheme.label}
              </option> */}
          </select>
        </div>
        <div>
          <label htmlFor="rate">Rate:</label>
          <input
            type="number"
            id="rate"
            name="rate"
            value={newOrder.rate}
            onChange={changeHandler}
          />
        </div>
      </form>
    </div>
  );
}
export default CreateOrder;
