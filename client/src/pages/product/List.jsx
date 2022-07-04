import React, { lazy, Component } from "react";
import { connect } from "react-redux";
import axios from "../../helpers/axios";
const Paging = lazy(() => import("../../components/Paging"));
const FilterCategory = lazy(() => import("../../components/filter/Category"));
const FilterPrice = lazy(() => import("../../components/filter/Price"));
const FilterStar = lazy(() => import("../../components/filter/Star"));
const CardProductGrid = lazy(() =>
    import("../../components/card/CardProductGrid")
);

class ProductListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentProducts: [],
            currentPage: null,
            totalPages: null,
            totalItems: 0,
            view: "grid",
        };
    }

    async UNSAFE_componentWillMount() {
        const result = await axios.get(`/products`);

        if(result.data){
            this.props.dispatch({
                type: "PRODUCTS",
                payload: result.data
            })
        }

        const totalItems = this.getProducts().length;
        this.setState({ totalItems });
    }

    onPageChanged = (page) => {
        let products = this.getProducts();
        const { currentPage, totalPages, pageLimit } = page;
        const offset = (currentPage - 1) * pageLimit;
        const currentProducts = products.slice(offset, offset + pageLimit);
        this.setState({ currentPage, currentProducts, totalPages });
    };

    onChangeView = (view) => {
        this.setState({ view });
    };

    getProducts = () => {
        let products = this.props.homepageReducers.products;
        return products;
    };

    render() {
        const products = this.getProducts();
        let customProducts = [];
        const { selectedCategory } = this.props.homepageReducers;
        const { priceFilter, starFilter, searchFilter } = this.props.homepageReducers;
        if (selectedCategory.length > 0) {
            customProducts = products.filter(
                (item) => item.category === selectedCategory
            );
        } else{
          customProducts = products;
        }
        const tempStarFilter = [...new Set(starFilter)].sort();

        const lowestRange = priceFilter[0];
        const highestRange = priceFilter.slice(-1).pop();

        if(priceFilter.length > 0){
          customProducts = customProducts.filter(product => product.price > lowestRange && product.price < highestRange)
        }

        if(starFilter.length > 0){
            const starProducts = [];
            for(var x = 0; x<tempStarFilter.length; x++){
                customProducts.filter(product => tempStarFilter[x] == product.star).forEach(ele => starProducts.push(ele));
            }
            customProducts = starProducts;
          }
          if(searchFilter){
              customProducts = customProducts.filter(product => product.name.toLowerCase().includes(searchFilter))
          }
        return (
            <React.Fragment>
                <div
                    className="p-5 bg-primary bs-cover"
                    style={{
                        backgroundImage:
                            "url(../../images/banner/50-Banner.webp)",
                    }}
                >
                    <div className="container text-center">
                        <span className="display-5 px-3 bg-white rounded shadow">
                            Shop And Smile
                        </span>
                    </div>
                </div>
                <div className="container-fluid mb-3">
                    <div className="row mt-4">
                        <div className="col-md-3">
                            <FilterCategory />
                            <FilterPrice />
                            <FilterStar />
                        </div>
                        <div className="col-md-9">
                            <div className="row">
                                <div className="col-md-8">
                                    <span className="align-middle font-weight-bold">
                                        {customProducts.length} results for{" "}
                                        <span className="text-warning">
                                            {selectedCategory ? selectedCategory : "All Products"}
                                        </span>
                                    </span>
                                </div>
                            </div>
                            <hr />
                            <div className="row g-3">
                                {this.state.view === "grid" &&
                                    customProducts.map(
                                        (product, idx) => {
                                            return (
                                                <div
                                                    key={idx}
                                                    className="col-md-4"
                                                >
                                                    <CardProductGrid
                                                        data={product}
                                                    />
                                                </div>
                                            );
                                        }
                                    )}
                            </div>
                            <hr />
                            <Paging
                                totalRecords={this.state.totalItems}
                                pageLimit={9}
                                pageNeighbours={3}
                                onPageChanged={this.onPageChanged}
                                sizing=""
                                alignment="justify-content-center"
                            />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    homepageReducers: state.homepageReducers,
});

export default connect(mapStateToProps)(ProductListView);
