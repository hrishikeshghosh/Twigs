import React, { useState, useEffect } from 'react'
import { Grid, Grow } from '@material-ui/core'
import './style.css'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import InfoBox from '../Elements/InfoBox/InfoBox'
import Form from '../Elements/Form/Form'
import Posts from '../Elements/Posts/Posts'
import { getPosts, searchPosts } from '../../actions/feed'
import EmailBox from '../atoms/EmailBox/EmailBox'
import ArtPosts from '../Elements/ArtPosts/ArtPosts'
import Artview from '../Elements/View/ARTVIEW/Artview'
import LoadingScreen from '../Elements/LoadingScreen/LoadingScreen'
import { fetchProfile, searchLIB } from '../../actions/profile'
import TOKEN_DECODER from '../../Helper/TOKEN_DECODER'
import USERDATA from '../../Helper/USERDATA'
import Library from '../Elements/Library/Library'
import Toast from '../atoms/ToastBox/Toast'
import SearchPost from '../Elements/SearchPost/SearchPost'
import AlertToast from '../atoms/FormToast/AlertToast'
function useQuery () {
  return new URLSearchParams(useLocation().search)
}

function Layout ({
  searchData,
  section,
  viewpost,
  fetched,
  setSection,
  setLibrarySearch,
  setShowSearchAction,
  showSearchAction,
  AppMenuVisible,
  setAppMenuVisible
}) {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const query = useQuery()
  const userID = TOKEN_DECODER(USERDATA()?.token).id
  const [isDisplayed, setisDisplayed] = useState('hidden')
  const [artPostDisplayed, setArtPostDisplayed] = useState(viewpost)
  const [contentID, setContentID] = useState({ id: null, type: 0 })
  const { Loading, blogs, arts } = useSelector(state => state.posts)
  const { status } = useSelector(state => state.alert)

  useEffect(() => {
    switch (location.pathname) {
      case '/Home/blogs':
        setSection(0)
        break
      case '/Home/arts':
        setSection(1)
        break
      case '/Home/library':
        setSection(2)
        break
      case '/Home/ReadLater':
        setSection(3)
        break
      default:
        setSection(0)
    }
  }, [location.pathname, setSection])

  useEffect(() => {
    if (query.has('search')) {
      dispatch(searchLIB(query.get('search'), userID))
    } else if (query.has('query')) {
      dispatch(searchPosts(query.get('query')))
    }
  }, [query, dispatch, userID, history])

  // GET POSTS
  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])
  // GET PROFILE
  useEffect(() => {
    dispatch(fetchProfile(userID))
  }, [userID, dispatch])

  useEffect(() => {
    if (artPostDisplayed) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'auto'
    }
  }, [artPostDisplayed])

  const DetermineLayout = () => {
    switch (section) {
      case 0:
        return <Posts setContentID={setContentID} fetched={fetched} />
      // return <AlertToast />;
      case 1:
        return (
          <ArtPosts
            setIsDisplayed={setArtPostDisplayed}
            setContentID={setContentID}
            fetched={fetched}
          />
        )
      case 2:
        return (
          <Library
            setContentID={setContentID}
            fetched={fetched}
            setLibrarySearch={setLibrarySearch}
            setSection={setSection}
          />
        )
      default:
        return (
          <Posts
            setContentID={setContentID}
            // setShowLoading={setShowLoading}
            fetched={fetched}
          />
        )
    }
  }

  if (Loading && !blogs.length && !arts.length) {
    return (
      <Grow in>
        <LoadingScreen />
      </Grow>
    )
  } else {
    return (
      <Grow in>
        <div className='layout-root'>
          <Form
            isDisplayed={isDisplayed}
            setisDisplayed={setisDisplayed}
            contentID={contentID}
            setContentID={setContentID}
          />

          <Artview
            isDisplayed={artPostDisplayed}
            setisDisplayed={setArtPostDisplayed}
          />
          <Toast />
          {status && <AlertToast />}

          <SearchPost
            setShowSearchAction={setShowSearchAction}
            showSearchAction={showSearchAction}
          />
          <EmailBox />

          <Grid container alignContent='center' alignItems='stretch'>
            <Grid item xs={12} sm={2}>
              <InfoBox
                setisDisplayed={setisDisplayed}
                setSection={setSection}
              />
            </Grid>
            <Grid item xs={12} sm={10}>
              {DetermineLayout()}
            </Grid>
          </Grid>
        </div>
      </Grow>
    )
  }
}

export default Layout
