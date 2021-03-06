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

import {CustomAxios} from '../../axiosUtils';


// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Alert
} from "reactstrap";

class Login extends React.Component {
  state={
    form:{
      email:'',
      password:''
    },
    alert:{
      status:false,
      text:''
    }
  }

  componentDidMount(){
    this.getIdentity();
  }

  getIdentity=()=>{
    const identity=JSON.stringify(localStorage.getItem('identity'));
    if(identity){
       return identity;
    }else{
      this.props.history.push('/auth')
    }
   
  }

  

  loginUser=async(e)=>{
    e.preventDefault()
    
    try {
      const res= await CustomAxios(process.env.REACT_APP_PUBLIC_URL+'/login',this.state.form,'post');
      if(res.data.message){
        this.setState({
          alert:{
            status:true,
            text:res.data.message
          }
        })
      }else{
        localStorage.setItem('identity',JSON.stringify(res.data.student));
        this.props.history.push('/admin')
      }
      console.log(res);
    } catch (error) {
      console.log(error);
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
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              {this.state.alert.status  ?
              <Alert color="warning">
                {this.state.alert.text}
              </Alert> : ''  
            }
              <div className="text-muted text-center mt-2 mb-3">
                <small>Sign in with</small>
              </div>
            
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>Or sign in with credentials</small>
              </div>
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input onChange={this.handleChange} placeholder="Email" name="email" type="email" autoComplete="new-email"/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input onChange={this.handleChange} placeholder="Password" name="password" type="password" autoComplete="new-password"/>
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                 
                </div>
                <div className="text-center">
                  <Button onClick={this.loginUser} className="my-4" color="primary" type="button">
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Create new account</small>
              </a>
            </Col>
          </Row>
        </Col>
      </>
    );
  }
}

export default Login;
