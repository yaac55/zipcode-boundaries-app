import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapPopup from './MapPopup'; 

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

const Map = ({ geoJson }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [popupData, setPopupData] = useState(null);

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-96, 37.8],
      zoom: 3,
    });

    if (geoJson) {
      mapRef.current.on('load', () => {
        mapRef.current.addSource('zipcode-boundary', {
          type: 'geojson',
          data: geoJson,
        });

        mapRef.current.addLayer({
          id: 'zipcode-boundary-layer',
          type: 'fill',
          source: 'zipcode-boundary',
          layout: {},
          paint: {
            'fill-color': '#088',
            'fill-opacity': 0.4,
          },
        });

        const coordinates = geoJson.features[0].geometry.coordinates[0];
        const bounds = coordinates.reduce(
          (bounds, coord) => bounds.extend(coord),
          new mapboxgl.LngLatBounds(coordinates[0], coordinates[0])
        );
        mapRef.current.fitBounds(bounds, { padding: 50 });

        mapRef.current.on('mouseenter', 'zipcode-boundary-layer', (e) => {
          mapRef.current.getCanvas().style.cursor = 'pointer';

          const feature = e.features[0];
          const lngLat = e.lngLat;

          setPopupData({ feature, lngLat });
        });

        mapRef.current.on('mouseleave', 'zipcode-boundary-layer', () => {
          mapRef.current.getCanvas().style.cursor = '';
          setPopupData(null); 
        });
      });
    }

    return () => mapRef.current.remove();
  }, [geoJson]);

  return (
    <div ref={mapContainerRef} style={{ width: '100%', height: '100vh' }}>
      {popupData && <MapPopup map={mapRef.current} feature={popupData.feature} lngLat={popupData.lngLat} />}
    </div>
  );
};

export default Map;
