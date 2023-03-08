import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

class Map extends Component {
  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'YOUR_API_KEY_HERE' }}
          defaultCenter={{ lat: 10.8231, lng: 106.6297 }}
          defaultZoom={10}
        >
          <Marker lat={10.8231} lng={106.6297} text="Ho Chi Minh City" />
        </GoogleMapReact>
      </div>
    );
  }
}

const Marker = ({ text }) => (
  <div style={{
    color: 'white', 
    background: 'blue',
    padding: '15px 10px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    {text}
  </div>
);

export default Map;