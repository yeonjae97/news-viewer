import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import styled from 'styled-components';
import axios from 'axios';

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 2rem auto 0;
  @media screen and (max-width: 768px){
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

// const sampleArticle = {
//   title: '제목',
//   description: '내용',
//   url: 'https://google.com',
//   urlToImage: 'https://via.placeholder.com/160',
// }

const NewsList = ({category}) => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try{
      const fetchData = async () => {
        setLoading(true);
        const query = category === 'all' ? '' : `&category=${category}`;
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=95dd9e7aee234b2595c98eb9a7fa59c5`,
        );
        setArticles(response.data.articles);
        setLoading(false);
      };
      fetchData();
    }catch(e){
      console.log(e);
    }
  },[category]);

  if(loading){
    return <NewsListBlock>대기 중...</NewsListBlock>;
  }
  if(!articles){
    return null;
  }
  return (
    <NewsListBlock>
      {articles.map(article => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;