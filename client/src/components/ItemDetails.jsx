import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import Nav from "./Nav";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import { useAuth } from "./Auth";

export default function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState([]);
  const { currentUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8081/fullitems/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(data[0]));
  }, [id]);

  useEffect(() => {
    if (item && editMode) {
      setItemName(item.itemName || "");
      setDescription(item.description || "");
      setQuantity(item.quantity || "");
    }
  }, [editMode, item]);

  const handleSubmit = (e) => {
    e.preventDefault();
    inputHandler();
  };

  let inputHandler = async () => {
    try {
      if (currentUser?.id) {
        const itemData = {
          userId: currentUser.id,
          itemName: itemName.trim(),
          description: description.trim(),
          quantity: parseInt(quantity),
        };

        const response = await fetch(`http://localhost:8081/items/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemData),
        });

        if (!response.ok) {
          throw new Error("Failed to edit item");
        }

        setItemName("");
        setDescription("");
        setQuantity("");
        setEditMode(false);
        navigate(`/myinventory`);
      } else {
        console.log(`that didnt work`);
      }
    } catch (error) {
      console.error("Failed to edit item", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8081/items/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete.");
      }

      navigate("/myinventory");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <>
      <Nav />
      <div className="item-details">
        <div className="item-details-title">Item Details</div>
        <div className="item-details-subtitle">
          Owner: {`${item.firstName} ${item.lastName}`}
        </div>
        <div className="item-details-header">
          <div className="item-name-details">Name</div>
          <div className="item-desc">Description</div>
          <div className="item-quant">Quantity</div>
        </div>
        {currentUser && editMode ? (
          <Form onSubmit={handleSubmit} className="item-container">
            <div className="item-name">
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder={item.itemName}
                  name="itemName"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="item-desc">
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder={item.description}
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="item-quant">
              <Form.Group className="mb-3">
                <Form.Control
                  type="number"
                  placeholder={item.quantity}
                  name="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="submit-edit-btn">
              <Button variant="secondary" type="submit">
                Submit Changes
              </Button>
            </div>
          </Form>
        ) : (
          <>
            <div className="item-container">
              <div className="item-name">{item.itemName} </div>
              <div className="item-desc">{item.description}</div>
              <div className="item-quant">{item.quantity}</div>
            </div>
          </>
        )}
        {currentUser ? (
          <>
            <ToggleButton
              className="mb-2"
              id="toggle-check"
              type="checkbox"
              variant="outline-primary"
              checked={editMode}
              value="1"
              onChange={(e) => setEditMode(e.currentTarget.checked)}
            >
              Edit Mode
            </ToggleButton>
            <Button variant="danger" onClick={handleDelete}>
              DELETE ITEM
            </Button>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
