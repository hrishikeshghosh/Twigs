import React, { Fragment, useState, useEffect } from 'react'
import Appbar from './Elements/appbar/AppBar'
import Layout from './layout/layout'
import ProfilePage from './Elements/View/ProfilePage/Profile_page'
import ProfileForm from './atoms/ProfileForm/ProfileForm'
import Library from '../compoments/Elements/Library/Library'
import Auth from './Elements/Auth/Auth'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import AppbarMenu from './atoms/AppbarMenu/AppbarMenu'

function App () {
  const [showSearchAction, setShowSearchAction] = useState(false)
  const [invalidTOken, setToken] = useState(false)
  const [librarySearch, setLibrarySearch] = useState(null)
  const [section, setSection] = useState(
    JSON.parse(sessionStorage.getItem('_s'))
  )



  useEffect(() => {
    switch (section) {
      case 0:
        sessionStorage.setItem('_s', 0)
        break
      case 1:
        sessionStorage.setItem('_s', 1)
        break
      case 2:
        sessionStorage.setItem('_s', 2)
        break
      case 3:
        sessionStorage.setItem('_s', 3)
        break
      case 4:
        sessionStorage.setItem('_s', 4)
        break
      default:
        sessionStorage.setItem('_s', 0)
    }
  }, [section])

  const RootPageDecider = () => {
    switch (JSON.parse(sessionStorage.getItem('_s'))) {
      case 0:
        return <Redirect to='/Home/blogs' />

      case 1:
        return <Redirect to='/Home/arts' />

      case 2:
        return <Redirect to='/Home/library' />

      case 3:
        return <Redirect to='/Home/ReadLater' />
      case 4:
        return <Redirect to='/Home/search' />
      default:
        return <Redirect to='/Home/blogs' />
    }
  }

  const deployLayout = (viewpost, search) => {
    return (
      <Layout
        section={section}
        viewpost={viewpost}
        setSection={setSection}
        setLibrarySearch={setLibrarySearch}
        setShowSearchAction={setShowSearchAction}
        showSearchAction={search}
      />
    )
  }

  return   <BrowserRouter>
      <Switch>
        <Route path='/auth' exact component={Auth} />
        {/* {showLoading && <LoadingScreen setShowLoading={setShowLoading} />} */}
        <Fragment>
          <Appbar setsection={setSection} section={section} />
          <AppbarMenu setSection={setSection} />
          <Route path='/' exact component={RootPageDecider} />
          <Route
            path='/Home/blogs'
            exact
            component={() => deployLayout(false)}
          />
          <Route
            path='/Home/arts'
            exact
            component={() => deployLayout(false)}
          />
          <Route
            path='/Home/library'
            exact
            component={() => deployLayout(false)}
          />
          <Route
            path='/Home/search/'
            exact
            component={() => deployLayout(false, true)}
          />

          <Route
            path='/contents/:genre/:id'
            exact
            component={() => deployLayout(true)}
          />
          {/* <Route
            path="/contents/:id"
            exact
            component={() => deployLayout(true)}
          /> */}

          <Route path='/profile/:id' exact component={ProfilePage} />
          <Route path='/profile/edit/:id' exact component={ProfileForm} />
          <Route path='/library' exact component={Library} />
        </Fragment>
      </Switch>
    </BrowserRouter>
  
}

export default App
