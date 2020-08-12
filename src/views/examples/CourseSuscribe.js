import React,{Component} from 'react';
import {CustomAxios} from '../../axiosUtils';

import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Container, Row, Table
  } from 'reactstrap';

  import Header from "components/Headers/Header.js";

class CourseSuscribe extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name:'',
            schedule:'',
            students:[]
         }
    }

    getCourse=async()=>{
       
        let id=this.props.match.params.id;
        try {
            const res= await CustomAxios(process.env.REACT_APP_PUBLIC_URL+'/course/'+id,this.state.form,'get');
            if(res.data.message){
              
            }else{
              console.log(res.data.course);
              this.setState({ 
                name:res.data.course.name,
                schedule:res.data.course.schedule,
                students:res.data.course.students
              })
            }
           
          } catch (error) {
            console.log(error);
          }
    }

    componentDidMount(){
        this.getCourse()
    }
    render() { 
        return ( 
            
             
            <div>
                 <Header />
                 <Container className="mt-5" fluid>
                     <Row>
                        <Card>

                            <CardImg top width="100%" src="https://dev-res.thumbr.io/libraries/25/67/04/lib/1454337646988_1.jpg?size=854x493s&ext=jpg" alt="Card image cap" />
                            <CardBody>
                                <CardTitle>{this.state.name}</CardTitle>
                                <CardSubtitle>{this.state.schedule}</CardSubtitle>
                                <CardText>.</CardText>
                                
                            </CardBody>
                        </Card>
                     </Row>
                     <Row>
                         <h1 className="mt-5">Estudiantes que toman este curso</h1>
                         <Table dark>
      <thead>
        <tr>
          
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
        </tr>
      </thead>
     
          {this.state.students.length<=0 ? 
         null
          : this.state.students.map((student)=>(
               <tbody key={student.id}>
              <tr >
              
              <td>{student.name}</td>
              <td>{student.lastName}</td>
              <td>{student.email}</td>
            </tr>
             </tbody>
          ))}   
     
    </Table>
                     </Row>
                 </Container>
              
            </div>
         );
    }
}
 
export default CourseSuscribe;