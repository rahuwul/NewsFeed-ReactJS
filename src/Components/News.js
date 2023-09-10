import React, { Component } from 'react'
import Newsitem from './Newsitem'
import PropTypes from 'prop-types'
import Spinner from './Spinner'
import InfiniteScroll from 'react-infinite-scroll-component'

export default class News extends Component {
    static defaultProps={
         country:"in",
         pageSize:2,
         category:"general",
         head:"TOP HEADLINES"

    }
    static propTypes={
         country: PropTypes.string,
         pageSize:PropTypes.number,
         category:PropTypes.string,
         head:PropTypes.string
    }
    constructor(){
        super();
        console.log("Hello I am a constructor");
        this.state={
            articles: [],
            loading:true,
            page:1,
            totalResults: 0
        }
    }
    async componentDidMount(){
        this.fetchNews();
    }
    async fetchNews(){
        this.props.setProgress(0);
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        this.props.setProgress(40);
        let data= await fetch(url);
        let parsedData=await data.json();
        this.props.setProgress(75);
        this.setState({
            articles:parsedData.articles,
            totalResults:parsedData.totalResults,
            loading:false
        })
        this.props.setProgress(100);
    }
    fetchMoreData = async() => {
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({page:this.state.page+1});
        let data= await fetch(url);
        let parsedData=await data.json();
        this.setState({
            articles:this.state.articles.concat(parsedData.articles),
            totalResults:parsedData.totalResults,
            loading:false
        })
      };
  render() {
    return (<>
      <div className='container my-3 '>
        <h1 className='text-center' style={{margin:'40px 0px'}}><b style={{color:"#52b548"}}>News</b>Feed - {this.props.head}</h1>
        {this.state.loading && <Spinner/>}
  <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
            <div className='container'style={{overflow:"hidden"}}>
            <div className='row'>
            {this.state.articles.map((element,index)=>{
                return  <div className='col md-3' key={index}>
                <Newsitem title={element.title} source={element.source.name} author={element.author} date={element.publishedAt} description={element.description?element.description:" "} imageUrl={element.urlToImage?element.urlToImage:`https://im.hunt.in/cg//kolkata/City-Guide/news.jpg`} newsUrl={element.url}/>
                </div>
            })}
        </div>
        </div>
        </InfiniteScroll>
        </div>
        </>
    )
  }
}

