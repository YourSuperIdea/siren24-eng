import React, { useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Image } from "react-native";
import carImageIcon from "../../assets/images/no_riders.png";
import AIR from "../../assets/images/AIR.png";
import ALS from "../../assets/images/ALS.png";
import BLS from "../../assets/images/BLS.png";

const ICONS = {
  "BLS AMBULANCE": BLS,  
  "AIR AMBULANCE ": AIR,
  ACLS: ALS,
};

export default function MapComponent(props) {
  const [state, setState] = useState({
    marginBottom: 0,
  });  
  const { mapRegion, mapStyle, nearby, onRegionChangeComplete, onPanDrag } =
    props;
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      // showsUserLocation={true}
      loadingEnabled
      showsMyLocationButton={false}
      style={[mapStyle, { marginBottom: state.marginBottom }]}
      region={mapRegion}
      onRegionChangeComplete={onRegionChangeComplete}
      onPanDrag={onPanDrag}
      onMapReady={() => setState({ ...state, marginBottom: 1 })}
    >
      {nearby
        ? nearby.map((item, index) => {
            return (
              <Marker.Animated
                coordinate={{
                  latitude: item.location ? item.location.lat : 0.0,
                  longitude: item.location ? item.location.lng : 0.0,
                }}
                key={index}
              >
                <Image
                  source={ICONS[item?.carType] || carImageIcon}
                  style={{ height: 40, width: 40 }}
                />
              </Marker.Animated>
            );
          })
        : null}
    </MapView>
  );
}
