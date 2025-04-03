import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';



export default function ItemsAll() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8081/items`)
        .then(res => res.json())
        .then(data => setItems(data))
    }, [])


    return (
        <>
        <div className='all-items' >
        <div className='all-items-title' >All Items</div>
        <div className='all-items-header'>
            <div>Name</div>
            <div>Description</div>
            <div>Quantity</div>
        </div>
        {items.map((item) => {
            let shortDescription = '';
            if(item.description.length > 100){
                shortDescription = item.description.slice(0, 100) + '...';
            }
            else{
                shortDescription = item.description;
            }
            return (
                <div key={item.id} className='item-container' >
                    <Link to={`/itemdetails/${item.id}`} className='item-name'>
                        <div className='item-name' >{item.itemName} </div>
                    </Link>
                    <div className='item-desc'>{shortDescription}</div>
                    <div className='item-quant'>{item.quantity}</div>    
                </div>
            )
        })}
        </div>
        </>
    )
}