import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import ItemsAll from "./ItemsAll";
import Nav from "./Nav";



export default function Home() {

    return (
        <>
        <Nav />
        <ItemsAll />
        </>
    )
}