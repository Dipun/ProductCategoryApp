import React from 'react';
import './App.css';
import{Header,Table,Button} from 'semantic-ui-react';
import {Modal,Input} from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';


class App extends React.Component {
  constructor(){
    super()
    this.state = {
      allCategory : [],
      allProduct : [],
      visible: false,
      selectData:"",
      text:""
    }
  }

 async componentDidMount(){
   await axios.get('http://localhost:5000/categoryView')
    .then(res =>{
      console.log(res.data.doc);
      this.setState({allCategory:res.data.doc})
    })
    await axios.get('http://localhost:5000/allproducts')
    .then(res =>{
      console.log(res.data.doc);
      this.setState({allProduct:res.data.doc})
    })
  // console.log(this.state.allCategory, this.state.allProduct )
  }

  editCategort = (data) =>{
    this.setState({
      selectData: data,
      visible:true,
      text:"Edit Ctegory"
    })

  }

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
  renderAllCategory = () =>{
    return(
      this,this.state.allCategory.map( cat =>{
        return(
          <Table.Row id= {cat._id}>
            <Table.Cell>
            {cat.name}
            </Table.Cell>
            <Table.Cell>
            {cat._id}
            </Table.Cell>
            <Table.Cell>
            <Button
            floated='right'
            labelPosition='left'
            size='small'
            onClick={() =>{this.editCategort(cat)}}
          >
               EDIT
          </Button>
            </Table.Cell>
            <Table.Cell>
            <Button
            floated='right'
            labelPosition='left'
            size='small'
          >
               DELETE
          </Button>
            </Table.Cell>
          </Table.Row>
        )
      })
    )
  }

  renderAllProducts = () =>{
    return(
      this,this.state.allProduct.map( pro =>{
        return(
          <Table.Row id= {pro._id}>
            <Table.Cell>
            {pro.name}
            </Table.Cell>
            <Table.Cell>
            {pro._id}
            </Table.Cell>
            <Table.Cell>
            {pro.categoryname}
            </Table.Cell>
            <Table.Cell>
            <Button
            floated='right'
            labelPosition='left'
            size='small'
          >
               EDIT
          </Button>
            </Table.Cell>
            <Table.Cell>
            <Button
            floated='right'
            labelPosition='left'
            size='small'
          >
               DELETE
          </Button>
            </Table.Cell>
          </Table.Row>
        )
      })
    )
  }

  render(){
    return(
    <div className = 'appView'>
      <Header className = 'Header'> Product Category View</Header>
     <div>
     <Header className = 'Header_sub'> Category List</Header>
     <Table >
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>CategoryName</Table.HeaderCell>
        <Table.HeaderCell>CategoryID</Table.HeaderCell>
        <Table.HeaderCell>Action</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {this.renderAllCategory()}
    </Table.Body>
    </Table>
     </div>
     <div>
     <Header className = 'Header_sub'> Product List</Header>

     <Table >
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>ProductName</Table.HeaderCell>
        <Table.HeaderCell>ProductID</Table.HeaderCell>
        <Table.HeaderCell>CategoryName</Table.HeaderCell>
        <Table.HeaderCell>Action</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {this.renderAllProducts()}
    </Table.Body>
    </Table>
     </div>
     <div>
      <Modal
      title={this.state.text}
      visible={this.state.visible}
      onCancel={this.handleCancel}
    >
      <Input></Input>
    </Modal>
      </div>

    </div>
    );
  }
};

export default App;
