import { useContext, useEffect, useRef } from 'react'
import LineIcon from 'react-lineicons'
import { useSpring, animated } from 'react-spring'
import { NavLink, useRouteMatch, useHistory } from 'react-router-dom'

import { fetchCategories } from '../../api'
import { dataContext, navContext } from '../../context/context'

const icons = {
    Games: 'game',
    Apps: 'archive',
    Music: 'music',
    Videos: 'video'
}

const Footer = () => {
    const navRef = useRef(null)

    const { items, setData } = useContext(dataContext)
    const { setNavData } = useContext(navContext)

    const [styles, api] = useSpring(() => ({ x: 0 }))

    const match = useRouteMatch('/:cat/:subcat')
    const history = useHistory()

    const useEffDepen = match !== null ? match.params.cat : ""

    useEffect(() => {
        if(match?.params.cat !== items.activeCat.catName && match !== null){

            let ind;

            items.categories.forEach((cat, i) => {
                if(match.params.cat === cat.catName)
                    ind = i
            })

            setNavData({ headerBgHeight: 199, open: false })

            try {
                const fetchData = async () => {

                    const width = navRef.current.children[ind].firstElementChild.clientWidth !== 0 ? navRef.current.children[ind].firstElementChild.clientWidth : 125

                    api.start({ x: width * ind })
                    
                    const { data, status } = await fetchCategories(match.params.cat)
        
                    if(status === 200){
                        setData(data) 
                    }else if(status === 404 || status === 502){
                        history.push('/502')
                    }
                } 
        
                fetchData()
            } catch (error) {
                console.log(error)
            }
        }
    }, [useEffDepen])

    return (
        <div style={{
            position: "absolute",
            right: "50%",
            bottom: "0px",
            transform: "translateX(50%)",
            width: "100%",
            paddingTop: "20px"
        }}>
            <nav ref={navRef} style={{
                backgroundColor: "#213758",
                borderRadius: "25px 25px 0px 0px",
                width: "100%",
                boxShadow: "0 -15px 20px rgba(18, 35, 60, .8)",
                position: "relative"
            }}>
                {
                    items.categories.map((cat, i) => (
                        <NavLink key={cat._id} to={`/${cat.catName}/${cat.subCategories[0].subCatName}`}>
                            <div style={{
                                textAlign: 'center',
                                position: 'relative',
                                display: 'inline-block',
                                width: `calc(100% / ${items.categories.length})`,
                                padding: '20px 0 25px',
                                cursor: 'pointer',
                                zIndex: '1'
                            }}>
                                <LineIcon name={icons[cat.catName]} style={{
                                    fontSize: '2.5rem',
                                    color: '#F8F7F9',

                                }} />
                            </div>
                        </NavLink>
                    ))
                }
                <animated.div style={{
                    display: 'block',
                    width: `calc(100% / ${items.categories.length})`,
                    minHeight: '85px',
                    background: 'linear-gradient(180deg, #D84727 0%, #9C2A11 100%)',
                    borderRadius: "25px 25px 0px 0px",
                    position: 'absolute',
                    top: '0px',
                    left: '0px',
                    zIndex: '0',
                    ...styles
                }}></animated.div>
            </nav>
        </div>
    )
}

export default Footer
