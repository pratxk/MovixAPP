import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';

function CircleProgress({value}) {
  const clampedValue = Math.max(1, Math.min(value, 10));
    // Normalize to percentage (1-10 maps to 0-100)
    const percentage = ((clampedValue - 1) / 9) * 100;
  return (
    <CircularProgress value={percentage} maxValue={10} bg='white' borderRadius='100%' color="green.400">
      <CircularProgressLabel color='Black' bg='transparent'  fontWeight='bold'>{value ? value.toFixed(1) : '0'}</CircularProgressLabel>
    </CircularProgress>
  );
}

export default CircleProgress;