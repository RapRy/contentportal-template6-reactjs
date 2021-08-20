import { useEffect, useState, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import styled from "styled-components";
import _ from "lodash";

import { fetchCategories, fetchContents } from "./api";
import { dataContext, navContext } from "./context/context";
import Footer from "./components/Footer/Footer";
const Main = lazy(() => import("./components/Main/Main"));
const FourOFour = lazy(() => import("./components/Errors/FourOFour"));
const FiveOThree = lazy(() => import("./components/Errors/FiveOThree"));

const App = () => {
  const [items, setData] = useState({});
  const [navData, setNavData] = useState({
    headerBgHeight: 199,
    open: false,
  });
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  useEffect(() => {
    try {
      const fetchInitial = async () => {
        const res = await Promise.all([
          fetchCategories(),
          fetchContents("Games"),
        ]);

        if (res[0].status === 200 && res[1].status === 200) {
          const { categories } = res[0].data;

          const activeCat = categories.filter(
            (cat) => cat.catName === "Games"
          )[0];
          const activeSubcat = activeCat.subCategories[0];

          setData({
            categories,
            activeCat,
            activeSubcat,
            contents: res[1].data.data[activeSubcat.subCatName],
          });

          setLoading(false);
          return;
        }

        history.push("/404");
      };

      fetchInitial();
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    !_.isEmpty(items) && (
      <Router>
        <MainContainer>
          <navContext.Provider value={{ navData, setNavData }}>
            <HeaderBg height={navData.headerBgHeight} />

            <dataContext.Provider
              value={{ items, setData, loading, setLoading }}
            >
              <Suspense fallback={<p>Loading...</p>}>
                <Switch>
                  <Route exact path="/">
                    <Redirect
                      to={`/${items.activeCat.catName}/${items.activeSubcat.subCatName}`}
                    />
                  </Route>

                  {/* <Route exact path="/" component={Main} /> */}

                  <Route exact path="/:cat/:subcat" component={Main} />

                  <Route exact path="/502" component={FiveOThree} />

                  <Route exact path="*" component={FourOFour} />
                </Switch>

                <Footer />
              </Suspense>
            </dataContext.Provider>
          </navContext.Provider>
        </MainContainer>
      </Router>
    )
  );
};

const MainContainer = styled.div`
  max-width: 500px;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  top: 0;
  left: 0;
`;

const HeaderBg = styled.div`
  height: ${(props) => props.height}px;
  position: absolute;
  right: 50%;
  top: 0;
  transform: translateX(50%);
  background: linear-gradient(124.6deg, #f5cb5c -4.14%, #e99d44 91.4%);
  border-radius: 0px 0px 25px 25px;
  padding: 20px 30px 50px;
  width: 100%;
  transition: height 200ms ease-in-out;
`;

export default App;
