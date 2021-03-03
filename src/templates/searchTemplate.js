import React, { Component } from "react";
import * as JsSearch from "js-search";
import MenuListComposition from "../Components/top";
import { Link } from "gatsby";
import Container from "@material-ui/core/Container";
import Footer from "../Components/footer";
import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import {
  Breadcrumbs,
  Button,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import "../Components/searchPage.scss";
import PopularBlog from "../Components/PopularBlog";
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
    await this.props.pageContext.blogData.allBlogs.map((article) =>
      article.node.categories.map((category) => {
        categorySearch.add(category);
      })
    );
    this.setState({ categoryList: [...categorySearch] });
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

  searchData = (e) => {
    const { search } = this.state;
    const query = `${e.target.value} ${this.state.category}`.trim();
    console.log(search);
    const queryResult = search.search(query);
    this.setState({ searchQuery: e.target.value, searchResults: queryResult });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.searchData({
      target: { value: this.state.searchQuery },
    });
  };

  changeCategory = (e) => {
    this.setState(
      {
        category: e.target.value,
      },
      () => {
        this.searchData({ target: { value: this.state.searchQuery } });
      }
    );
  };

  handleSearch = (e) => this.setState({ searchQuery: e.target.value });

  render() {
    const { searchResults, searchQuery, category } = this.state;
    const {
      pageContext: { blogData: { allBlogs } = allBlogs } = {},
    } = this.props;
    const queryResults =
      searchQuery === "" && category === "" ? allBlogs : searchResults;

    return (
      <>
        <MenuListComposition
          changeSearch={this.searchData}
          changeCategory={this.changeCategory}
        />
        <Container maxWidth="lg">
          <div
            style={{
              width: "100%",
              padding: "20px 8px",
              boxSizing: "border-box",
            }}
          >
            <Breadcrumbs aria-label="breadcrumb" className="breadcrumb">
              <Link color="inherit" to="/posts">
                All Articles
              </Link>
              <Typography color="textPrimary">Search</Typography>
            </Breadcrumbs>
          </div>

          <form onSubmit={this.handleSubmit}>
            <div>
              {/* <h3 style={{ margin: "0" }}>Searching For</h3> */}
              <div>
                <InputBase
                  autoComplete="off"
                  name="search"
                  value={searchQuery}
                  onChange={this.handleSearch}
                  placeholder="Search…"
                  style={{
                    margin: "10px auto",
                    backgroundColor: "#fff",
                    boxShadow: "0px 0px 5px 0px rgba(112, 154, 168, 0.3)",
                    padding: "3px 11px",
                    borderRadius: "20px",
                    width: "100%",
                  }}
                  inputProps={{
                    "aria-label": "search",
                  }}
                  endAdornment={
                    <IconButton size="small" type="submit">
                      <SearchIcon style={{ fill: "black" }} />
                    </IconButton>
                  }
                />
                <div
                  style={{
                    width: "fit-content",
                    minWidth: "200px",
                    padding: "10px 11px 0",
                  }}
                >
                  <InputLabel id="demo-controlled-open-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                    value={this.state.category}
                    onChange={this.changeCategory}
                    style={{ width: "100%" }}
                    placeholder="None"
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
                    })}
                  </Select>
                </div>

                {/* <Button
                  type="submit"
                  variant="outlined"
                  className="smallSearchSubmit"
                  style={{ width: "fit-content" }}
                >
                  Submit
                </Button> */}
              </div>

              <div style={{ display: "flex", width: "100%", gap: "20px" }}>
                <div style={{ width: "100%" }}></div>
              </div>
            </div>
          </form>
          <h2>{queryResults.length} Results</h2>
          <ol
            style={{
              paddingLeft: 0,
              minHeight: "20vh",
              display: "grid",
              gap: "10px",
            }}
          >
            {queryResults.map((item) => {
              return <PopularBlog data={item} />;
            })}
          </ol>
        </Container>
        <Footer changeCategory={this.changeCategory} />
      </>
    );
  }
}
export default SearchTemplate;
