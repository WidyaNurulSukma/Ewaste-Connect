import React, { useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import { Box, Button, Input, Text, UnorderedList, ListItem, useToast } from '@chakra-ui/react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { useSelector } from 'react-redux';
import { useAuth } from '../../hooks/auth';
import orderService from '../../services/order.service';

const libraries = ['places'];
const mapContainerStyle = { width: '100%', height: '100%' };
const center = { lat: 0, lng: 0 };

const PickupLocationMap = ({ formData }) => {
  const { getUser } = useAuth();
  const user = JSON.parse(getUser());
  const orderDetails = useSelector(state => state.order);
  const toast = useToast();
  const [selected, setSelected] = useState(center);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries
  });

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setSelected({ lat, lng });
      console.log(selected);
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const handleCreate = async () => {
    const auth = user.accessToken;
    const newOrder = { ...orderDetails, location: selected };
    console.log(newOrder);
    const resp = await orderService.createOrder(newOrder, auth);
    if (resp.status === 201) {
      console.log(resp.data);
      return toast({
        title: ' Pickup requested successfully',
        description: 'We have recived a request to pickup your ewaste',
        isClosable: true,
        duration: 9000,
        status: 'success',
        position: 'top-right'
      });
    }
  };

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  return (
    <Box maxWidth='3xl' mx='auto' mt={10} mb={6}>
      <Box bg='white' borderRadius='lg' boxShadow='md' overflow='hidden'>
        <Box bg='green.400' p={4} color='white'>
          <Text fontWeight='bold' mb={2}>
            Do you know we generate 40 million tons of electronic waste every
            year, worldwide?
          </Text>
          <Text fontSize='sm'>
            That's like throwing 800 laptops every second.
          </Text>
        </Box>

        {selected && (
          <Box bg='green.500' p={4} color='white'>
            <Text fontWeight='bold' mb={5}>
              Location set to {selected.lat}, {selected.lng}
            </Text>
          </Box>
        )}

        <Box p={4}>
          <Box position='relative'>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={!ready}
              placeholder='Enter pick-up point'
              pl={10}
            />
            <SearchIcon position='absolute' left={3} top='50%' transform='translateY(-50%)' color='gray.400' />
          </Box>
          {status === 'OK' && (
            <UnorderedList mt={2} borderWidth={1} borderColor='gray.300' borderRadius='md'>
              {data.map(({ place_id, description }) => (
                <ListItem
                  key={place_id}
                  onClick={() => handleSelect(description)}
                  p={2}
                  _hover={{ bg: 'gray.100' }}
                  cursor='pointer'
                >
                  {description}
                </ListItem>
              ))}
            </UnorderedList>
          )}
        </Box>

        <Box h='64' mx={4} mb={4} borderRadius='lg' overflow='hidden'>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={selected || center}
          >
            {selected && <Marker position={selected} />}
          </GoogleMap>
        </Box>

        <Box p={4}>
          <Button
            onClick={handleCreate}
            width='full'
            colorScheme='green'
          >
            Create
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PickupLocationMap;
