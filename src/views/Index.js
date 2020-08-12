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

// javascipt plugin for creating charts
import Chart from "chart.js";



// reactstrap components
import {
  Button,
  Card,
  CardBody,
  
  Container,
  Row,
  Col,
  CardTitle,
  CardImg,
  CardSubtitle,
  Alert,
  UncontrolledTooltip 
 
} from "reactstrap";

// core components
import {
  chartOptions,
  parseOptions
  
} from "variables/charts.js";


import {CustomAxios} from '../axiosUtils';

import Header from "components/Headers/Header.js";



class Index extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeNav: 1,
      chartExample1Data: "data1",
      data:[],
      alert:{
        status:false,
        text:'',
        style:''
      },
      confirm:false,
      id_c:null
    };
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }
  }
  toggleNavs = (e, index) => {
    e.preventDefault();
    this.setState({
      activeNav: index,
      chartExample1Data:
        this.state.chartExample1Data === "data1" ? "data2" : "data1"
    });
  };

  
  getCourses=async()=>{
    try {
      const res= await CustomAxios(process.env.REACT_APP_PUBLIC_URL+'/course',this.state.form,'get');
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

  suscribeCourse=async(id_course)=>{
   
    
    const identity=JSON.parse(localStorage.getItem('identity'));

    let data={
      id_course:id_course,
      id_student:identity.id
    }
    
    try {
      const res= await CustomAxios(process.env.REACT_APP_PUBLIC_URL+'/course-student',data,'post');
      if(res.data.message){
        if (res.data.message==='Ya estas suscrito a este curso!') {
          this.setState({
            alert:{
              status:true,
              text:res.data.message,
              style:'danger'
            }

          
          })
        }else{
          this.setState({
            alert:{
              status:true,
              text:res.data.message,
              style:'success'
            }

          
          })
        }
       
    }
    } catch (error) {
      console.log(error);
    }
  }

  confirmDelete=async(id)=>{
    try {

     
          const res= await CustomAxios(process.env.REACT_APP_PUBLIC_URL+'/course/'+id,{},'delete');
         
          if(res.data.message){
            
              this.setState({
                alert:{
                  status:true,
                  text:res.data.message,
                  style:'danger'
                }
                
              })
              this.getCourses(); 
          
        }
     
     
    } catch (error) {
      console.log(error);
    }
  }

  deleteCourse=async(id)=>{
    this.setState({
      confirm:true,
      id_c:id
    })
   
  }
  

  componentDidMount(){
    this.getCourses();
  }
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
        {this.state.alert.status  ?
              <Alert color={this.state.alert.style}>
                {this.state.alert.text}
              </Alert> : ''  
            }
        <Row>
               
               {this.state.data.map((course)=>(
                <Col lg="6" xl="4" key={course.id}>
                  <Card className="mt-2">
                  <UncontrolledTooltip placement="right" target="UncontrolledTooltipExample">
                    Eliminar Curso
                  </UncontrolledTooltip>
                  <Button id="UncontrolledTooltipExample" onClick={()=>{this.deleteCourse(course.id)}} className="btn-danger " close />
                  { this.state.confirm && this.state.id_c===course.id ? 
                  <Alert color='danger'>
                    Esta seguro de eliminar el curso?
                    <Button onClick={()=>{this.confirmDelete(course.id)}} className="btn-warning">Si</Button>
                    <Button onClick={()=>{this.setState({confirm:false})}} className="btn-dark">No</Button>
                  </Alert>  : null}
                    <CardImg top width="25%" src="https://dev-res.thumbr.io/libraries/25/67/04/lib/1454337646988_1.jpg?size=854x493s&ext=jpg" alt="Card image cap" />
                    <CardBody>
                      <CardTitle>{course.name}</CardTitle>
                      <CardSubtitle>{course.schedule}</CardSubtitle>
                      <Button onClick={()=>{this.suscribeCourse(course.id)}} className="mt-3 btn-success">Tomar Curso</Button>
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

export default Index;
