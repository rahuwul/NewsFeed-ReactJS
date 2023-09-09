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
            totalResults: 0,
            api:"e243412e09af41afa03e28dfa5ea65e8" 
        }
    }
    async componentDidMount(){
        this.fetchNews();
    }
    async fetchNews(){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.state.api}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data= await fetch(url);
        let parsedData=await data.json();
        this.setState({
            articles:parsedData.articles,
            totalResults:parsedData.totalResults,
            loading:false
        })
        console.log(this.state.totalResults);
    }
    fetchMoreData = async() => {
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.state.api}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({page:this.state.page+1});
        let data= await fetch(url);
        let parsedData=await data.json();
        console.log(this.state.articles);
        console.log(`artleng= ${this.state.articles.length}`);
        console.log(`totR= ${this.state.totalResults}`)
        this.setState({
            articles:this.state.articles.concat(parsedData.articles),
            totalResults:parsedData.totalResults,
            loading:false
        })
      };
    handlePrev=async()=>{
        console.log("PREVIOUS");
        await this.setState({page:this.state.page-1});
        console.log(this.state.page);       
        this.fetchNews();
    }
    handleNext=async()=>{
        console.log("NEXT");
        await this.setState((prevState) => ({ page:this.state.page + 1 }));
        console.log(this.state.page);  
        this.fetchNews();
        }
        
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
            <div style={{overflow:"hidden"}}>
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

