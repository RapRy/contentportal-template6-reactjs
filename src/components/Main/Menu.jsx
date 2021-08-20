import { useContext, useRef, useEffect } from "react";
import LineIcon from "react-lineicons";
import styled from "styled-components";
import { useTransition, animated, config } from "react-spring";
import { useParams, NavLink, useHistory } from "react-router-dom";

import { dataContext, navContext } from "../../context/context";
import { fetchContentsSubcat } from "../../api";

const Menu = () => {
  const { items, setData, setLoading } = useContext(dataContext);
  const { navData, setNavData } = useContext(navContext);
  const menuRef = useRef(null);

  const { subcat, cat } = useParams();
  const history = useHistory();

  const dropDown = useTransition(navData.open, {
    from: { opacity: 0, transform: "scaleY(0)", transformOrigin: "top left" },
    to: { opacity: 1, transform: "scaleY(1)", transformOrigin: "top left" },
    enter: { opacity: 1, transform: "scaleY(1)", transformOrigin: "top left" },
    leave: { opacity: 0, transform: "scaleY(0)", transformOrigin: "top left" },
    onStart: () =>
      setNavData({
        ...navData,
        headerBgHeight:
          navData.open === true
            ? navData.headerBgHeight + menuRef.current.clientHeight + 20
            : 199,
      }),
    config: config.stiff,
  });

  useEffect(() => {
    setLoading(true);

    try {
      const fetchData = async () => {
        const { data, status } = await fetchContentsSubcat(cat, subcat);

        if (status === 200) {
          setData({ ...items, contents: data.data });
          setLoading(false);
          if (navData.headerBgHeight > 199)
            setNavData({
              ...navData,
              headerBgHeight: 199,
              open: !navData.open,
            });
        } else if (status === 404 || status === 502) {
          history.push("/502");
        }
      };

      fetchData();
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subcat]);

  return (
    <div>
      <div
        onClick={() => setNavData({ ...navData, open: !navData.open })}
        style={{
          margin: "20px 0px 10px",
          padding: "10px 20px",
          border: "1px solid #12233c",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: ".9rem",
            fontWeight: "400",
            color: "#12233C",
          }}
        >
          {items.activeSubcat.subCatName !== subcat
            ? subcat
            : items.activeSubcat.subCatName}
        </span>
        <LineIcon
          name="chevron-down"
          style={{
            color: "#12233C",
            float: "right",
            marginTop: "1px",
            transform: `${navData.open ? "rotate(-180deg)" : "rotate(0deg)"}`,
            transition: "transform 100ms ease-in-out",
          }}
        />
      </div>

      {dropDown(
        (styles, item) =>
          item && (
            <animated.div
              style={{
                padding: "10px 20px",
                border: "1px solid #12233c",
                borderRadius: "5px",
                overflowY: "hidden",
                ...styles,
              }}
            >
              <ul ref={menuRef} style={{ listStyle: "none" }}>
                {items.activeCat.subCategories.map(
                  ({ _id, subCatName, catName }) => (
                    <LI key={_id} active={subCatName === subcat ? true : false}>
                      <NavLink to={`/${catName}/${subCatName}`}>
                        <span>{subCatName}</span>
                        {subCatName === subcat ? (
                          <LineIcon
                            name="checkmark"
                            style={{
                              float: "right",
                              color: "#F8F7F9",
                              fontSize: "1rem",
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </NavLink>
                    </LI>
                  )
                )}
              </ul>
            </animated.div>
          )
      )}
    </div>
  );
};

const LI = styled.li`
  padding-bottom: 15px;
  cursor: pointer;

  &:last-child {
    padding-bottom: 0px;
  }

  a {
    text-decoration: none;
  }

  span {
    font-family: "Montserrat", sans-serif;
    font-size: 0.9rem;
    font-weight: 400;
    color: ${({ active }) => (active ? "#F8F7F9" : "#12233c")};
  }
`;

export default Menu;
