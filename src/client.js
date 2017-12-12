var configs = require('config');
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route,browserHistory, Link} from 'react-router';
import style from 'style.css';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            input:'',
            url: "http://localhost:"+4050
        }
        this.searchSQL = this.searchSQL.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getSQL = this.getSQL.bind(this);
        this.getSQL();
    };
    
    handleChange(e){
        //e.preventDefault();
        this.setState({ input: e.target.value });
    }

    searchSQL(){
        //e.preventDefault();
        var url = this.state.url+"/search"
        var data = {
            search: this.state.input
        };
        return fetch(url,{
                method: 'post',
                body: JSON.stringify(data),
                headers: {
                    'Content-Length': Buffer.byteLength(data),
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(result => this.setState({products: result.products}))
            .catch(function(e){
                //throw e;
                console.log("Connection Not found");
            }
        );
    }

    getSQL(){
        var url = this.state.url+"/getproducts"
        return fetch(url)
            .then(response => response.json())
            .then(result => this.setState({products: result.products}))
            .catch(function(e){
                console.log("Failed to get products");
            });
    }
    
    render(){
        var product = [];
        const { message, products } =this.state;
        for (var i in this.state.products) {
            product.push(
                <tr key={i}>
                    <td className="txtcentre">{this.state.products[i].id}</td>
                    <td className="txtcentre">{this.state.products[i].name}</td>
                    <td className="txtcentre">{"£"+this.state.products[i].price}</td>
                </tr>
            );
        }
        return( 
            <div>
                <h2 className="txtcentre">Supermarket products page</h2>
                <div className="topbar txtcentre">
                    <input
                        id="sql-input"
                        type="text"
                        onChange={ this.handleChange }
                        placeholder="Search"
                    />
                    <input
                        id="searchButton"
                        type="button"
                        value="Search"
                        className="button"
                        onClick={this.searchSQL}
                    />
                    <input
                        id="showAllButton"
                        type="button"
                        value="Show All"
                        className="button"
                        onClick={this.getSQL}
                    />
                </div>
                <table id="products">
                    <tbody>
                        <tr>
                            <th className="txtcentre">Product ID</th>
                            <th className="txtcentre">Name</th> 
                            <th className="txtcentre">Price</th>
                        </tr>
                        {product}
                    </tbody>
                </table>
            </div>
        );
    }
}

class App extends React.Component {
    render () {
        return (
            <Router history={browserHistory}>
                <Route path={'/'} component={Home}></Route>
                <Route path={'/home'} component={Home}></Route>
            </Router>
        );
    }
}
ReactDOM.render(<App />, document.getElementById('app'));