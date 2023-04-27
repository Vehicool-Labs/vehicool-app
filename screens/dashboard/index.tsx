import { Session } from '@supabase/supabase-js';
import { useBackgroundPermissions, useForegroundPermissions } from 'expo-location';
import { useState, useEffect } from 'react';
import MapView, { LatLng, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { Button, Colors, Text, View } from 'react-native-ui-lib';

import { supabase } from '../../config/supabase';
import useLocationObserver from '../../contexts/location/location.observer';
import { startTrackingLocation, stopTrackingLocation } from '../../services/location.service';
import { snapToRoad } from '../../services/map.service';

type DashboardScreenProperties = { session: Session };

const DashboardScreen = ({ session }: DashboardScreenProperties) => {
  const [isTripStarted, setIsTripStarted] = useState(false);
  const [roadWaypoints, setRoadWaypoints] = useState([]);

  const [foregroundPermissionStatus, requestForegroundPermission] = useForegroundPermissions();
  const [backgroundPermissionStatus, requestBackgroundPermission] = useBackgroundPermissions();

  const { locationState } = useLocationObserver();

  const testLatLng: LatLng[] = [
    {
      latitude: 49.136257,
      longitude: 3.487184,
    },
    {
      latitude: 49.136005,
      longitude: 3.486902,
    },
    {
      latitude: 49.13567,
      longitude: 3.486676,
    },
    {
      latitude: 49.135297,
      longitude: 3.48617,
    },
    {
      latitude: 49.134929,
      longitude: 3.485685,
    },
    {
      latitude: 49.134752,
      longitude: 3.485367,
    },
    {
      latitude: 49.134819,
      longitude: 3.485071,
    },
    {
      latitude: 49.134886,
      longitude: 3.484695,
    },
    {
      latitude: 49.134955,
      longitude: 3.484283,
    },
  ];

  useEffect(() => {
    console.log('SESSION', session);
  }, [session]);

  useEffect(() => {
    if (!foregroundPermissionStatus?.granted) {
      requestForegroundPermission();
    }
    if (!backgroundPermissionStatus?.granted) {
      requestBackgroundPermission();
    }
  }, [foregroundPermissionStatus, backgroundPermissionStatus]);

  const handleStartTrackingTrip = () => {
    if (!foregroundPermissionStatus?.granted) {
      requestForegroundPermission();
    }
    if (!backgroundPermissionStatus?.granted) {
      requestBackgroundPermission();
    }
    setIsTripStarted(true);
    startTrackingLocation()
      .then((value) => console.log('TRACKING', value))
      .catch((error) => console.error('TRACKING ERROR', error));
  };

  const handleStopTrackingTrip = async () => {
    await stopTrackingLocation();
    const res = await snapToRoad(testLatLng);
    const waypoints = res.snappedPoints.map((point) => point.location);
    setRoadWaypoints(waypoints);
    setIsTripStarted(false);
  };

  const handleLogout = () => {
    supabase.auth.signOut();
  };

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        followsUserLocation
        style={{ width: '100%', height: '100%' }}>
        {roadWaypoints.length > 0 && (
          <Polyline coordinates={roadWaypoints} strokeColor="blue" strokeWidth={7} />
        )}
      </MapView>
      <View
        style={{
          position: 'absolute',
          bottom: 8,
          left: 8,
          right: 8,
          borderRadius: 32,
          height: 200,
          backgroundColor: '#fff',
          padding: 8,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <Button
          label={isTripStarted ? 'Arrêter le trajet' : 'Démarrer un trajet'}
          onPress={isTripStarted ? handleStopTrackingTrip : handleStartTrackingTrip}
        />
        <Button
          label="Déconnexion"
          borderRadius={8}
          size={Button.sizes.large}
          backgroundColor={Colors.red30}
          onPress={handleLogout}
          style={{
            marginBottom: 8,
          }}
        />
      </View>
    </View>
  );
};

export default DashboardScreen;
