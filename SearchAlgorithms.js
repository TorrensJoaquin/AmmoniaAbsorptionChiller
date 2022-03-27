function RegretionByPoints( ValueX, ArrayX, ArrayY){
    // Find the y value of an array of x and y values.
    // The x function must be an ever-growing function. (We will be using a binary search)
    // Duplicated values of ArrayX will cause an error.
    let Initial = 0;
    let Final = ArrayX.length - 1;
    let RangeOfTheBinarySearch = Final;
    let Middle = Math.round(RangeOfTheBinarySearch/2);
    let MinimumErrorFound = 999999;
    let PositionX;
    let aux;
    for(let i=0; i < 255; i++){
        if(RangeOfTheBinarySearch < 4){
            i = 255;
        }else{
            if(ValueX > ArrayX[Middle]){
                Initial = Middle;
            }else{
                Final = Middle;
            }
            RangeOfTheBinarySearch = Final - Initial;
            Middle = Math.round(RangeOfTheBinarySearch/2) + Initial;
        }
    }
    for(let i = Initial; i <= Final; i++){
        aux = Math.abs(ValueX - ArrayX[i]);
        if(aux < MinimumErrorFound){
            PositionX = i;
            MinimumErrorFound = aux;
        }
    }
    let dy = ArrayY[PositionX + 1] - ArrayY[PositionX];
    let dx = ArrayX[PositionX + 1] - ArrayX[PositionX];
    let DeltaX = ValueX - ArrayX[PositionX];
    // y0 + dy/dx * DeltaX
    let result;
    if (dy != 0){
        result = ArrayY[PositionX] + dy/dx*DeltaX;
    }else{
        result = ArrayY[PositionX];
    }
    return result;
}
function FindClosestPosition(ValueX, ArrayX){
    // Find the position of the closest element in the array, smaller than the selected value.
    // The x function must be an ever-growing function. (We will be using a binary search)
    // Duplicated values of ArrayX will cause an error.
    let Initial = 0;
    let Final = ArrayX.length;
    let RangeOfTheBinarySearch = Final;
    let Middle = Math.round(RangeOfTheBinarySearch/2);
    let MinimumErrorFound = 999999;
    let PositionX;
    let aux;
    for(let i=0; i < 255; i++){
        if(RangeOfTheBinarySearch < 4){
            i = 255;
        }else{
            if(ValueX > ArrayX[Middle]){
                Initial = Middle;
            }else{
                Final = Middle;
            }
            RangeOfTheBinarySearch = Final - Initial;
            Middle = Math.round(RangeOfTheBinarySearch/2) + Initial;
        }
    }
    for(let i = Initial; i <= Final; i++){
        aux = Math.abs(ValueX - ArrayX[i]);
        if(aux < MinimumErrorFound){
            PositionX = i;
            MinimumErrorFound = aux;
        }
    }
    return PositionX;
}
function FindClosestPositions(ValueX, ArrayX){
    // Find the two positions, closer to the element in the array.
    // The x function must be an ever-growing function. (We will be using a binary search)
    // Duplicated values of ArrayX will cause an error.
    let Initial = 0;
    let Final = ArrayX.length - 1;
    let RangeOfTheBinarySearch = Final;
    let Middle = Math.round(RangeOfTheBinarySearch/2);
    let MinimumErrorFound = 999999;
    let PositionX;
    let aux;
    for(let i=0; i < 255; i++){
        if(RangeOfTheBinarySearch < 4){
            i = 255;
        }else{
            if(ValueX > ArrayX[Middle]){
                Initial = Middle;
            }else{
                Final = Middle;
            }
            RangeOfTheBinarySearch = Final - Initial;
            Middle = Math.round(RangeOfTheBinarySearch/2) + Initial;
        }
    }
    for(let i = Initial; i <= Final; i++){
        aux = Math.abs(ValueX - ArrayX[i]);
        if(aux < MinimumErrorFound && ValueX >= ArrayX[i]){
            PositionX = i;
            MinimumErrorFound = aux;
        }
    }
    if(PositionX + 1 <= ArrayX.length - 1){
        return [PositionX, PositionX+1];
    }else{
        return [PositionX-1, PositionX];
    }
}