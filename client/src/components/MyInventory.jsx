import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Nav from "./Nav";
import Button from "react-bootstrap/Button";

import { useAuth } from "./Auth";

export default function MyInventory() {
  const [items, setItems] = useState([]);
  const { user } = useAuth();

  // will need to get user id and pull items from there
  console.log;

  useEffect(() => {
    if (user?.id) {
      fetch(`http://localhost:8081/items/byuser/${user.id}`)
        .then((res) => res.json())
        .then((data) => setItems(data));
    }
  }, [user?.id]);

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
          <div className="no-items">No items yet </div>
        )}
      </div>
      <Link to="/addItem">
        <Button variant="outline-light">AddItem</Button>
      </Link>
    </>
  );
}
