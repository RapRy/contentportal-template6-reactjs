import Menu from './Menu'

const Header = () => {
    return (
        <div style={{ padding: "20px 30px" }}>
            <h1 style={{ 
                textAlign: "center",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#F8F7F9"
            }}>POWERLAND</h1>
            <Menu />
        </div>
    )
}


export default Header
