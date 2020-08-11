/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
  
  Card,
  CardHeader,
  
  Container,
  Row,
  FormGroup,
  Form,
  InputGroup,Alert,
  Input,

  Button
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

import {CustomAxios} from '../../axiosUtils';

class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alert:{
        status:false,
        text:'',
        style:''
      },
      form:{
        name:'',
        schedule:'',
        dateStart:'',
        dateEnd:''
      }
    }
  }

  onSubmit=async(e)=>{
    e.preventDefault()
      try {
       
        const res= await CustomAxios(process.env.REACT_APP_PUBLIC_URL+'/course',this.state.form,'post');

        if(res.data.message){
          console.log(res);
          this.setState({ 
            alert:{
              status:true,
              text:res.data.message,
              style:'danger'
            }
          })
         
        }else{
          this.props.history.push('/admin/index')
        }
      } catch (error) {
        console.log(error)
      }
  }

  handleChange=e=>{
    this.setState({
        form:{
            ...this.state.form,
            [e.target.name]: e.target.value
        }
        
    })
   
  }
  
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
        
          {/* Dark table */}
          <Row className="mt-5">
            <div className="col">
              <Card className="bg-default shadow">
                <CardHeader className="bg-transparent border-0">
                {this.state.alert.status  ?
              <Alert color={this.state.alert.style}>
                {this.state.alert.text}
              </Alert> : ''  
            }
                  <h3 className="text-white mb-0">Create Course</h3>
                </CardHeader>
                <Form role="form">
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                   
                    <Input onChange={this.handleChange} name="name" placeholder="Name" type="text"  required/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                   
                    
                    <Input  onChange={this.handleChange} name="schedule" placeholder="schedule" type="text"  required/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                  
                    <Input onChange={this.handleChange} name="dateStart" placeholder="Date Start" type="text" autoComplete="new-email" required/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative mb-3">
                   
                    <Input onChange={this.handleChange} name="dateEnd" placeholder="Date End" type="text" required/>
                  </InputGroup>
                </FormGroup>

               
               
              
                <div className="text-center">
                  <Button onClick={this.onSubmit} className="mt-4" color="primary" type="button">
                    Create Course
                  </Button>
                </div>
              </Form>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Tables;
