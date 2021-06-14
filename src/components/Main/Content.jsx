import { useRef, useEffect, useState } from 'react'
import LineIcon from 'react-lineicons'
import styled from 'styled-components'

import musicFile from '../../assets/music.mp3'
import videoFile from '../../assets/video.mp4'

const Content = ({ cont, i, handleClick, toggle }) => {
    const refContent = useRef(null)
    const [height, setHeight] = useState(0)

    useEffect(() => {
        setHeight(toggle ? refContent.current.clientHeight + 40 : 153)
    }, [toggle])

    return (
        <div style={{
            borderRadius: "10px",
            background: "linear-gradient(117.73deg, #213758 6.93%, #12233C 96.14%)",
            boxShadow: "-5px -3px 5px rgba(0, 0, 0, 0.15)",
            marginBottom: "20px",
            padding: "20px",
            height: `${height}px`,
            overflowY: "hidden",
            transition: "height 200ms ease-in-out"
        }}>
            <div ref={refContent}>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    gap: "20px",
                    paddingBottom: "15px"
                }}>

                    <div style={{
                        width: "80px",
                        height: "80px"
                    }}>
                        <img src={cont.thumbnail} alt={cont.name} style={{
                            objectFit: "cover",
                            width: "inherit",
                            height: "inherit",
                            borderRadius: "25px"
                        }} />
                    </div>

                    <div style={{ 
                        alignSelf: "end",
                        overflowX: "hidden",
                    }}>
                        <p style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: "300",
                            fontSize: ".9rem",
                            color: "#F8F7F9",
                            paddingBottom: "13px",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            overflowX: "hidden"
                        }}>{cont.name}</p>

                        <div style={{
                            padding: "5px 15px",
                            display: "inline-block",
                            border: "1px solid #06D6A0",
                            borderRadius: "50px",
                            cursor: "pointer"
                        }}>
                            <LineIcon name="cloud-download" style={{
                                fontSize: "1.2rem",
                                color: "#06D6A0"
                            }} />
                            <span style={{
                                fontFamily: "'Montserrat', sans-serif",
                                fontWeight: "400",
                                fontSize: ".85rem",
                                color: "#06D6A0",
                                marginLeft: "7px"
                            }}>Download</span>
                        </div>
                    </div>
                </div>

                <div style={{
                    display: "flex",
                    flexDirection: "row-reverse"
                }}>
                    <div onClick={(e) => handleClick(e, i)} style={{
                        display: "inline-block",
                        cursor: "pointer",
                        color: "#F5CB5C"
                    }}>
                        <span style={{
                            fontFamily: "'Montserrat', sans-serif",
                            fontWeight: "300",
                            fontSize: ".75rem",
                        }}>{`Show ${toggle ? "Less" : "More"}`}</span>
                        <LineIcon name="chevron-down" style={{ 
                            color: "#F5CB5C",
                            fontSize: ".8rem",
                            marginLeft: "6px",
                            transform: `${toggle ? "rotate(-180deg)" : "rotate(0deg)"}`,
                            transition: "transform 100ms ease-in-out"
                        }} />
                    </div>
                </div>

                <div style={{ paddingTop: "20px" }}>
                    {
                        cont.filename === "mp3" &&
                            <audio controls controlsList="nodownload" style={{
                                width: "100%",
                                background: "#f2f2f2",
                                borderRadius: "5px",
                                marginBottom: "15px"
                            }}>
                                <source src={musicFile} type="audio/mpeg" />
                            </audio>
                    }

{
                        cont.filename === "mp4" &&
                            <video controls controlsList="nodownload" disablePictureInPicture  style={{
                                width: "100%",
                                background: "#f2f2f2",
                                borderRadius: "5px",
                                marginBottom: "15px"
                            }}>
                                <source src={videoFile} type="video/mp4" />
                            </video>
                    }

                    <p style={{
                        color: "#F8F7F9",
                        fontFamily: "'Montserrat', sans-serif",
                        fontWeight: "400",
                        fontSize: ".75rem",
                        lineHeight: "1.8"
                    }}>{ cont.description }</p>

                    {
                        cont.screenshots.length > 0 &&
                            <ScreenContainer>
                                {
                                    cont.screenshots.map((screen, ind) => (<img key={ind} src={screen} alt={`${cont.name}_screenshot_${ind + 1}`} />))
                                }
                            </ScreenContainer>
                    }
                </div>
            </div>
        </div>
    )
}

const ScreenContainer = styled.div`
    overflow-x: scroll;
    white-space: nowrap;
    padding: 15px 0px 10px;
    scrollbar-width: thin;
    scrollbar-color: #F5CB5C #F8F7F9;

    &::-webkit-scrollbar{
        border-radius: 50px;
        height: 8px;
    }

    &::-webkit-scrollbar-track{
        background: none;
        border-radius: 50px;
        border: 1px solid #F5CB5C;
    }

    &::-webkit-scrollbar-thumb{
        background-color: #F5CB5C;
        border-radius: 50px;
    }

    img{
        margin-right: 10px;

        &:last-child{
            margin-right: 0px;
        }
    }
`

export default Content
