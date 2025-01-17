import React, { useState, useEffect } from "react";
import Props from "../components/Card";
import { useAppContext } from "../../utils/AppContext";
import { Row, Col, Button, Input } from "reactstrap";
import { Link, withRouter } from 'react-router-dom';
import "./Services.css";


const services = [

  {
    name: "Basic Pawsome Stay",
    image: "assets/images/furry.jpg",
    description:
      <ul services-list-info-list="true">
        <li>Overnight pawsome stay</li>
        <li>3-Meals-Provided! Bone Appetit!</li>
        <li>Daily trips to a pawsome park!</li>
        <li>Basic doggie bath</li>
        <li>Oppawtunity to play with same size dogs</li>
        <li>Gourmet treats included! Bon A-pet-treat!</li>
        <li>
          We will be your puparazzi! Pictures and unlimited videos sent to you
          daily
        </li>
      </ul>,
    price: 5,
    id: 1,
  },

  {
    name: "Premium Pawsome Stay",
    image: "/assets/images/furry2.jpg",
    description:
      <ul services-list-info-list="true">
        <li>Overnight pawsome stay</li>
        <li>3-Gourmet-Meals! Bone Appetit!</li>
        <li>Daily trips to a pawsome park!</li>
        <li>Doggie bath & nail trim</li>
        <li>Oppawtunity to play with same size dogs</li>
        <li>Gourmet treats included! Bon A-pet-treat!</li>
        <li>
          We will be your puparazzi! Pictures and unlimited videos sent to you
          daily
        </li>
      </ul>,
    price: 10,
    id: 2,
  },
  {
    name: "Deluxe Pawsome Stay",
    image: '/assets/images/furry3.jpg',
    description:
      <ul services-list-info-list="true">
        <li>Overnight pawsome stay</li>
        <li>3-Gourmet-Meals! Bone Appetit!</li>
        <li>Daily trips to a pawsome park!</li>
        <li>Full grooming service</li>
        <li>Oppawtunity to play with same size dogs</li>
        <li>Gourmet treats included! Bon A-pet-treat!</li>
        <li>
          We will be your puparazzi! Puppy cam available 24/7 through our app!
        </li>
      </ul>,
    price: 15,
    id: 3,
  },
];

function Display(props) {
  //Using context
  const appCtx = useAppContext()

  //Setting state for the service options
  const [serviceUpdate, setServiceUpdate] = useState(null);
  const serviceUpdateUpdate = service => {
    console.log('service', service);
    if (props.match.path === "/Reservation") {
      if (props.onChangeService) {
        props.onChangeService(service)
      }
    }
    setServiceUpdate(service.name)
  }

  //Setting up state for context for adding pet name
  const [formData, setFormData] = useState({ name: "" })
  const [renderReady, setRenderReady] = useState(false)
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    let petClone = { ...appCtx.appState.pet, ...formData }
    appCtx.setAppState({ ...appCtx.appState, pet: petClone })
  }
  useEffect(() => {
    // Set the form data state to mirror what’s in state for the pet
    setFormData(appCtx.appState.pet)
    setRenderReady(true)
  }, [appCtx.appState.pet])

  return (
    <div>
      <>
        {renderReady === true && (
          <>
            <form sm="12" md="4" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label>Your furry's name</label>
                <input type="text" name="name" className="form-control" value={formData.name} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <button type="submit" className="submit-furry">Save Furry's name</button>
              </div>
            </form>
            <h2>Your reservation for: {appCtx.appState.pet.name}</h2>
            <Row>
              {services.map((service, i) => (
                <Col key={i} sm="12" md="4">
                  <Props
                    name={service.name}
                    image={service.image}
                    description={service.description}
                    price={service.price}
                  />
                  <Input
                    onChange={() => serviceUpdateUpdate(service)}
                    checked={serviceUpdate === (service.name)}
                    className="form-check-input"
                    type="checkbox"
                    value={service.name}
                  />
                </Col>
              ))}
            </Row>
            <h3>{serviceUpdate}</h3>
            {props.match.path === "/Services" ? <Link underline="none" to={"/reservation"}>
              <Button className="reservation text-center"> Ready? Click here to make a reservation! </Button>
            </Link> : null}
          </>
        )}
      </>
    </div>
  );
}

export default withRouter(Display)