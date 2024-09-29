import { Button, Flex } from '@chakra-ui/react';
import { useContext } from 'react';
import { trendingContext } from '../../Context/TrendingContext';

const ToggleSwitch = ({ onClick, val1, val2 }) => {
  const state  = useContext(trendingContext); // Destructure state from context

  return (
    <Flex
      alignItems="center"
      backgroundColor="transparent"
      border="1px solid"
      borderColor="border-white"
      borderRadius="full"
      boxShadow="inner"
      w="64"
    >
      <Button
        bg={state ? 'white' : 'gray.300'} // Active button white, inactive gray
        color={state ? 'black' : 'white'} // Text color for active/inactive
        borderRadius="full"
        onClick={() => onClick(true)} // Trigger to set state to true
        aria-label={val1}
        flex="1"
        _hover={{ bg: state ? 'gray.200' : 'gray.400' }} // Add hover effect
      >
        {val1}
      </Button>
      <Button
        bg={!state ? 'white' : 'gray.300'} // Active button white, inactive gray
        color={!state ? 'black' : 'white'} // Text color for active/inactive
        borderRadius="full"
        onClick={() => onClick(false)} // Trigger to set state to false
        aria-label={val2}
        flex="1"
        _hover={{ bg: !state ? 'gray.200' : 'gray.400' }} // Add hover effect
      >
        {val2}
      </Button>
    </Flex>
  );
};

export default ToggleSwitch;
