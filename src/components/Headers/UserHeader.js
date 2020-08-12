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
import { Container, Row, Col } from "reactstrap";

import {CustomAxios} from '../../axiosUtils';

class UserHeader extends React.Component {

  constructor(props) {
    super(props);
     this.state = {
       name:'',
       lastName:'', 
       email:'',
       courses:[]
     }
  }

  getStudent=async()=>{
    try {
      const identity=JSON.parse(localStorage.getItem('identity'));
      if(!identity) return false;
      const student = await CustomAxios(process.env.REACT_APP_PUBLIC_URL+'/student/'+identity.id,{},'get')

      console.log(student.data.student.name);
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

  componentDidMount(){
    this.getStudent()
   
   
  }
  render() {
    return (
      <>
        <div
          className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
          style={{
            minHeight: "600px",
            backgroundImage:
              "url(" + require("assets/img/theme/profile-cover.jpg") + ")",
            backgroundSize: "cover",
            backgroundPosition: "center top"
          }}
        >
          {/* Mask */}
          <span className="mask bg-gradient-default opacity-8" />
          {/* Header container */}
          <Container className="d-flex align-items-center" fluid>
            <Row>
              <Col lg="7" md="10">
                <h1 className="display-2 text-white">Welcome {this.state.name}</h1>
           
              </Col>
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default UserHeader;
