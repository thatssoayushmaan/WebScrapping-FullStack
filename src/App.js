import React from 'react'
import axios from 'axios'
export default class App extends React.Component{
  constructor(){
    super()
    this.state = {
      products : [],
      url: ""
    }
  }


  handleSubmit = async () => {
       const {products} = await axios.post(url)
       this.setState({products})
}
  
  
  loadProducts = async () => {
      const {products} = await axios.get('http://localhost:3000/products');
      this.setState({products})

    }
  }

  componentDidMount(){
    this.loadProducts()
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value
    });
  };
  
  render(){
    return(
      <div>
        <h1>Web Scrapping App</h1>

        <h4>Add a new creator</h4>
        <input name="url" type="text" placeholder="paste product url" onclick={this.handleChange} />
        <button type="submit" onclick={this.handleSubmit}>Submit</button>

        <div className="container">{
          products.map(product => {
            return(
              <div className="row">
                <div className="card">
                  <div className="card-title">{product.name}</div>
                  <div className="card-img">{product.img}</div>
                </div>
              </div>
            )
          })
        }</div>
      </div>
    )
  }
