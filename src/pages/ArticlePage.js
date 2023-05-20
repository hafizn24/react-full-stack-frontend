import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import articles from './article-content'
import NotFoundPage from './NotFoundPage'
import axios from 'axios'
import CommentsList from '../components/CommentsList'

function ArticlePage() {
  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] })

  useEffect(() => {
    const loadArticleInfo = async () => {
      const response = await axios.get(`/api/articles/${articleId}`)
      const temp = response.data
      setArticleInfo(temp)
    }
    loadArticleInfo()
  }, [])


  const { articleId } = useParams()
  const article = articles.find((article) => (article.name === articleId))

  if (!article) {
    return (<NotFoundPage />)
  }

  return (
    <>
      <h1>{article.title}</h1>
      <p>Upvotes {articleInfo.upvotes}</p>
      {article.content.map((paragraph) => (<p>{paragraph}</p>))}
      <CommentsList comments={articleInfo.comments} />
    </>
  )
}

export default ArticlePage