import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
// import toast from "react-hot-toast";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  // document.title = `${capitalize(props.category)} - NewsDaily`;

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    
    props.setProgress(10);
    // toast.success(`${capitalize(props.category)} news is loaded! `);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;

    setLoading(true);

    let data = await fetch(url);

    props.setProgress(30);

    let parsedData = await data.json();

    props.setProgress(70);

    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    
    props.setProgress(100);
    
  };

  //useEffect will use in case of component didMount
  useEffect(() => {
    // effect
    document.title = `${capitalize(props.category)} - NewsDaily`;
    
    updateNews();
    //this comment is used to clean rhe console 
    // eslint-disable-next-line
  }, []);

  // const handlePrevClick = async () => {
  //   // this.setState({ page: this.state.page - 1 });
  //   setPage(page - 1);
  //   updateNews();
  // };

  // const handleNextClick = async () => {
  //   setPage(page + 1);
  //   updateNews();
  // };

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;

    setPage(page + 1);

    let data = await fetch(url);

    let parsedData = await data.json();

    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    
  };

  console.log("render");
  return (
    <>
      <h1
        className="text-center"
        style={{ margin: "35px 0px", marginTop: "90px" }}
      >
        NewsDaily - Top {capitalize(props.category)} headlines
      </h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col md-4" key={element.url}>
                  {/* element.title agar null nhi hai to ye slice krdo warna blank string */}
                  <NewsItem
                    title={element.title ? element.title : ""}
                    description={element.description ? element.description : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>

      {/* <div className="container d-flex justify-content-between">
          <button
            disabled={state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              page + 1 >
              Math.ceil(totalResults / props.pageSize)
            }
            type="button"
            className="btn btn-dark"
            onClick={handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
    </>
  );
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  name: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
