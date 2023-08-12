import React, { Component } from 'react'
import NewsItem from './NewsItem'
import { Spinner } from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 19
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  capitalizeFirstLetter = (string) =>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    console.log("hello there i am constructor from news");
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0

    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonke`;
  }

  async updateNews(){
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: false });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseddata = await data.json();
    console.log(parseddata);
    this.props.setProgress(70);
    this.setState({
      articles: parseddata.articles,
      totalArticles: parseddata.totalResults,
      loading: true,
      totalResults: parseddata
    })
    this.props.setProgress(100);
  }
  
  async componentDidMount() {
    this.updateNews()
  }

  handleNextClick = async () => {
    this.setState({page: this.state.page + 1});
    this.updateNews()
  }
  handlePreClick = async () => { 
    this.setState({page: this.state.page - 1});
    this.updateNews()
  }
  fetchMoreData = async() =>{
    this.setState({page: this.state.page + 1})
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parseddata = await data.json();
    console.log(parseddata);
    this.setState({
      articles: this.state.articles.concat(parseddata.articles),
      totalArticles: parseddata.totalResults,
      totalResults: parseddata
    })
  }

  render() {
    return (
      <>
        <h2 className='text-center'>Top News from {this.capitalizeFirstLetter(this.props.category)}</h2>
        {!this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className='container'>
        <div className='row'>
          {this.state.articles.map((element) => {
            return <div className='col-md-3 mb-3' key={element.url}>
              <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 80) : ""} imgurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>
          })}
        </div>
        </div>
        </InfiniteScroll>
       
      </>
    )
  }
}

export default News











// import React, { Component } from 'react'
// import NewsItem from './NewsItem'
// import { Spinner } from './Spinner';
// import PropTypes from 'prop-types'


// export class News extends Component {
//   static defaultProps = {
//     country: 'in',
//     pageSize: 19
//   }
//   static propTypes = {
//     country: PropTypes.string,
//     pageSize: PropTypes.number,
//     category: PropTypes.string
//   }

//   capitalizeFirstLetter = (string) =>{
//     return string.charAt(0).toUpperCase() + string.slice(1);
//   }

//   constructor(props) {
//     super(props);
//     console.log("hello there i am constructor from news");
//     this.state = {
//       articles: [],
//       loading: false,
//       page: 1

//     }
//     document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonke`;
//   }

//   async updateNews(){
//     const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fbe07af3a19d476580f8898976f68734&page=${this.state.page}&pageSize=${this.props.pageSize}`;
//     this.setState({ loading: true });
//     let data = await fetch(url);
//     let parseddata = await data.json();
//     console.log(parseddata);
//     this.setState({
//       articles: parseddata.articles,
//       totalArticles: parseddata.totalResults,
//       loading: false
//     })
//   }
  
//   async componentDidMount() {
//     this.updateNews()
//   }

//   handleNextClick = async () => {
//     this.setState({page: this.state.page + 1});
//     this.updateNews()
//   }
//   handlePreClick = async () => { 
//     this.setState({page: this.state.page - 1});
//     this.updateNews()
//   }

//   render() {
//     return (
//       <div className='container my-3 text-center'>
//         <h2>Top News from {this.capitalizeFirstLetter(this.props.category)}</h2>
//         {this.state.loading && <Spinner />}
//         <div className='row'>
//           {!this.state.loading && this.state.articles.map((element) => {
//             return <div className='col-md-3 mb-3' key={element.url}>
//               <NewsItem title={element.title ? element.title.slice(0, 40) : ""} description={element.description ? element.description.slice(0, 80) : ""} imgurl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
//             </div>
//           })}
//         </div>
//         <div className='container d-flex justify-content-between'>
//           <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreClick}>&larr; Previous</button>
//           <button disabled={this.state.page + 1 > Math.ceil(this.state.totalArticles / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
//         </div>
//       </div>
//     )
//   }
// }

// export default News
