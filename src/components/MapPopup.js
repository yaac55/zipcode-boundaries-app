import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

const MapPopup = ({ map, feature, lngLat }) => {
    const popupRef = useRef(null);

    useEffect(() => {
        if (map && feature && lngLat) {
            const { city, state } = feature.properties || 'Unknown city and state';

            popupRef.current = new mapboxgl.Popup({ closeOnClick: true })
                .setLngLat(lngLat)
                .setHTML(`<h4>${city}, ${state}</h4>`)
                .addTo(map);

            return () => {
                if (popupRef.current) {
                    popupRef.current.remove();
                    popupRef.current = null;
                }
            };
        }
    }, [map, feature, lngLat]);

    return null;
};

export default MapPopup;
