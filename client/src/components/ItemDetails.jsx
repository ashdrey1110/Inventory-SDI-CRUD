import { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom';
import './style.css'

export default function ItemDetails() {
    const { id } = useParams();
    const [item, setItem] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8081/items/${id}`)
        .then(res => res.json())
        .then(data => setItem(data[0]))
    }, [id])

    return (
        <>
        <div className='item-details' >
            <div className='item-details-title' >Item Details</div>
            <div className='item-details-header'>
                <div className='item-name'>Name</div>
                <div className='item-desc'>Description</div>
                <div className='item-quant'>Quantity</div>
            </div>
            <div className='item-container'>
                <div className='item-name'>{item.itemName} </div>
                <div className='item-desc'>{item.description}</div>
                <div className='item-quant'>{item.quantity}</div>
            </div>
        </div>
        </>
    )
}