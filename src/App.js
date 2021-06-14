import { useEffect, useState, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import _ from 'lodash'

import { fetchCategories } from './api'
import { dataContext, navContext } from './context/context'
import Footer from './components/Footer/Footer'
const Main = lazy(() => import('./components/Main/Main'))

const App = () => {
  const [items, setData] = useState({})
  const [navData, setNavData] = useState({
    headerBgHeight: 199,
    open: false
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const fetchInitial = async () => {
        const { data, status } = await fetchCategories('Apps')

        if(status === 200){
          setData(data)
        }else if(status === 404){
          console.log('something went wrong')
        }
      }

      fetchInitial()
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    !_.isEmpty(items) &&
      <Router>
          <MainContainer>

            <navContext.Provider value={{ navData, setNavData }}>

              <HeaderBg height={navData.headerBgHeight} />

              <dataContext.Provider value={{ items, setData, loading, setLoading }}>

                <Suspense fallback={<p>Loading...</p>}>

                  <Switch>
                    <Route exact path="/">
                      <Redirect to={`/${items.activeCat.catName}/${items.activeSubcat.subCatName}`} />
                    </Route>

                    {/* <Route exact path="/" component={Main} /> */}

                    <Route exact path="/:cat/:subcat" component={Main} />

                    <Route exact path="*">
                      <Redirect to={`/${items.activeCat.catName}/${items.activeSubcat.subCatName}`} />
                    </Route>

                  </Switch>

                  <Footer />

                </Suspense>

              </dataContext.Provider>

            </navContext.Provider>

          </MainContainer>
      </Router>
  )
}

const MainContainer = styled.div`
  max-width: 500px;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  top: 0;
  left: 0; 
`

const HeaderBg = styled.div`
  height: ${props => props.height}px;
  position: absolute;
  right: 50%;
  top: 0;
  transform: translateX(50%);
  background: linear-gradient(124.6deg, #F5CB5C -4.14%, #E99D44 91.4%);
  border-radius: 0px 0px 25px 25px;
  padding: 20px 30px 50px;
  width: 100%;
  transition: height 200ms ease-in-out;
`

export default App
