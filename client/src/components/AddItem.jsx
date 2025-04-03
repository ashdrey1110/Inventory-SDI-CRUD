import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useAuth } from "./Auth";
import Nav from "./Nav";

export default function AddItem() {
  const { user } = useAuth();
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(null);

  let inputHandler = async () => {
    try {
      const itemData = {
        userId: user.id,
        itemName: itemName.trim(),
        description: description.trim(),
        quantity: quantity,
      };

      const response = await fetch("http://localhost:8081/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(itemData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit item");
      }

      setItemName("");
      setDescription("");
      setQuantity(null);
      navigate("/myinventory");
    } catch (error) {
      console.error("Error submitting item:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    inputHandler;
  };

  return (
    <>
      <Nav />
      <div className="add-item-container">
        <div className="add-item-title">Add New Item</div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formReview">
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              as="text"
              placeholder="Insert Item Name"
              name="itemName"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formReview">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="text"
              placeholder="Insert Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formReview">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              as="number"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </Form.Group>
        </Form>
      </div>
    </>
  );
}
