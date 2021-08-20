import { useContext, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useParams } from "react-router-dom";
import LineIcon from "react-lineicons";

import { dataContext, navContext } from "../../context/context";
import Content from "./Content";

const ContentList = () => {
  const { items, loading } = useContext(dataContext);
  const { navData } = useContext(navContext);

  const [toggles, setToggles] = useState([]);

  const { subcat } = useParams();

  const handleClick = (e, i) => {
    let newToggles = [];

    items.contents.forEach((cont, ind) =>
      newToggles.push(i === ind ? !toggles[i] : false)
    );

    setToggles(newToggles);
  };

  useEffect(() => {
    let newToggles = [];

    items.contents.forEach((cont) => newToggles.push(false));

    setToggles(newToggles);
  }, [items.contents]);

  if (loading) {
    return <Loader />;
  }

  if (items.contents.length === 0) {
    return (
      <div style={{ marginTop: "140px", textAlign: "center" }}>
        <LineIcon
          name="files"
          style={{
            color: "#F8F7F9",
            fontSize: "5rem",
          }}
        />
        <h1
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "1.2rem",
            fontWeight: "400",
            color: "#F8F7F9",
            marginTop: "40px",
          }}
        >{`No contents available for ${subcat}`}</h1>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "calc(100% - 40px)",
        position: "absolute",
        left: "20px",
        top: `${navData.headerBgHeight - 65}px`,
        transition: "top 200ms ease-in-out",
        paddingBottom: "100px",
      }}
    >
      {items.contents.map((cont, i) => (
        <Content
          key={cont._id}
          cont={cont}
          i={i}
          handleClick={handleClick}
          toggle={toggles[i]}
        />
      ))}
    </div>
  );
};

const spinAnimation = keyframes`
    0%{-webkit-transform: rotate(0deg)}
    100%{-webkit-transform: rotate(360deg)}
`;

const Loader = styled.div`
  border: 2px solid #f8f7f9;
  margin: 200px auto 0;
  border-radius: 50%;
  border-top: 2px solid #f5cb5c;
  width: 80px;
  height: 80px;
  animation: ${spinAnimation} 2s linear infinite;
`;

export default ContentList;
