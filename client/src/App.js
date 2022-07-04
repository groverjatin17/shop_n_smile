import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import WelcomeSection from "./pages/login/loginPage";
import History from "./pages/common/components/History";
import "./App.css";
import Header from "./components/Header";
import TopMenu from "./components/TopMenu";
import Checkout from "./pages/cart/Checkout";
import OrderPlaced from './pages/cart/Success';
import Success from "./pages/cart/Success";
import Home from "./pages/homepage/Home";
import MyOrders from "./pages/orders/listOfOrders";
import AdminReportingView from "./pages/orders/adminReportingView";
import InventoryManagement from "./pages/inventoryManagement/inventoryManagement";
import GeneratePdf from "./pages/dummy/generatePdf";
const CartView = lazy(() => import("./pages/cart/Cart"));
const ContactUsView = lazy(() => import("./pages/ContactUs"));

const ProductListView = lazy(() => import("./pages/product/List"));
const ProductDetailView = lazy(() => import("./pages/product/Detail"));
const ProductCreateView = lazy(() => import("./pages/product/Add"));

function App() {
    return (
        <Router history={History}>
            <Header />
            <TopMenu />
            <Suspense
                fallback={
                    <div className="text-white text-center mt-3">
                        Loading...
                    </div>
                }
            >
                <Switch>
                    <div className="transition-container">
                        <Route exact path="/" component={ProductListView} />
                        <Route exact path="/homepage" component={Home} />
                        <Route path="/login" component={WelcomeSection} />
                        <Route
                            exact
                            path="/product/detail"
                            component={ProductDetailView}
                        />
                        <Route exact path="/cart" component={CartView} />
                        <Route
                            exact
                            path="/contact-us"
                            component={ContactUsView}
                        />
                        <Route exact path="/checkout" component={Checkout} />
                        <Route exact path="/orderPlaced" component={OrderPlaced} />
                        <Route exact path="/orders" component={MyOrders} />
                        <Route exact path="/reportingView" component={AdminReportingView} />
                        <Route exact path="/inventoryManagement" component={InventoryManagement} />
                        <Route exact path="/admin" component={ProductCreateView} />
                        <Route exact path="/generatePdf" component={GeneratePdf} />
                        
                    </div>
                </Switch>
            </Suspense>
        </Router>
    );
}

export default App;
