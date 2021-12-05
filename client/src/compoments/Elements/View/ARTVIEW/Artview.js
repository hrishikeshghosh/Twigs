import React, { useEffect, useState } from 'react'
import { Grow, Avatar } from '@material-ui/core'
import PublicIcon from '@material-ui/icons/Public'
import moment from 'moment'
import { useHistory, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { fetchComments, getSinglePost } from '../../../../actions/posts'
import './style.css'
import VWLikePost from '../../../atoms/ViewPost_LikeBox/VWLikePost'
import VWComments from '../../../atoms/ViewPost_CommentBox/VWComments'
import TEXTDECODER from '../../../../Helper/TEXT_DECODER'
import TYPE from '../../../../Helper/TYPE'

const Artview = ({ isDisplayed, setisDisplayed }) => {
  const { id, genre } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const [data, setData] = useState(null)
  const { blogs, arts, detail } = useSelector(state => state.posts)

  useEffect(() => {
    if (isDisplayed) {
      if (blogs.length || arts.length) {
        if (genre === 'blogs') {
          blogs.forEach(element => {
            if (element?._id === id) {
              setData(element)
            }
          })
        } else if (genre === 'arts') {
          arts.forEach(element => {
            if (element?._id === id) {
              setData(element)
            }
          })
        }
        dispatch(fetchComments(id, TYPE()))
      } else {
        dispatch(getSinglePost(id, TYPE()))
        setData(detail)
      }
      // if (data) {
      //   dispatch(fetchComments(id, TYPE()));
      // }
    }
  }, [isDisplayed, blogs, id, dispatch, arts, genre, detail, data])

  // useEffect(() => {
  //   if (data) {
  //     dispatch(fetchComments(id, TYPE()));
  //   }
  // }, [dispatch, id, data]);

  // const { detail, loadSingle } = useSelector((state) => state.posts);
  const [expandedImage, setExpandedImage] = useState(true)

  const handleImageClick = e => {
    e.preventDefault()
    setExpandedImage(prevState => !prevState)
  }

  const handlePreviewClose = e => {
    e.preventDefault()
    setisDisplayed(prevState => !prevState)
    history.goBack()
  }

  if (data) {
    return (
      <Grow in>
        <div
          className='view-post-root'
          style={isDisplayed ? { display: 'block' } : { display: 'none' }}
        >
          <button
            className='close-artView-btn'
            onClick={e => {
              handlePreviewClose(e)
            }}
          >
            <i className='fas fa-times'></i>
          </button>
          <div className='view-post-holder'>
            <div className='view-post-container'>
              <section className='view-post-header'>
                <div className='view-post-header-left'>
                  <Avatar
                    className='view-post-user-avatar'
                    src={data?.creatorImage}
                  />
                  <div className='post-name-box'>
                    <p
                      className='view-post-user-name'
                      onClick={e => {
                        e.preventDefault()
                        history.push(`/profile/${data?.creatorID}`)
                      }}
                    >
                      {data?.creatorName}
                    </p>
                    <p className='view-post-user-role'>{data?.creatorRole}</p>
                  </div>
                </div>
                <div className='view-post-header-right'>
                  <PublicIcon
                    style={{
                      color: 'gray',
                      fontSize: '0.9rem',
                      margin: '0 2%'
                    }}
                  />
                  <div className='view-post-header-right-text-bundle'>
                    <p style={{ marginRight: '2%' }}>Published on,</p>
                    <p> {moment(data.createdAt).format('DD MMM, YYYY')}</p>
                  </div>
                </div>
              </section>
              <section className='view-post-image-box'>
                <div
                  className='view-post-img-holder'
                  onClick={e => handleImageClick(e)}
                  style={
                    expandedImage
                      ? { width: '100%', cursor: 'zoom-out' }
                      : { width: '30%', cursor: 'zoom-in' }
                  }
                >
                  {data.media ? (
                    <img
                      className='view-post-img'
                      src={data.media}
                      alt='Post'
                    />
                  ) : (
                    <img
                      className='view-post-img'
                      src='https://firebasestorage.googleapis.com/v0/b/twigs-7e94a.appspot.com/o/posts%2Fconstants%2FNoImagePost.png?alt=media&token=d880ed7e-9c87-40b0-a0cd-7c5596fc3282'
                      alt='Post'
                    />
                  )}

                  <div className='img-resizer'>
                    <i className='fas fa-expand'></i>
                  </div>
                </div>
              </section>
              <section className='view-post-caption-box'>
                {data?.title && (
                  <div
                    className='view-post-title-box'
                    style={{ width: '100%', padding: '5% 5% 2% 5%' }}
                  >
                    <h2 className='view-post-title'>{data?.title}</h2>
                  </div>
                )}

                <div
                  className='view-post-caption-text-box'
                  style={{
                    width: '100%',
                    padding: '2% 5% 2% 5% '
                  }}
                >
                  <p
                    className='view-post-caption-text'
                    style={
                      data?.title
                        ? { textAlign: 'left' }
                        : { textAlign: 'left', fontSize: '0.8rem' }
                    }
                  >
                    {TEXTDECODER(data?.content)}
                  </p>
                </div>
                {data.tags.length !== 0 && (
                  <section className='view-post-tag-box'>
                    {data.tags.map(eachtag => (
                      <div className='tag-box-root'>
                        <p>{eachtag}</p>
                      </div>
                    ))}
                  </section>
                )}
              </section>
              {/* <Divider style={{ margin: "5%" }} /> */}
              <section className='view-post-like-box'>
                <VWLikePost
                  id={id}
                  likeCount={data.likes}
                  dislikeCount={data.dislikes}
                  copyrightname={data.creatorName}
                  data={data}
                />
              </section>
              <section className='view-post-comment-box'>
                <VWComments id={id} detail={data} />
              </section>
            </div>
          </div>
        </div>
      </Grow>
    )
  }
  // else if (loadSingle) {
  //   return (
  //     <div
  //       className="view-post-root"
  //       style={isDisplayed ? { display: "block" } : { display: "none" }}
  //     >
  //       <LinearProgress className="loader" />
  //     </div>
  //   );
  // } else if (loadSingle && !detail) {
  //   return <LoadingScreen />;
  // }
  else {
    return (
      <div
        className='view-post-root'
        style={isDisplayed ? { display: 'block' } : { display: 'none' }}
      >
        <h1
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            color: 'white',
            fontFamily: 'Open Sans',
            fontSize: '2.5rem'
          }}
        >
          {' '}
          <span>
            <i className='fas fa-map-signs' style={{ fontSize: '2.5rem' }}></i>
          </span>
          &nbsp; Post Not Available!
        </h1>
        ;
      </div>
    )
  }
}

export default Artview
