import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Nav from "./Nav";
import Button from "react-bootstrap/Button";

import { useAuth } from "./Auth";

export default function MyInventory() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser?.id) {
      fetch(`http://localhost:8081/items/byuser/${currentUser.id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("could not fetch items");
          }
          return res.json();
        })
        .then((data) => setItems(data));
    }
  }, [currentUser?.id]);

  return (
    <>
      <Nav />

      <div className="all-items">
        <div className="all-items-title">My Items</div>
        <div className="all-items-header">
          <div>Name</div>
          <div>Description</div>
          <div>Quantity</div>
        </div>
        {items && items.length > 0 ? (
          items.map((item) => {
            let shortDescription = "";
            if (item.description.length > 100) {
              shortDescription = item.description.slice(0, 100) + "...";
            } else {
              shortDescription = item.description;
            }
            return (
              <div key={item.id} className="item-container">
                <Link to={`/itemdetails/${item.id}`} className="item-name">
                  <div className="item-name">{item.itemName} </div>
                </Link>
                <div className="item-desc">{shortDescription}</div>
                <div className="item-quant">{item.quantity}</div>
              </div>
            );
          })
        ) : (
          <div className="no-items">Hmm... You don't seem to have any items yet </div>
        )}
      </div>
      <Link to="/addItem">
        <Button variant="outline-light">Add Item</Button>
      </Link>
    </>
  );
}
