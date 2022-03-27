let aux;
let Background = [];
let OverTheMouse = new AqNH3Solution();
let AbsorptionChiller = {
    Condenser: {
        Presion:{
            Value:0,
            Screen:0
        },
        Temperatura:{
            Value:0,
            Screen:0
        },
        Composicion:{
            Molar:0,
            Weight:0
        },
        Circle:{
            IsIncreasing:true,
            Size:0,
            Speed:0.1,
            X:0,
            Y:0
        }
    },
    Generator:{
        Presion:{
            Value:0,
            Screen:0
        },
        Temperatura:{
            Value:0,
            Screen:0
        },
        Composicion:{
            Molar:0,
            Weight:0
        },
        Circle:{
            IsIncreasing:true,
            Size:0,
            Speed:0.1,
            X:0,
            Y:0
        }
    },
    GeneratorInput:{
        Presion:{
            Value:0,
            Screen:0
        },
        Temperatura:{
            Value:0,
            Screen:0
        },
        Composicion:{
            Molar:0,
            Weight:0
        },
        Circle:{
            IsIncreasing:true,
            Size:0,
            Speed:0.1,
            X:0,
            Y:0
        }
    },
    Evaporator:{
        Presion:{
            Value:0,
            Screen:0
        },
        Temperatura:{
            Value:0,
            Screen:0
        },
        Composicion:{
            Molar:0,
            Weight:0
        },
        Circle:{
            IsIncreasing:true,
            Size:0,
            Speed:0.1,
            X:0,
            Y:0
        }
    },
    Absorber:{
        Presion:{
            Value:0,
            Screen:0
        },
        Temperatura:{
            Value:0,
            Screen:0
        },
        Composicion:{
            Molar:0,
            Weight:0
        },
        Circle:{
            IsIncreasing:true,
            Size:0,
            Speed:0.1,
            X:0,
            Y:0
        }
    },
    AbsorberInput:{
        Presion:{
            Value:0,
            Screen:0
        },
        Temperatura:{
            Value:0,
            Screen:0
        },
        Composicion:{
            Molar:0,
            Weight:0
        },
        Circle:{
            IsIncreasing:true,
            Size:0,
            Speed:0.1,
            X:0,
            Y:0
        }
    }
}
let Screen = {
    XCanvas: 1360,
    YCanvas: 768,
    Xmin: 0,
    Xmax: 1360,
    Ymin: 92,
    Ymax: 768,
    pressMin: 0,         //kPa
    pressMax: 9,        //kPa
    pressMinSP: 0,       //kPa
    pressMaxSP: 9,      //kPa
    pressVelMax: 0.1,
    tempMin: 0,          //°C
    tempMax: 90,        //°C
    tempMinSP: 0,        //°C
    tempMaxSP: 90,      //°C
    tempVelMax: 0.3,
    SelectedHumidity: 0
}
function preload(){
    Background[0] = loadImage('Images/Background.png');
}
function setup(){
    createCanvas(Screen.XCanvas, Screen.YCanvas);
    CreateTheXInputs();
}
function draw(){
    image(Background[0], 0, 0);
    MoveToTheRequestedRange();
    UpdateAbsorptionChiller();
    DrawSaturationLine();
    DrawIsoConcentrationsLines();
    // Draw The Operation Lines
    push();
        stroke(0,0,255);
        strokeWeight((AbsorptionChiller.GeneratorInput.Circle.Size + AbsorptionChiller.Condenser.Circle.Size)*0.25);
        line(AbsorptionChiller.GeneratorInput.Circle.X,AbsorptionChiller.GeneratorInput.Circle.Y,AbsorptionChiller.Condenser.Circle.X,AbsorptionChiller.Condenser.Circle.Y);
        line(AbsorptionChiller.Evaporator.Circle.X,AbsorptionChiller.Evaporator.Circle.Y,AbsorptionChiller.Absorber.Circle.X,AbsorptionChiller.Absorber.Circle.Y);
        DrawConcentrationsLine(AbsorptionChiller.Evaporator.Composicion, AbsorptionChiller.Evaporator.Temperatura,AbsorptionChiller.Condenser.Temperatura);
    pop();
    push();
        stroke(0,255,0);
        strokeWeight((AbsorptionChiller.GeneratorInput.Circle.Size + AbsorptionChiller.Generator.Circle.Size)*0.25);
        DrawConcentrationsLine(AbsorptionChiller.GeneratorInput.Composicion, AbsorptionChiller.Absorber.Temperatura, AbsorptionChiller.GeneratorInput.Temperatura);
    pop();
    push();
        stroke(255,0,0);
        strokeWeight((AbsorptionChiller.GeneratorInput.Circle.Size + AbsorptionChiller.Generator.Circle.Size)*0.25);
        line(AbsorptionChiller.GeneratorInput.Circle.X,AbsorptionChiller.GeneratorInput.Circle.Y,AbsorptionChiller.Generator.Circle.X,AbsorptionChiller.Generator.Circle.Y);
        line(AbsorptionChiller.AbsorberInput.Circle.X,AbsorptionChiller.AbsorberInput.Circle.Y,AbsorptionChiller.Absorber.Circle.X,AbsorptionChiller.Absorber.Circle.Y);
        DrawConcentrationsLine(AbsorptionChiller.AbsorberInput.Composicion, AbsorptionChiller.AbsorberInput.Temperatura, AbsorptionChiller.Generator.Temperatura);
    pop();
    // Draw the Equipment Points
    DrawTheBeatingCircle(AbsorptionChiller.Absorber.Circle, 10);
    DrawTheBeatingCircle(AbsorptionChiller.Evaporator.Circle, 10);
    DrawTheBeatingCircle(AbsorptionChiller.Generator.Circle, 10);
    DrawTheBeatingCircle(AbsorptionChiller.Condenser.Circle, 10);
    DrawTheBeatingCircle(AbsorptionChiller.GeneratorInput.Circle, 10);
    DrawTheBeatingCircle(AbsorptionChiller.AbsorberInput.Circle, 10);
    // Calculate Properties over the mouse.
    OverTheMouse.Temperature = map(mouseX, Screen.Xmin, Screen.Xmax, Screen.tempMin, Screen.tempMax);
    OverTheMouse.Pressure = map(mouseY, Screen.Ymax, Screen.Ymin, Screen.pressMin, Screen.pressMax);
    OverTheMouse.VaporPressure = AqNH3.VaporPressure(OverTheMouse.Temperature, OverTheMouse.Concentration);
    OverTheMouse.Enthalpy = AqNH3.Enthalpy(OverTheMouse.Temperature, OverTheMouse.Concentration);
    // Write Properties over the mouse.
    aux = 115;
    text('Temperature: ' + (OverTheMouse.Temperature).toFixed(1) + ' °C', 10, aux);
    aux += 20;
    text('Pressure: ' + (OverTheMouse.Pressure).toFixed(3) + ' kPa', 10, aux);
    aux += 20;
    text('Vapor Pressure: ' + (OverTheMouse.VaporPressure).toFixed(3) + ' kPa', 10, aux);
    aux += 20;
    text('Concentration: ' + OverTheMouse.Concentration.toFixed(3) + ' %', 10, aux);
    aux += 20;
    text('Enthalpy: ' + (OverTheMouse.Enthalpy).toFixed(2) + ' kJ/kg', 10, aux);
    UploadTheInputs();
    function DrawSaturationLine(){
        push();
        stroke('red');
        strokeWeight(4);
        ResolutionOfDraw = AqNH3.TemperaturesDB.length - 1;
        Old = {
            Temperature: Screen.tempMin,
            Pressure: 0,
            TemperatureScreen: Screen.Xmin,
            PressureScreen: Screen.Ymax,
        };
        New = {
            TemperatureScreen: Screen.Xmin,
            PressureScreen: Screen.Ymax,
        };
        pop();    
    }
    function DrawIsoConcentrationsLines(){
        for (let Concentration = 0; Concentration < 71; Concentration+=10) {
            DrawConcentrationsLine(Concentration, Screen.tempMin, Screen.tempMax);
        }
    }
    function DrawConcentrationsLine(Concentration ,TMin, TMax){
        let ResolutionOfDraw = 80;
        let TemperatureSteps = (TMax - TMin) / ResolutionOfDraw;
        let Old = {
            Temperature: 0,
            Pressure: 0,
            TemperatureScreen: 0,
            PressureScreen: 0,
        };
        let New = {
            TemperatureScreen: 0,
            PressureScreen: 0,
        };
        Old.Temperature = TMin;
        Old.Pressure = AqNH3.VaporPressure(Old.Temperature, Concentration);
        Old.TemperatureScreen = map(Old.Temperature, Screen.tempMin, Screen.tempMax, Screen.Xmin, Screen.Xmax);
        Old.PressureScreen = map(Old.Pressure, Screen.pressMin, Screen.pressMax, Screen.Ymax, Screen.Ymin, true);
        New.TemperatureScreen = Old.TemperatureScreen;
        New.PressureScreen = Old.PressureScreen;
        for (let i = 0; i < ResolutionOfDraw; i++) {
            Old.TemperatureScreen = map(Old.Temperature, Screen.tempMin, Screen.tempMax, Screen.Xmin, Screen.Xmax);
            Old.PressureScreen = map(Old.Pressure, Screen.pressMin, Screen.pressMax, Screen.Ymax, Screen.Ymin, true);
            line(Old.TemperatureScreen, Old.PressureScreen, New.TemperatureScreen, New.PressureScreen, true);
            New.TemperatureScreen = Old.TemperatureScreen;
            New.PressureScreen = Old.PressureScreen;
            Old.Temperature += TemperatureSteps;
            Old.Pressure = AqNH3.VaporPressure(Old.Temperature, Concentration);
        }
    }
    function DrawTheBeatingCircle(Circle, RelativeSaturation){
        push();
        fill(255, 255-RelativeSaturation*255, 255-RelativeSaturation*225);
        if(Circle.IsIncreasing){
            Circle.Size += Circle.Speed;
        }else{
            Circle.Size -= Circle.Speed;
        }
        if(Circle.Size > 8){Circle.IsIncreasing = false}
        if(Circle.Size < 0){Circle.IsIncreasing = true}
        circle(Circle.X, Circle.Y, 10 + Circle.Size * 5 * RelativeSaturation);
        pop();
    }
}
function MoveToTheRequestedRange(){
    if (isNumber(Screen.pressMinSP)) {
        if (Screen.pressMin > Screen.pressMinSP + Screen.pressVelMax) {
            Screen.pressMin = Screen.pressMin - Screen.pressVelMax;
        } else if (Screen.pressMin < Screen.pressMinSP - Screen.pressVelMax) {
            Screen.pressMin = Screen.pressMin + Screen.pressVelMax;
        } else {
            Screen.pressMin = Screen.pressMinSP;
        }
    }
    if (isNumber(Screen.pressMaxSP)) {
        if (Screen.pressMax > Screen.pressMaxSP + Screen.pressVelMax) {
            Screen.pressMax = Screen.pressMax - Screen.pressVelMax;
        } else if (Screen.pressMax < Screen.pressMaxSP - Screen.pressVelMax) {
            Screen.pressMax = Screen.pressMax + Screen.pressVelMax;
        } else {
            Screen.pressMax = Screen.pressMaxSP;
        }
    }
    if (isNumber(Screen.tempMinSP)) {
        if (Screen.tempMin > Screen.tempMinSP + Screen.tempVelMax) {
            Screen.tempMin = Screen.tempMin - Screen.tempVelMax;
        } else if (Screen.tempMin < Screen.tempMinSP - Screen.tempVelMax) {
            Screen.tempMin = Screen.tempMin + Screen.tempVelMax;
        } else {
            Screen.tempMin = Screen.tempMinSP;
        }
    }
    if (isNumber(Screen.tempMaxSP)) {
        if (Screen.tempMax > Screen.tempMaxSP + Screen.tempVelMax) {
            Screen.tempMax = Screen.tempMax - Screen.tempVelMax;
        } else if (Screen.tempMax < Screen.tempMaxSP - Screen.tempVelMax) {
            Screen.tempMax = Screen.tempMax + Screen.tempVelMax;
        } else {
            Screen.tempMax = Screen.tempMaxSP;
        }
    }
    function isNumber(val) {
        return (val >= 0 || val < 0);
    }
}
function UploadTheInputs(){
    Screen.tempMinSP = UpdateComponent(inpMinTemperarure);
    Screen.tempMaxSP = UpdateComponent(inpMaxTemperarure);
    Screen.pressMinSP = UpdateComponent(inpMinPressure);
    Screen.pressMaxSP = UpdateComponent(inpMaxPressure);
}
function UpdateComponent(ComponentOfDOM){
    if (ComponentOfDOM.value() == ''){return 0}
    return parseFloat(ComponentOfDOM.value());
}
function CreateTheXInputs(){
    // DOM Inputs
    inpMinTemperarure = createInput(Screen.tempMinSP.toString());
    inpMinTemperarure.size(30, 15);
    inpMinTemperarure.position(21, 751);
    inpMaxTemperarure = createInput(Screen.tempMaxSP.toString());
    inpMaxTemperarure.size(30, 15);
    inpMaxTemperarure.position(1277, 751);
    inpMinPressure = createInput(Screen.pressMinSP.toString());
    inpMinPressure.size(23, 15);
    inpMinPressure.position(1300, 716);
    inpMaxPressure = createInput(Screen.pressMax.toString());
    inpMaxPressure.size(23, 15);
    inpMaxPressure.position(1300, 109);
}
function FromFtoC(TAsFarenheit){
    return (TAsFarenheit-32)*0.555555555555556;
}
function FrommmHgtokPa(PAsmmHg){
    return PAsmmHg * 0.13331555792561;
}
function UpdateAbsorptionChiller(){
    AbsorptionChiller.Condenser.Presion = 30;
    AbsorptionChiller.Condenser.Composicion = 0;
    AbsorptionChiller.Condenser.Temperatura = AqNH3.VaporTemperature(AbsorptionChiller.Condenser.Presion, AbsorptionChiller.Condenser.Composicion);
    AbsorptionChiller.Condenser.SaturacionRelativa = 0;
    AbsorptionChiller.Condenser.Circle.Y = map(AbsorptionChiller.Condenser.Presion, Screen.pressMin, Screen.pressMax, Screen.Ymax, Screen.Ymin,true);
    AbsorptionChiller.Condenser.Circle.X = map(AbsorptionChiller.Condenser.Temperatura, Screen.tempMin, Screen.tempMax, Screen.Xmin, Screen.Xmax,true);

    AbsorptionChiller.Generator.Presion = 16;
    AbsorptionChiller.Generator.Temperatura = FromFtoC(30);
    AbsorptionChiller.Generator.Circle.Y = map(AbsorptionChiller.Generator.Presion, Screen.pressMin, Screen.pressMax, Screen.Ymax, Screen.Ymin,true);
    AbsorptionChiller.Generator.Circle.X = map(AbsorptionChiller.Generator.Temperatura, Screen.tempMin, Screen.tempMax, Screen.Xmin, Screen.Xmax,true);

    AbsorptionChiller.Evaporator.Temperatura = 0;
    AbsorptionChiller.Evaporator.Composicion = 0;
    AbsorptionChiller.Evaporator.Presion = AqNH3.VaporPressure(AbsorptionChiller.Evaporator.Temperatura, AbsorptionChiller.Evaporator.Composicion);
    AbsorptionChiller.Evaporator.SaturacionRelativa = 0;
    AbsorptionChiller.Evaporator.Circle.Y = map(AbsorptionChiller.Evaporator.Presion, Screen.pressMin, Screen.pressMax, Screen.Ymax, Screen.Ymin,true);
    AbsorptionChiller.Evaporator.Circle.X = map(AbsorptionChiller.Evaporator.Temperatura, Screen.tempMin, Screen.tempMax, Screen.Xmin, Screen.Xmax,true);

    AbsorptionChiller.Absorber.Temperatura = 30;
    AbsorptionChiller.Absorber.Presion = AbsorptionChiller.Evaporator.Presion;
    AbsorptionChiller.Absorber.Circle.Y = map(AbsorptionChiller.Absorber.Presion, Screen.pressMin, Screen.pressMax, Screen.Ymax, Screen.Ymin,true);
    AbsorptionChiller.Absorber.Circle.X = map(AbsorptionChiller.Absorber.Temperatura, Screen.tempMin, Screen.tempMax, Screen.Xmin, Screen.Xmax,true);

    AbsorptionChiller.GeneratorInput.Presion = 16;
    AbsorptionChiller.GeneratorInput.Composicion = AbsorptionChiller.Absorber.Composicion;
    AbsorptionChiller.GeneratorInput.Temperatura = AqNH3.VaporTemperature(AbsorptionChiller.GeneratorInput.Presion, AbsorptionChiller.GeneratorInput.Composicion);
    AbsorptionChiller.GeneratorInput.Circle.Y = map(AbsorptionChiller.GeneratorInput.Presion, Screen.pressMin, Screen.pressMax, Screen.Ymax, Screen.Ymin, true);
    AbsorptionChiller.GeneratorInput.Circle.X = map(AbsorptionChiller.GeneratorInput.Temperatura, Screen.tempMin, Screen.tempMax, Screen.Xmin, Screen.Xmax, true);

    AbsorptionChiller.AbsorberInput.Presion = AbsorptionChiller.Evaporator.Presion;
    AbsorptionChiller.AbsorberInput.Composicion = AbsorptionChiller.Generator.Composicion;
    AbsorptionChiller.AbsorberInput.Temperatura = AqNH3.VaporTemperature(AbsorptionChiller.AbsorberInput.Presion, AbsorptionChiller.AbsorberInput.Composicion);
    AbsorptionChiller.AbsorberInput.Circle.Y = map(AbsorptionChiller.AbsorberInput.Presion, Screen.pressMin, Screen.pressMax, Screen.Ymax, Screen.Ymin,true);
    AbsorptionChiller.AbsorberInput.Circle.X = map(AbsorptionChiller.AbsorberInput.Temperatura, Screen.tempMin, Screen.tempMax, Screen.Xmin, Screen.Xmax,true);
}