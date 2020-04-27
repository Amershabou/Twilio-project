import React from "react";
import { render } from "react-dom";
import { Form, Button, Col } from "react-bootstrap";
import $ from "jquery";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "John",
      lastName: "Smith",
      phoneNumber: "(XXX) XXX-XXXX",
      email: "example@example.com",
      ageGroup: "",
      currentPatient: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSwitch = this.handleChangeSwitch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  }
  handleChangeSwitch(e) {
    let name = e.target.name;
    let value = !this.state.switch;
    this.setState({
      [name]: value
    });
  }

  handleSubmit() {
    axios.post("/patient", this.state);

  }

  render() {
    return (
      <div>
        <div className="container-fluid text-center">
          <div className="name">
            {" "}
            <h1 className="p-3 mb-2 bg-white text-success ">
              <i className="fas fa-hospital logo"></i> Levant Medical Center
            </h1>
          </div>{" "}
        </div>

        <div className="paragraph">
          <h2>COVID-19 Patient Follow-Up Form</h2>
          <p>
            Dear Levant Medical Center's patients, <br></br> <br></br>
            In order to protect our patients and staff against the Coronavirus
            and because physical distancing is so crucial to slowing the spread
            of the virus, we have implemented remote appointment options which
            allow you to continue to manage your health and see your doctor, but
            you can do it safely from the comfort of your own home. Please fill
            out the form below. As soon as we receive your information, we will
            send an SMS to your phone so you can chat with us and share updates
            about your symptoms and/or you family members' symptoms. Based on
            your answers, if we determine that your situation prompts medical
            attention, we will go ahead and schedule you for a virtual
            appointment with one of our doctors.
          </p>
        </div>
        <div className="container-fluid text-center form">
          <Form onSubmit={this.handleSubmit}>
            <Form.Row>
              <Col>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.firstName}
                  placeholder={this.state.firstName}
                  name="firstName"
                  onChange={this.handleChange}
                />
              </Col>
              <Col>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.lastName}
                  placeholder={this.state.lastName}
                  name="lastName"
                  onChange={this.handleChange}
                />
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.phoneNumber}
                  placeholder={this.state.phoneNumber}
                  name="phoneNumber"
                  onChange={this.handleChange}
                />
              </Col>
              <Col>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.email}
                  placeholder={this.state.email}
                  name="email"
                  onChange={this.handleChange}
                />
              </Col>
            </Form.Row>
            <Form.Row></Form.Row>
            <Form.Row>
              <Col>
                <Form.Label>Your Age Group</Form.Label>
                <Form.Control
                  as="select"
                  value={this.state.ageGroup}
                  name="ageGroup"
                  onChange={this.handleChange}
                  custom
                >
                  <option></option>
                  <option>0 - 19</option>
                  <option>20 - 39</option>
                  <option>40 - 59</option>
                  <option>60 - 89</option>
                  <option>90 - 109</option>
                </Form.Control>
              </Col>
              <Col>
                <Form.Label>
                  Have you ever been to our facility before?
                </Form.Label>
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label="Yes"
                  value={this.state.currentPatient}
                  name="currentPatient"
                  onChange={this.handleChangeSwitch}
                />
              </Col>
            </Form.Row>
            <Button clessName="button" variant="primary" type="submit" block>
              Submit
            </Button>
          </Form>
        </div>
        <div className="steps ">
          <h3>Steps to help prevent the spread of COVID-19 if you are sick</h3>
          <p className="item">
            {" "}
            <i className="fas fa-bed "></i> Stay home except to get medical care
          </p>
          <p className="item">
            <i className="fas fa-head-side-mask "></i> If you are sick wear a
            facemask in the following situations, if available.
          </p>
          <p className="item">
            <i className="fas fa-head-side-cough-slash "></i> Cover your coughs
            and sneezes
          </p>
          <p className="item">
            {" "}
            <i className="fas fa-hands-wash "></i> Clean your hands often
          </p>
          <p className="item">
            <i className="fas fa-handshake-slash "></i> Avoid Handshakes
          </p>
        </div>
      </div>
    );
  }
}

render(<App />, document.getElementById("app"));
