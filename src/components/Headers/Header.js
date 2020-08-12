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
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import {CustomAxios} from '../../axiosUtils';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      data:[]
    }
  }

  getCourses=async()=>{
    try {
      const res= await CustomAxios(process.env.REACT_APP_PUBLIC_URL+'/courselimit',this.state.form,'get');
      if(res.data.message){
        
      }else{
        console.log(res);
        this.setState({ 
          data:res.data.courses
        })
      }
     
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount(){
    this.getCourses();
  }
  
  render() {
    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              {/* Card stats */}
              <h1 className="text-center">Cursos con más estudiantes inscritos</h1>
              <Row>
               
                  {this.state.data.map((course)=>(
                     <Col lg="6" xl="3" key={course.id}>
                     <Card className="card-stats mb-4 mb-xl-0">
                        <CardBody>
                          <Row>
                            <div className="col">
                              <CardTitle
                                tag="h5"
                                className="text-uppercase text-muted mb-0"
                              >
                                {course.name}
                              </CardTitle>
                              <span className="h4 font-weight-bold mb-0">
                                Estudiantes:  {course.numbersStudents}
                              </span>
                            </div>
                            <Col className="col-auto">
                              <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                <i className="fas fa-chart-bar" />
                              </div>
                            </Col>
                          </Row>
                          {/* <p className="mt-3 mb-0 text-muted text-sm">
                            <span className="text-success mr-2">
                              <i className="fa fa-arrow-up" /> 3.48%
                            </span>{" "}
                            <span className="text-nowrap">Since last month</span>
                          </p> */}
                        </CardBody>
                        </Card>
                </Col>
                  ))}
                   
               
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
  }
}

export default Header;
