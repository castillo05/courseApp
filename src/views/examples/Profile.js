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
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Alert,
  CardImg,
  CardTitle,
  CardSubtitle
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";

import {CustomAxios} from '../../axiosUtils';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',
      lastName:'', 
      email:'',
      courses:[],
      form:{
        email:'',
        name:'',
        lastName:''
      },
      data:null,
      alert:{
        status:false,
        text:'',
        style:''
      }
    }
  }

  getStudent=async()=>{
    try {
      const identity=JSON.parse(localStorage.getItem('identity'));
      const student = await CustomAxios(process.env.REACT_APP_PUBLIC_URL+'/student/'+identity.id,{},'get')

      console.log(student)
      this.setState({
        name:student.data.student.name,
        lastName: student.data.student.lastName,
        email: student.data.student.email,
        courses:student.data.student.courses
      })
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
    console.log(this.state.form);
  }

  updateSubmit=async(e)=>{
    e.preventDefault()
      try {
        const identity=JSON.parse(localStorage.getItem('identity'));
        const res= await CustomAxios(process.env.REACT_APP_PUBLIC_URL+'/student/'+identity.id,this.state.form,'put');

        if(res){
          console.log(res);
         
        }else{

        }
      } catch (error) {
        console.log(error)
      }
  }

  

  componentDidMount(){
    this.getStudent()
   
    
  }
  
  render() {
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={e => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={require("assets/img/theme/user.png")}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between">
                    <Button
                      className="mr-4"
                      color="info"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      Connect
                    </Button>
                    <Button
                      className="float-right"
                      color="default"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      Message
                    </Button>
                  </div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                       
                      </div>
                    </div>
                  </Row>
                  <div className="text-center">
                    <h3>
                      {this.state.name+' '+this.state.lastName}
                      
                    </h3>
                    
                   
                    <hr className="my-4" />
                    
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">My account</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        Settings
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                       
                        <Col lg="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email address
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              placeholder="jesse@example.com"
                              type="email"
                              defaultValue={this.state.email}
                              onChange={this.handleChange}
                              name="email"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              First name
                            </label>
                            <Input
                              className="form-control-alternative"
                            
                              id="input-first-name"
                              placeholder="First name"
                              type="text"
                              defaultValue={this.state.name}
                              onChange={this.handleChange}
                              name="name"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Last name
                            </label>
                            <Input
                              className="form-control-alternative"
                            
                              id="input-last-name"
                              placeholder="Last name"
                              type="text"
                              defaultValue={this.state.lastName}
                              onChange={this.handleChange}
                              name="lastName"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                  <Button onClick={this.updateSubmit} className="btn-info">Save</Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {this.state.alert.status  ?
              <Alert color={this.state.alert.style}>
                {this.state.alert.text}
              </Alert> : ''  
            }
        <Row>
       
               {this.state.courses.length<=0 ? <div className="col-sm-12 mt-5"><h1 className="text-danger text-center">No tienes cursos</h1></div> 
               : this.state.courses.map((course)=>(
                <Col lg="6" xl="4" key={course.id}>
                  
                  <Card className="mt-2">
                    <CardImg top width="25%" src="https://dev-res.thumbr.io/libraries/25/67/04/lib/1454337646988_1.jpg?size=854x493s&ext=jpg" alt="Card image cap" />
                    <CardBody>
                      <CardTitle>{course.name}</CardTitle>
                      <CardSubtitle>{course.schedule}</CardSubtitle>
                      <Button onClick={()=>{this.suscribeCourse(course.id)}} className="mt-3 btn-success">Ir a Curso</Button>
                    </CardBody>
                  </Card>
                </Col>
               ))}
              </Row>    
        </Container>
      </>
    );
  }
}

export default Profile;
