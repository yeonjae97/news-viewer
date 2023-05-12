import React from 'react';
import NewsItem from './NewsItem';
import styled from 'styled-components';
import axios from 'axios';
import usePromise from '../lib/usePromise';


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

const NewsList = ({category}) => {
  // const [articles, setArticles] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [loading, response, error] = usePromise(() => {
        const query = category === 'all' ? '' : `&category=${category}`;
        return  axios.get(
          `https://newsapi.org/v2/top-headlines?country=us${query}&apiKey=3e3041e3f41848b5a0a96b6f28776a3d`
        );
  }, [category]);

  // useEffect(() => {
  //   try{
  //     setLoading(true);
  //     const fetchData = async () => {
  //       const query = category === 'all' ? '' : `&category=${category}`;
  //       const response = await axios.get(
  //         // `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=95dd9e7aee234b2595c98eb9a7fa59c5`,
  //         `https://newsapi.org/v2/top-headlines?country=us${query}&apiKey=3e3041e3f41848b5a0a96b6f28776a3d`
  //       );
  //       setArticles(response.data.articles);
  //       setLoading(false); // false를 안하면 데이터는 계속 로딩됨 => 429 Error 유발 (일정 시간이 지나야 풀림)
  //     };
  //     fetchData();
  //   }catch(e){
  //     console.log(e);
  //   }
  // },[category]);



  if(loading){
    return <NewsListBlock>대기 중...</NewsListBlock>;
  }
  if(!response){
    return null;
  }
  if(error){
    return <NewsListBlock>에러 발생!</NewsListBlock>;
  }

  const { articles } = response.data;
  return (
    <NewsListBlock>
      {articles.map(article => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;