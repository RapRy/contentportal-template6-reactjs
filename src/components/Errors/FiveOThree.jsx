import { Link } from 'react-router-dom'
import LineIcon from 'react-lineicons'

const FiveOThree = () => {
    return (
        <div style={{
            position: 'relative',
            zIndex: "5",
            width: "100%",
            height: "100vh",
            background: "#12233C",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center"
        }}>
            <h1 style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "3.5rem",
                fontWeight: "700",
                color: "#F5CB5C",
                paddingBottom: "20px"
            }}>Internal Server Error</h1>
            <p style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "1rem",
                fontWeight: "400",
                color: "#F8F7F9",
                paddingBottom: "50px"
            }}>Sorry, we had some technical problems during your last operation.</p>
            <Link to="/" style={{
                textDecoration: 'none',
                padding: "10px 15px",
                display: "inline-block",
                border: "1px solid #F5CB5C",
                borderRadius: "50px",
                cursor: "pointer",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: ".9rem",
                fontWeight: "300",
                color: "#F5CB5C",
            }}><LineIcon name="spinner-arrow" style={{ marginRight: "10px", fontSize: "1rem" }} />Refresh Site</Link>
        </div>
    )
}

export default FiveOThree
