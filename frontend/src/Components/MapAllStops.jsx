import React, { useState } from "react";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow} from '@react-google-maps/api';
import { useGeolocated } from "react-geolocated"
import stopsData from "../data/stops.json"
import stopIcon from "../../src/data/bus_stop.png"
import CurrentLocationIcon from "../../src/data/current_location.png"


const containerStyle = {
  width: '100%',
  height: '800px',
  position: 'relative',  
  display: 'flex'
};

const MapAllStops= ({ coordinates, selectedStop, setSelectedStop }) => {
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAPFUKh9yhgAoe5r0bcJ2CXyLZM2MBKMVU"
  })
  console.log("All Stops:",stopsData)
  
  const {
    coords,
    } = useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    })

    
  // State to Mouseover a stop
  const [hoverStop, setHoverStop] = useState("")

  return isLoaded ? ( 
    
    <GoogleMap
        mapContainerStyle={containerStyle}
        center={ coordinates }
        zoom={14}  
      >
        { /* Child components, such as markers, info windows, etc. */ }
        
        {/* Displaying User or Device Position on Maps  */}
        {coords&&
          <Marker
            position={{
              lat: coords.latitude,
              lng: coords.longitude
            }}
            icon={{
              url: CurrentLocationIcon,
              scaledSize: new window.google.maps.Size(50, 50)
            }}  
          />
        }

        {/* Dispaly all stops' markers */}
        {stopsData.RECORDS.map(stop => (
            <Marker
              key={stop.stop_id}
              position={{
                lat: stop.stop_lat,
                lng: stop.stop_lon
              }}
              onMouseOver={() => {
                setHoverStop(stop);
                console.log("Hover Stop:",stop) 
              }}
              onClick={() => {
                setSelectedStop(stop);
                console.log("Selected Stop:",stop) 
              }}
              icon={{
                url: stopIcon,
                scaledSize: new window.google.maps.Size(15, 15)
              }}                
            />                  
          ))}

        {/* Display the selected stop in that line */}
        {selectedStop&&
            <Marker
              position={{
                lat: selectedStop['stop_lat'],
                lng: selectedStop['stop_lon']
              }}
              onMouseOver={() => {
                setHoverStop(selectedStop);
                console.log("Hover Stop:",selectedStop) 
              }}
              onClick={() => {
                setSelectedStop(selectedStop);
                console.log("Selected stop:",selectedStop) 
              }}
              icon={{
                url: stopIcon,
                scaledSize: new window.google.maps.Size(30, 30)
              }}
            />
          }      

        {/*  Display Info windows  */}
        {hoverStop && 
          <InfoWindow
              onCloseClick={() => {
                setHoverStop(null);
                }}
              position={{
                lat: hoverStop.stop_lat+0.00004,
                lng: hoverStop.stop_lon
              }}
              >
              <div>
                <h2>{hoverStop['stop_name']}</h2>
                </div>
          </InfoWindow>
        }
          
      </GoogleMap>



  ) : <></>
}

export default React.memo(MapAllStops) 