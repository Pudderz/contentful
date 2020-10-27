import React, { Component } from "react";
import * as JsSearch from "js-search";
import MenuListComposition from "../Components/top";
import { Link } from "gatsby";
import Navigation from "../Components/navigation";
import Container from "@material-ui/core/Container";
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
    this.rebuildIndex();
  }

  rebuildIndex = () => {
    const { selectedStrategy, removeStopWords, termFrequency } = this.state;
    const blogs = this.props.pageContext.blogData.allBlogs;
    const dataToSearch = new JsSearch.Search([
      "node",
      "post",
      "childMdx",
      "frontmatter",
      "Date",
    ]);

    if (removeStopWords) {
      dataToSearch.tokenizer = new JsSearch.StopWordsTokenizer(
        dataToSearch.tokenizer
      );
    }

    if (selectedStrategy === "All") {
      dataToSearch.indexStrategy = new JsSearch.AllSubstringsIndexStrategy();
    }
    if (selectedStrategy === "Exact match") {
      dataToSearch.indexStrategy = new JsSearch.ExactWordIndexStrategy();
    }
    if (selectedStrategy === "Prefix match") {
      dataToSearch.indexStrategy = new JsSearch.PrefixIndexStrategy();
    }

    dataToSearch.sanitizer = new JsSearch.LowerCaseSanitizer();
    termFrequency === true
      ? (dataToSearch.searchIndex = new JsSearch.TfIdfSearchIndex([
          "node",
          "post",
          "childMdx",
          "frontmatter",
          "Date",
        ]))
      : (dataToSearch.searchIndex = new JsSearch.UnorderedSearchIndex());

    dataToSearch.addIndex(["node", "post", "childMdx", "frontmatter", "title"]);
    dataToSearch.addDocuments(blogs);
    this.setState({ search: dataToSearch, isLoading: false });
  };

  searchData = (e) => {
    const { search } = this.state;
    const queryResult = search.search(e.target.value);
    this.setState({ searchQuery: e.target.value, searchResults: queryResult });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.searchData(e);
  };
  render() {
    const { searchResults, searchQuery } = this.state;
    const {
      pageContext: { blogData: { allBlogs } = allBlogs } = {},
    } = this.props;
    const queryResults = searchQuery === "" ? allBlogs : searchResults;
    return (
      <div>
        <MenuListComposition />
        {/* <Navigation /> */}
        <div
          id="searchContainer"
          style={{
            backgroundColor: "rgba(236,239,243,0.5)",
            borderBottom: "1px solid #ECEFF3",
            height: "300px",
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
                width: "100%",
              }}
            >
              <input
                className="bigSearch"
                id="Search"
                value={searchQuery}
                onChange={this.searchData}
                placeholder="Search"
                style={{ margin: "0 auto" }}
              />
            </div>
          </form>
        </div>
        <Container maxWidth="lg">
          <h2>{queryResults.length} Results</h2>
          <ol>
            {queryResults.map((item) => {
              return (
                <li
                  style={{
                    width: "1000px",
                    height: "240px",
                    margin: "auto",
                    padding: "20px",
                    height: "fit-content",
                    boxShadow: "0px 1px 2px 1px lightslategrey",
                  }}
                >
                  <Link
                    to={`../blogs/${item.node.post.childMdx.frontmatter.slug}`}
                  >
                    <h3>{item.node.post.childMdx.frontmatter.title}</h3>
                  </Link>
                  <p>Posted{item.node.post.childMdx.frontmatter.Date}</p>
                </li>
              );
            })}
          </ol>
        </Container>
      </div>
    );
  }
  // return (
  //   <div>
  //       <ClientSearch blogs={allBlogs} engine={options} />
  //   </div>
  // )
}
export default SearchTemplate;
