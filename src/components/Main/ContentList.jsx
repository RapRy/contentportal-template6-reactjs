import { useContext, useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

import { dataContext, navContext } from '../../context/context'
import Content from './Content'

const ContentList = () => {
    const { items, loading } = useContext(dataContext)
    const { navData } = useContext(navContext)

    const [toggles, setToggles] = useState([])

    const handleClick = (e, i) => {
        let newToggles = []

        items.contents.forEach((cont, ind) => newToggles.push(i === ind ? !toggles[i] : false))

        setToggles(newToggles)
    }

    useEffect(() => {
        let newToggles = []

        items.contents.forEach((cont) => newToggles.push(false))

        setToggles(newToggles)

    }, [items.contents])

    if(loading){
        return (<Loader />)
    }

    return (
        <div style={{
            width: "calc(100% - 40px)",
            position: 'absolute',
            left: "20px",
            top: `${navData.headerBgHeight - 65}px`,
            transition: "top 200ms ease-in-out",
            paddingBottom: "100px"
        }}>
           {
               items.contents.map((cont, i) => (
                    <Content key={cont._id} cont={cont} i={i} handleClick={handleClick} toggle={toggles[i]} />
               ))
           } 
        </div>
    )
}

const spinAnimation = keyframes`
    0%{-webkit-transform: rotate(0deg)}
    100%{-webkit-transform: rotate(360deg)}
`

const Loader = styled.div`
    border: 2px solid #F8F7F9;
    margin: 200px auto 0;
    border-radius: 50%;
    border-top: 2px solid #F5CB5C;
    width: 80px;
    height: 80px;
    animation: ${spinAnimation} 2s linear infinite;
`

export default ContentList
