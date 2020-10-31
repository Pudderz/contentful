import React, { Component } from "react";
import * as JsSearch from "js-search";
import MenuListComposition from "../Components/top";
import { Link } from "gatsby";
import Container from "@material-ui/core/Container";
import Footer from "../Components/footer";
import { Button, InputLabel, MenuItem, Select } from "@material-ui/core";
import '../Components/searchPage.scss'
class SearchTemplate extends Component {
  state = {
    isLoading: true,
    searchResults: [],
    search: null,
    isError: false,
    indexByTitle: false,
    indexByAuthor: false,
    termFrequency: true,
    removeStopWords: false,
    searchQuery: "",
    selectedStrategy: "",
    selectedSanitizer: "",
    category: "",
    categoryList: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.search === null) {
      const {
        pageContext: { blogData: { options } = options } = {},
      } = nextProps;
      return {
        indexByTitle: options.TitleIndex,
        termFrequency: options.SearchByTerm,
        selectedSanitizer: options.searchSanitizer,
        selectedStrategy: options.indexStrategy,
      };
    }
    return null;
  }
  async componentDidMount() {
    const categorySearch = new Set();
    await this.props.pageContext.blogData.allBlogs.map(article => 
      article.node.categories.map(category => {
        categorySearch.add(category)
      })
    )
    this.setState({categoryList: [...categorySearch]})
    await this.rebuildIndex();

    if (this.props.location.state !== null) {
      if (this.props.location.state.search) {
        this.setState({ searchQuery: this.props.location.state.search }, () => {
          this.searchData({ target: { value: this.state.searchQuery } });
        });
      } else if (this.props.location.state.category) {
        this.setState({ category: this.props.location.state.category }, () => {
          console.log(this.state.category);
          this.searchData({ target: { value: "" } });
        });
      }
    }
  }

  rebuildIndex = () => {
    const blogs = this.props.pageContext.blogData.allBlogs;
    const dataToSearch = new JsSearch.Search([
      "node",
      "post",
      "childMdx",
      "frontmatter",
      "Date",
    ]);

    dataToSearch.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();
    dataToSearch.searchIndex = new JsSearch.UnorderedSearchIndex();

    dataToSearch.addIndex(["node", "post", "childMdx", "frontmatter", "title"]);
    dataToSearch.addIndex(["node", "categories"]);

    dataToSearch.addDocuments(blogs);

    this.setState({ search: dataToSearch, isLoading: false });
  };

  searchData = e => {
    const { search } = this.state;
     const query = `${e.target.value} ${this.state.category}`.trim();
    // let queryResult = search;
    console.log(search)
    const searchValue= `${e.target.value}`.trim();
    // if(searchValue !== ''){
      const queryResult = search.search(query);
    //   if(this.state.category!== ''){
    //   // console.log(`searching: ${query}`);
    //   queryResult = queryResult.search(this.state.categories);
    //   }
    // }else if(this.state.category!== ''){
    //     queryResult = queryResult.search(searchValue);
    //     if(searchValue !== ''){
    //     // console.log(`searching: ${query}`);
    //     queryResult = queryResult.search(this.state.categories);
    //     }
    //   }
  
    // console.log(queryResult)
    
    // console.log(queryResult)
    // console.log(queryResult);
    this.setState({ searchQuery: e.target.value, searchResults: queryResult });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.searchData({
      target: { value: e.target.children[0].children[1].value },
    });
  };

  changeCategory = e => {
    console.log(e.target.value);
    this.setState(
      {
        category: e.target.value,
      },
      () => {
        console.log(this.state.category);
        this.searchData({ target: { value: this.state.searchQuery } });
      }
    );
  };

  render() {
    const { searchResults, searchQuery, category } = this.state;
    const {
      pageContext: { blogData: { allBlogs } = allBlogs } = {},
    } = this.props;
    const queryResults =
      searchQuery === "" && category === "" ? allBlogs : searchResults;
    return (
      <div>
        <MenuListComposition
          changeSearch={this.searchData}
          changeCategory={this.changeCategory}
        />

        <div
          id="searchContainer"
          style={{
            backgroundColor: "rgba(236,239,243,0.5)",
            borderBottom: "1px solid #ECEFF3",
            // height: "300px",
            width: "100%",
          }}
        >
          <form onSubmit={this.handleSubmit}>
            <div
              style={{
                left: "10%",
                transform: "translate(0%,50%)",
                margin: "0",
                position: "absolute",
                bottom: "50%",
                right: "10%",
                boxSizing: "border-box",
              }}
            >
              <h3 style={{ margin: "0" }}>Searching For</h3>
              <input
                className="bigSearch"
                autoComplete="off"
                id="Search"
                value={searchQuery}
                onChange={this.searchData}
                placeholder="Search"
                style={{ margin: "0 auto" }}
                
              />
              <Button
              type="submit"
              variant="outlined"
              className="smallSearchSubmit"
              style={{margin:'20px auto'}}
              >Submit</Button>
            </div>
            
          </form>
        </div>
        <Container maxWidth="lg">
          <InputLabel id="demo-controlled-open-select-label">
            Category
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            value={this.state.category}
            onChange={this.changeCategory}
            style={{width: '100%'}}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>

            {this.state.categoryList.map((category, index) => {
                return (
                  <MenuItem key={`${index}`} value={`${category}`}>
                    {category}
                  </MenuItem>
                );
              })
            }
          </Select>
          <h2>{queryResults.length} Results</h2>
          <ol style={{ paddingLeft: 0, minHeight: "20vh" }}>
            {queryResults.map((item) => {
              return (
                <li
                  key={item.node.post.childMdx.frontmatter.slug}
                  className="searchItem"
                  style={{
                    maxWidth: "1300px",
                    width: "100%",
                    // height: "240px",
                    margin: "20px auto",
                    padding: "20px",
                    borderRadius: "20px",
                    boxShadow: "0px 1px 2px 1px lightslategrey",
                    boxSizing: "border-box",
                    listStyle: "none",
                  }}
                >
                  <Link
                    to={`../blogs/${item.node.post.childMdx.frontmatter.slug}`}
                  >
                    <h3 className="underline black" style={{ color: "#191c1d", margin: "10px 0" }}>
                      {item.node.post.childMdx.frontmatter.title}
                    </h3>
                  </Link>
                  <p>Posted at: {item.node.post.childMdx.frontmatter.Date}</p>
                </li>
              );
            })}
          </ol>
        </Container>
        <Footer changeCategory={this.changeCategory} />
      </div>
    );
  }
}
export default SearchTemplate;
