//  Converts a value from one range into another
//       (maxNewRange - minNewRange)(originalValue - minOriginalRange)
//   y = -------------------------------------------------------------- + minNewRange
//               (maxOriginalRange - minOriginalRange)

export default function scaleValue(input: number, inputRangeMin: number, inputRangeMax: number, outputRangeMin: number, outputRangeMax: number): number {
    const inputValue = Math.max(Math.min(input, inputRangeMax), inputRangeMin);
    const outputRangeDiff = outputRangeMax - outputRangeMin;
    const inputRangeDiff = inputRangeMax - inputRangeMin;

    return outputRangeMin + (((outputRangeDiff) * (inputValue - inputRangeMin)) / (inputRangeDiff));
}