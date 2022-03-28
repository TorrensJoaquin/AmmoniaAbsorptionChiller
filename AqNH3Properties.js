class AqNH3Solution{
    constructor(){
        this.Temperature = 0;
        this.Pressure = 0;
        this.VaporPressure = 0;
        this.MolalConcentration = 0;
        this.WeightConcentration = 0;
        this.Enthalpy = 0;
        this.YComposition = {
            Water:0,
            Ammonia:0
        };
    }
};
let AqNH3 ={
    TemperaturesDB : [0,4.444,10,15.555,21.111,26.666,32.222,37.777,43.333,48.888,54.444,60,65.555,71.111,76.666,82.222,87.777,93.333,98.888,104.444,110,115.555,121.111], // °C
    ConcentrationsDBMolal : [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95], // Mol % of Ammonia
    ConcentrationsDBWeight : [0,4.74,9.50,14.29,19.10,23.94,28.81,33.71,38.64,43.59,48.57,53.58,58.62,63.69,68.79,73.91,79.07,84.26,89.47,94.72], // Mass % of Ammonia
    WaterVaporPressureDB : [
        [0.6205284,0.57915984,0.54468604,0.51021224,0.4826332,0.4481594,0.4136856,0.38610656,0.35163276,0.32405372,0.28957992,0.26200088,0.23442184,0.2068428,0.172369,0.14478996,0.11721092,0.08963188,0.05515808,0.02757904],
        [0.8273712,0.7928974,0.74463408,0.69637076,0.6550022,0.61363364,0.57226508,0.52400176,0.4826332,0.44126464,0.39989608,0.35852752,0.31715896,0.2757904,0.2413166,0.19994804,0.15857948,0.1034214,0.08273712,0.04136856],
        [1.2410568,1.1721092,1.1031616,1.034214,0.9652664,0.8963188,0.8273712,0.7584236,0.689476,0.64810744,0.5860546,0.52400176,0.46884368,0.40679084,0.35163276,0.28957992,0.23442184,0.172369,0.11721092,0.05515808],
        [1.7926376,1.6547424,1.5857948,1.4478996,1.378952,1.3100044,1.1721092,1.1031616,1.034214,0.8963188,0.8273712,0.7584236,0.66879172,0.5860546,0.50331748,0.42058036,0.33784324,0.25510612,0.16547424,0.08273712],
        [2.4821136,2.3442184,2.2063232,2.068428,1.9305328,1.7926376,1.72369,1.5857948,1.4478996,1.3100044,1.1721092,1.034214,0.9652664,0.8273712,0.689476,0.59294936,0.47573844,0.35852752,0.23442184,0.11721092],
        [3.5163276,3.3094848,3.102642,2.8957992,2.757904,2.5510612,2.3442184,2.2063232,1.9994804,1.8615852,1.6547424,1.5168472,1.3100044,1.1721092,0.9652664,0.8273712,0.66189696,0.49642272,0.33094848,0.16547424],
        [4.826332,4.5505416,4.3436988,3.9989608,3.792118,3.5163276,3.2405372,3.0336944,2.757904,2.5510612,2.2752708,2.068428,1.7926376,1.5857948,1.378952,1.1031616,0.8963188,0.689476,0.45505416,0.22752708],
        [6.550022,6.205284,5.860546,5.4468604,5.1021224,4.7573844,4.4126464,4.0679084,3.792118,3.44738,3.102642,2.8268516,2.4821136,2.1373756,1.8615852,1.5168472,1.2410568,0.8963188,0.6205284,0.3102642],
        [8.7563452,8.273712,7.8600264,7.3773932,6.89476,6.4121268,5.9294936,5.515808,5.0331748,4.6194892,4.136856,3.7231704,3.3094848,2.8957992,2.4821136,2.068428,1.6547424,1.2410568,0.8273712,0.42058036],
        [11.6521444,11.031616,10.4110876,9.7905592,9.1700308,8.5495024,7.928974,7.3084456,6.6879172,6.1363364,5.515808,4.9642272,4.4126464,3.8610656,3.3094848,2.757904,2.2063232,1.6547424,1.1031616,0.55847556],
        [15.3063672,14.478996,13.6516248,12.8242536,11.9968824,11.1695112,10.4110876,9.5837164,8.8252928,8.0668692,7.239498,6.550022,5.7915984,5.1021224,4.3436988,3.6542228,2.8957992,2.2063232,1.4478996,0.689476],
        [19.9258564,18.8226948,17.7195332,16.6853192,15.5821576,14.5479436,13.5137296,12.4795156,11.4453016,10.4800352,9.4458212,8.4805548,7.584236,6.6189696,5.6537032,4.7573844,3.792118,2.8268516,1.8615852,0.9652664],
        [25.6485072,24.2006076,22.8216556,21.4427036,20.0637516,18.7537472,17.3747952,16.0647908,14.7547864,13.444782,12.1347776,10.9626684,9.7216116,8.5495024,7.3084456,6.0673888,4.8952796,3.6542228,2.413166,1.2410568],
        [32.6811624,30.8885248,29.0958872,27.3721972,25.5795596,23.8558696,22.2011272,20.4774372,18.8226948,17.1679524,15.51321,13.9274152,12.410568,10.8937208,9.307926,7.7221312,6.205284,4.6194892,3.102642,1.5168472],
        [41.2996124,39.0243416,36.8180184,34.6116952,32.405372,30.1990488,28.0616732,25.85535,23.786922,21.718494,19.5811184,17.6505856,15.7200528,13.7205724,11.7900396,9.7905592,7.7910788,12.755306,3.9300132,2.068428],
        [51.7796476,48.952796,46.1259444,43.436988,40.6101364,37.8522324,35.163276,32.4743196,29.8543108,27.1653544,24.6142932,22.1321796,19.650066,17.2369,14.7547864,12.2037252,9.7905592,7.3084456,,],
        [64.3970584,60.8807308,57.3644032,53.9170232,50.4696432,47.0912108,43.7127784,40.4032936,37.0938088,33.8532716,30.6127344,27.5100924,24.476398,21.373756,18.271114,,,,,],
        [79.4965828,75.152884,70.8091852,66.534434,62.3286304,58.1228268,53.9859708,49.8491148,45.7812064,41.7822456,37.7832848,33.9911668,30.1990488,26.2690356,,,,,,],
        [97.3540112,92.045046,86.7360808,81.4960632,76.3249932,71.1539232,66.1207484,61.0875736,56.0543988,51.1591192,46.2638396,41.6443504,36.8180184,,,,,,,],
        [118.5209244,112.03985,105.6277232,99.2155964,92.9413648,86.6671332,80.4618492,74.3255128,68.258124,62.2596828,56.3301892,50.4006956,,,,,,,,],
        [143.2731128,135.4130864,127.6220076,119.968824,112.3156404,104.7314044,97.2850636,89.8387228,82.5302772,75.2218316,68.0512812,,,,,,,,,],
        [172.1621572,162.716336,153.40841,144.1694316,134.9994008,125.8983176,116.866182,107.9719416,99.1466488,90.4592512,81.7718536,,,,,,,,,],
        [205.6706908,194.432232,183.2627208,172.369,161.2684364,150.4436632,139.61889,129.0009596,118.4519768,108.0408892,,,,,,,,,,]
    ], // Kpa
    AmmoniaVaporPressureDB : [
        [0,1.7926376,3.5852752,6.205284,10.4110876,18.4090092,29.4406252,45.0917304,61.5702068,97.4229588,133.4825536,173.1963712,214.6338788,253.3134824,294.3373044,316.6073792,339.6358776,359.4238388,378.4533764,399.9650276],
        [0,2.2752708,4.5505416,7.8600264,13.2379392,21.7874416,35.3701188,55.0201848,82.5992248,118.1761864,160.8547508,207.877014,256.140334,301.2320644,341.7043056,375.074944,402.0334556,424.8551112,446.5736052,470.9810556],
        [0,3.2405372,6.1363364,10.34214,17.4437428,28.6822016,45.7122588,70.6023424,105.0761424,148.6510256,201.1201492,258.2777096,316.1936936,370.8691404,419.3393032,459.3978588,491.3205976,518.6238472,545.030778,575.022984],
        [0,4.2747512,8.2047644,13.78952,22.1321796,36.9559136,58.4675648,90.0455656,132.034654,185.6069392,249.1766264,317.9863312,387.6234072,453.7441556,510.1432924,557.786084,595.9830544,627.6989504,659.6216892,693.957594],
        [0,5.7226508,10.4800352,17.926376,29.5095728,47.3670012,74.1876176,112.5914308,164.3710784,228.906032,305.09313,388.1060404,471.0500032,547.5818392,615.4262776,671.6875192,717.1239876,755.320958,791.7252908,831.5770036],
        [0,7.1705504,13.6516248,23.0284984,37.576442,59.9154644,93.2171552,139.8946804,202.705944,280.5477844,371.2138784,468.6368372,567.8524336,658.5874752,738.1530056,802.6879592,856.329192,900.2488132,940.100526,990.777012],
        [0,9.3768736,17.3747952,29.30273,47.4359488,75.0839364,115.5561776,172.6447904,247.7976744,340.945882,448.0904524,562.6813636,678.099646,784.5547404,877.1513672,952.7179368,1013.6676152,1064.9646296,1115.1584824,1170.2476148],
        [0,11.8589872,22.063232,36.8180184,59.294936,93.2861028,142.5836368,210.7728132,300.4046932,410.1692724,536.757066,670.6533052,805.3769156,928.724172,1035.7997948,1123.4321944,1194.3103272,1254.6394772,1310.9007188,1373.2293492],
        [0,14.7547864,27.57904,45.850154,73.3602464,114.797754,173.8168996,255.1750676,361.4922668,490.906912,638.3858284,794.0005616,948.8568712,1092.2678792,1214.7188168,1315.864946,1399.7741752,1466.5843996,1532.1535672,1605.0311804],
        [0,18.4090092,34.129062,56.6059796,90.2524084,139.963628,210.5659704,307.2305056,431.7498712,582.1935344,754.286744,934.1020848,1113.0900544,1276.4958664,1419.0105556,1532.5672528,1627.508098,1703.9709864,1780.5028224,1861.7230952],
        [0,22.6148128,41.9890884,69.292338,109.8335268,169.4732008,253.3134824,366.5254416,512.0738252,687.3386244,885.631922,1092.474722,1297.3180416,1483.3386664,1645.779212,1777.9517612,1881.4421088,1972.4529408,2057.8100696,2149.786168],
        [0,27.3721972,51.0901716,84.1850196,132.5862348,202.9127868,301.7836452,434.1630372,603.4983428,804.7563872,1033.7313668,1269.8079492,1504.2987368,1714.726812,1898.3342708,2048.5710912,2168.057282,2268.3070924,2364.4200468,2471.4956696],
        [0,32.9569528,61.5012592,101.352972,159.2000084,241.9371284,357.9069916,512.1427728,706.7818476,938.721574,1197.2061264,1467.9633516,1732.2395024,1971.90136,2180.3989024,2349.8721032,2484.8025564,2596.3597732,2705.848562,2824.2315912],
        [0,39.1622368,73.773932,121.1409332,189.261162,286.5462256,420.7872028,599.2235916,823.0275012,1087.3725996,1382.054642,1689.0783048,1988.3108888,2260.2402232,2494.17943,2682.6132208,2835.814788,2962.8852148,3084.370886,3215.5781688],
        [0,46.53963,87.3566092,143.755746,223.4591716,337.0848164,492.8374448,696.9912884,953.545308,1254.501582,1588.2769136,1934.2559704,2271.2718392,2575.9512836,2837.8142684,3049.4144528,3217.5776492,3363.608666,3499.9870188,3643.88066],
        [0,54.468604,103.1456096,169.3353056,262.8971988,394.3113244,572.7477132,806.4800772,1098.8179012,1438.6606216,1816.2866268,2205.5647764,2580.36393,2924.067716,3214.7507976,3451.7236988,3640.9848608,3800.6675024,,],
        [0,63.6386348,121.003038,198.4311928,306.7478724,458.4325924,663.4138072,930.0341764,1259.8105472,1643.6418364,2067.4627336,2503.5563036,2924.412454,3305.347944,3627.677974,,,,,],
        [0,73.773932,140.997842,230.9055124,355.6317208,530.207044,764.284146,1065.7920008,1437.9711456,1868.0662744,2344.3562952,2828.0237092,3299.9700312,3721.7225004,,,,,,],
        [0,84.5297576,163.2679168,267.2408976,411.272434,610.0483648,874.4624108,1215.1325024,1633.8512772,2117.2429008,2647.5188924,3187.8612336,3706.3471856,,,,,,,],
        [0,96.6645352,187.192734,307.5752436,471.8084268,698.0255024,997.9475624,1382.1235896,1849.864108,2386.0695932,2974.6063068,3572.7956844,,,,,,,,],
        [0,109.971422,214.3580884,352.0464456,538.7565464,796.000042,1131.9127492,1562.8352492,2085.8717428,2684.0611204,3333.8233028,,,,,,,,,],
        [0,123.5540992,244.074504,399.89608,613.7715352,902.7998744,1280.9774604,1759.9564376,2342.2878672,3004.5985128,3726.2040944,,,,,,,,,],
        [0,138.7225712,276.4109284,453.2615224,694.2333844,1018.0802616,1443.5559012,1978.0376964,2622.9045992,3355.8865348,,,,,,,,,,]
    ], // Kpa
    MolalPercentOfWaterDB :[
        [100,24.3,13.2,7.63,4.43,2.5,1.43,0.856,0.514,0.335,0.216,0.151,0.109,0.0816,0.0585,0.0457,0.0345,0.0249,0.0146,0.00689],
        [100,25.3,14.1,8.15,4.73,2.74,1.59,0.943,0.581,0.372,0.248,0.172,0.124,0.0914,0.0706,0.0533,0.0395,0.0243,0.0185,0.00879],
        [100,26.6,15.2,9.09,5.24,3.03,1.78,1060,0.652,0.434,0.29,0.202,0.148,0.1095,0.0838,0.063,0.0477,0.0332,0.0215,0.00959],
        [100,27.9,16.2,9.5,5.69,3.42,1.97,1210,0.777,0.481,0.331,0.238,0.172,0.129,0.0986,0.0754,0.0566,0.0406,0.0251,0.01125],
        [100,29.1,17.4,10.3,6.14,3.65,2.27,1390,0.873,0.569,0.383,0.266,0.205,0.151,0.112,0.0882,0.0656,0.0474,0.0296,0.0135],
        [100,31.6,18.5,11.2,6.89,4.08,2.45,1550,0.978,0.659,0.444,0.323,0.23,0.175,0.13,0.103,0.0772,0.0528,0.0351,0.0167],
        [100,32.7,20,12,7.4,4.47,2.73,1730,1100,0.742,0.505,0.366,0.267,0.202,0.157,0.115,0.0884,0.0647,0.0408,0.0194],
        [100,34.4,21,12.9,7.92,4.85,3,1890,1250,0.834,0.574,0.42,0.307,0.229,0.179,0.135,0.104,0.0714,0.0473,0.0226],
        [100,35.9,22.2,13.8,8.59,5.29,3.3,2110,1370,0.932,0.644,0.466,0.347,0.264,0.208,0.157,0.118,0.0846,0.054,0.0262],
        [100,37.5,23.4,14.7,9.22,5.75,3.63,2320,1520,1044,0.714,0.529,0.395,0.302,0.233,0.18,0.135,0.097,0.0619,0.03],
        [100,39,24.5,15.6,9.85,6.18,3.95,2550,1690,1160,0.811,0.596,0.444,0.343,0.263,0.205,0.154,0.1117,0.0703,0.0339],
        [100,40.7,25.8,16.5,10.5,6.69,4.28,2790,1860,1286,0.906,0.663,0.501,0.384,0.297,0.232,0.175,0.124,0.0786,0.0385],
        [100,42.3,27.1,17.5,11.2,7.19,4.63,3080,2040,1410,1004,0.741,0.558,0.432,0.334,0.257,0.197,0.14,0.0892,0.0439],
        [100,44.1,28.3,18.4,11.9,7.69,5.01,3300,2230,1550,1110,0.818,0.617,0.48,0.372,0.287,0.218,0.154,0.1005,0.0499],
        [100,45.6,29.6,19.4,12.7,8.22,5.38,3580,2430,1700,1220,0.904,0.689,0.53,0.414,0.32,0.242,0.174,0.112,0.0567],
        [100,47.3,30.9,20.4,13.4,8.76,5.78,3.87,2.64,1.85,1.34,0.994,0.756,0.586,0.456,0.352,0.268,0.192,,],
        [100,48.7,32.2,21.4,14.1,9.31,6.18,4.16,2.86,2.02,1.46,1.087,0.83,0.642,0.501,,,,,],
        [100,50.4,33.4,22.3,14.9,9.88,6.59,4.47,3.08,2.19,1.58,1.187,0.907,0.701,,,,,,],
        [100,52.1,34.7,23.4,15.7,10.45,7.03,4.78,3.31,2.36,1.72,1.272,0.983,,,,,,,],
        [100,53.7,36.1,24.4,16.4,11.05,7.48,5.1,3.56,2.54,1.86,1.39,,,,,,,,],
        [100,55.2,37.3,25.4,17.3,11.63,7.91,5.44,3.81,2.73,2,,,,,,,,,],
        [100,56.8,38.6,26.5,18,12.24,8.36,5.78,4.06,2.92,2.15,,,,,,,,,],
        [100,58.4,39.8,27.5,18.8,12.88,8.82,6.12,4.34,3.12,,,,,,,,,,]
    ], // mol of ammonia / Kg
    TotalVaporPressureDB : [
        [0.6205284,2.3442184,4.136856,6.6879172,10.8937208,17.926376,28.957992,45.0917304,68.4649668,97.7676968,133.758344,173.4721616,214.8407216,253.5203252,294.5441472,316.7452744,339.7737728,359.4927864,378.522324,399.9650276],
        [0.8273712,3.102642,5.3089652,8.5495024,13.8584676,22.40797,35.9216996,55.5717656,83.081858,118.589872,161.2684364,208.221752,256.485072,301.5078548,341.980096,375.2817868,402.1713508,424.9930064,446.6425528,471.0500032],
        [1.2410568,4.4126464,7.239498,11.376354,18.4090092,29.5785204,46.53963,71.360766,105.7656184,149.271554,201.7406776,258.8292904,316.6763268,371.282826,419.6840412,459.6736492,491.5274404,518.83069,545.1686732,575.0919316],
        [1.7926376,5.9294936,9.7905592,15.2374196,24.2006076,38.265918,59.639674,91.1487272,133.068868,186.503258,250.0039976,318.7447548,388.3128832,454.364684,510.6259256,558.1997696,596.3277924,627.9747408,659.7595844,694.0265416],
        [2.4821136,8.0668692,12.6863584,19.994804,31.4401056,49.1596388,75.9113076,114.1772256,165.818978,230.2160364,306.2652392,389.1402544,472.0152696,548.4092104,616.1157536,672.3080476,717.6066208,755.665696,791.9321336,831.7148988],
        [3.5163276,10.4800352,16.7542668,25.9242976,40.334346,62.4665256,95.5613736,142.1010036,204.7054244,282.4093696,372.8686208,470.1536844,569.162438,659.7595844,739.118272,803.5153304,857.018668,900.7314464,940.445264,990.9149072],
        [4.826332,13.9274152,21.718494,33.3016908,51.2280668,78.600264,118.7967148,175.6784848,250.5555784,343.4969432,450.3657232,564.7497916,679.8922836,786.1405352,878.5303192,953.8210984,1014.563934,1065.6541056,1115.6411156,1170.4544576],
        [6.550022,18.0642712,27.923778,42.2648788,64.3970584,98.0434872,146.9962832,214.8407216,304.1968112,413.6166524,539.859708,673.4801568,807.8590292,930.8615476,1037.66138,1124.9490416,1195.551384,1255.535796,1311.5212472,1373.5740872],
        [8.7563452,23.0284984,35.4390664,53.2275472,80.2550064,121.2098808,179.7463932,260.6908756,366.5254416,495.5264012,642.5226844,797.723732,952.166356,1095.1636784,1217.2009304,1317.933374,1401.4289176,1467.8254564,1532.9809384,1605.444866],
        [11.6521444,29.4406252,44.5401496,66.3965388,99.4224392,148.5131304,218.4949444,314.5389512,438.4377884,588.3298708,759.802552,939.066312,1117.5027008,1280.356932,1422.3200404,1535.3251568,1629.7144212,1705.6257288,1781.605984,1862.274676],
        [15.3063672,37.0938088,55.6407132,82.1165916,121.8304092,180.642712,263.72457,376.109158,520.899118,695.4054936,892.87142,1096.26684,1303.10964,1488.4407888,1650.1229108,1781.605984,1884.337908,1974.659264,2059.2579692,2150.475644],
        [19.9258564,46.194892,68.8097048,100.8703388,148.1683924,217.4607304,315.2973748,446.6425528,614.9436444,815.2364224,1043.177188,1278.288504,1511.8829728,1721.3457816,1903.987974,2053.3284756,2171.8494,2271.133944,2366.281632,2472.460936],
        [25.6485072,57.1575604,84.3229148,122.7956756,179.26376,260.6908756,375.2817868,528.2075636,721.536634,952.166356,1209.340904,1478.92602,1741.961114,1980.4508624,2187.707348,2355.939492,2489.697836,2600.013996,2708.261728,2825.472648],
        [32.6811624,70.0507616,102.8698192,148.5131304,214.8407216,310.4020952,442.98833,619.7010288,841.850196,1104.540552,1397.567852,1703.00572,2000.7214568,2271.133944,2503.487356,2690.335352,2842.020072,2967.504704,3087.473528,3217.095016],
        [41.2996124,85.5639716,124.1746276,178.3674412,255.8645436,367.2838652,520.899118,722.8466384,977.33223,1276.220076,1607.858032,1951.906556,2286.991892,2589.671856,2849.604308,3059.205012,3225.368728,3369.469212,3503.917032,3645.949088],
        [51.7796476,103.4214,149.271554,212.7722936,303.5073352,432.1635568,607.9109892,838.9543968,1128.672212,1465.825976,1840.90092,2227.696956,2600.013996,2941.304616,3229.505584,3463.927424,3650.77542,3807.975948,,],
        [64.3970584,124.5193656,178.3674412,252.348216,357.2175156,505.5238032,707.1265856,970.43747,1296.904356,1677.495108,2098.075468,2531.066396,2948.888852,3326.7217,3645.949088,,,,,],
        [79.4965828,148.926816,211.8070272,297.4399464,417.9603512,588.3298708,818.2701168,1115.6411156,1483.752352,1909.84852,2382.13958,2862.014876,3330.16908,3747.991536,,,,,,],
        [97.3540112,176.5748036,250.0039976,348.7369608,487.5974272,681.202288,940.5831592,1276.220076,1689.905676,2168.40202,2693.782732,3229.505584,3743.165204,,,,,,,],
        [118.5209244,208.7043852,292.8204572,406.79084,564.7497916,784.6926356,1078.4094116,1456.4491024,1918.122232,2448.329276,3030.936496,3623.19638,,,,,,,,],
        [143.2731128,245.3845084,341.980096,472.0152696,651.0721868,900.7314464,1229.1978128,1652.673972,2168.40202,2759.282952,3401.874584,,,,,,,,,],
        [172.1621572,286.2704352,397.482914,544.0655116,748.770936,1028.698192,1397.8436424,1867.9283792,2441.434516,3095.057764,3807.975948,,,,,,,,,],
        [205.6706908,333.1548032,459.6736492,625.6305224,855.5018208,1168.5239248,1583.1747912,2107.038656,2741.356576,3463.927424,,,,,,,,,,]
    ], // Kpa
    WaterVaporPressure:function(Temperature, MolalConcentration){
        let PositionsX = FindClosestPositions(Temperature, this.TemperaturesDB);
        let PositionsY = [];
        PositionsY[0] = RegretionByPoints( MolalConcentration, this.ConcentrationsDBMolal, this.WaterVaporPressureDB[PositionsX[0]]);
        PositionsY[1] = RegretionByPoints( MolalConcentration, this.ConcentrationsDBMolal, this.WaterVaporPressureDB[PositionsX[1]]);
        let dy = PositionsY[1] - PositionsY[0];
        let dx = this.ConcentrationsDBMolal[PositionsX[1]] - this.ConcentrationsDBMolal[PositionsX[0]];
        let DeltaX = Temperature - this.ConcentrationsDBMolal[PositionsX[0]];
        // y0 + dy/dx * DeltaX
        let result;
        if (dy != 0){
            result = PositionsY[0] + dy/dx*DeltaX;
        }else{
            result = PositionsY[0];
        }
        return result;
    },
    AmmoniaVaporPressure:function(Temperature, MolalConcentration){
        let PositionsX = FindClosestPositions(Temperature, this.TemperaturesDB);
        let PositionsY = [];
        PositionsY[0] = RegretionByPoints( MolalConcentration, this.ConcentrationsDBMolal, this.AmmoniaVaporPressureDB[PositionsX[0]]);
        PositionsY[1] = RegretionByPoints( MolalConcentration, this.ConcentrationsDBMolal, this.AmmoniaVaporPressureDB[PositionsX[1]]);
        let dy = PositionsY[1] - PositionsY[0];
        let dx = this.ConcentrationsDBMolal[PositionsX[1]] - this.ConcentrationsDBMolal[PositionsX[0]];
        let DeltaX = Temperature - this.ConcentrationsDBMolal[PositionsX[0]];
        // y0 + dy/dx * DeltaX
        let result;
        if (dy != 0){
            result = PositionsY[0] + dy/dx*DeltaX;
        }else{
            result = PositionsY[0];
        }
        return result;
    },
    VaporPressure:function(Temperature, MolalConcentration){
        let PositionsX = FindClosestPositions(Temperature, this.TemperaturesDB);
        let PositionsY = [];
        PositionsY[0] = RegretionByPoints( MolalConcentration, this.ConcentrationsDBMolal, this.TotalVaporPressureDB[PositionsX[0]]);
        PositionsY[1] = RegretionByPoints( MolalConcentration, this.ConcentrationsDBMolal, this.TotalVaporPressureDB[PositionsX[1]]);
        let dy = PositionsY[1] - PositionsY[0];
        let dx = this.ConcentrationsDBMolal[PositionsX[1]] - this.ConcentrationsDBMolal[PositionsX[0]];
        let DeltaX = Temperature - this.ConcentrationsDBMolal[PositionsX[0]];
        // y0 + dy/dx * DeltaX
        let result;
        if (dy != 0){
            result = PositionsY[0] + dy/dx*DeltaX;
        }else{
            result = PositionsY[0];
        }
        return result;
    },
    GasComposition:function(Temperature, MolalConcentration){
        let PdVWater = this.WaterVaporPressure(Temperature, MolalConcentration);
        let PdVTotal = this.VaporPressure(Temperature, MolalConcentration);
        let YWater = PdVWater/(PdVTotal + 0.0001)*100;
        return {
            Water:YWater,
            Ammonia: 100 - YWater};
    },
    WaterVaporTemperature:function(Pressure, MolalConcentration){
        let LowerTemperature = 0;
        let HigherTemperature = 121.1;
        let MiddleTemperature = (HigherTemperature + LowerTemperature) * 0.5;
        for(let i = 0; i < 40; i++){
            VaporPressure = this.WaterVaporPressure(MiddleTemperature, MolalConcentration);
            if (VaporPressure > Pressure){
                HigherTemperature = MiddleTemperature;
                MiddleTemperature = (HigherTemperature + LowerTemperature) * 0.5;
            }else{
                LowerTemperature = MiddleTemperature;
                MiddleTemperature = (HigherTemperature + LowerTemperature) * 0.5;
            }
        }
        return MiddleTemperature;
    },
    AmmoniaVaporTemperature:function(Pressure, MolalConcentration){
        let LowerTemperature = 0;
        let HigherTemperature = 121.1;
        let MiddleTemperature = (HigherTemperature + LowerTemperature) * 0.5;
        for(let i = 0; i < 40; i++){
            VaporPressure = this.AmmoniaVaporPressure(MiddleTemperature, MolalConcentration);
            if (VaporPressure > Pressure){
                HigherTemperature = MiddleTemperature;
                MiddleTemperature = (HigherTemperature + LowerTemperature) * 0.5;
            }else{
                LowerTemperature = MiddleTemperature;
                MiddleTemperature = (HigherTemperature + LowerTemperature) * 0.5;
            }
        }
        return MiddleTemperature;
    },
    VaporTemperature:function(Pressure, MolalConcentration){
        let LowerTemperature = 0;
        let HigherTemperature = 121.1;
        let MiddleTemperature = (HigherTemperature + LowerTemperature) * 0.5;
        for(let i = 0; i < 40; i++){
            VaporPressure = this.VaporPressure(MiddleTemperature, MolalConcentration);
            if (VaporPressure > Pressure){
                HigherTemperature = MiddleTemperature;
                MiddleTemperature = (HigherTemperature + LowerTemperature) * 0.5;
            }else{
                LowerTemperature = MiddleTemperature;
                MiddleTemperature = (HigherTemperature + LowerTemperature) * 0.5;
            }
        }
        return MiddleTemperature;
    },
    ConcentrationAtSaturation:function(Temperature, Pressure){
        // Be aware that we are talking about saturation in a meaning of vapor - liquid equilibrium.
        // This has nothing to do with the cristalization fenomena.
        let LowerMolarConcentration = 0;
        let MiddleMolarConcentration = 47.5;
        let HigherMolarConcentration = 95;
        let VaporPressure = 0;
        for(let i = 0; i < 40; i++){
            VaporPressure = this.VaporPressure(Temperature, MiddleMolarConcentration);
            if (VaporPressure > Pressure){
                HigherMolarConcentration = MiddleMolarConcentration;
                MiddleMolarConcentration = (HigherMolarConcentration + LowerMolarConcentration) * 0.5;
            }else{
                LowerMolarConcentration = MiddleMolarConcentration;
                MiddleMolarConcentration = (HigherMolarConcentration + LowerMolarConcentration) * 0.5;
            }
        }
        return MiddleMolarConcentration;
    },
    ConcentrationAtWaterSaturation:function(Temperature, Pressure){
        // Be aware that we are talking about saturation in a meaning of vapor - liquid equilibrium.
        // This has nothing to do with the cristalization fenomena.
        let LowerMolarConcentration = 0;
        let MiddleMolarConcentration = 47.5;
        let HigherMolarConcentration = 95;
        let VaporPressure = 0;
        for(let i = 0; i < 40; i++){
            VaporPressure = this.WaterVaporPressure(Temperature, MiddleMolarConcentration);
            if (VaporPressure > Pressure){
                HigherMolarConcentration = MiddleMolarConcentration;
                MiddleMolarConcentration = (HigherMolarConcentration + LowerMolarConcentration) * 0.5;
            }else{
                LowerMolarConcentration = MiddleMolarConcentration;
                MiddleMolarConcentration = (HigherMolarConcentration + LowerMolarConcentration) * 0.5;
            }
        }
        return MiddleMolarConcentration;
    },
    ConcentrationAtAmmoniaSaturation:function(Temperature, Pressure){
        // Be aware that we are talking about saturation in a meaning of vapor - liquid equilibrium.
        // This has nothing to do with the cristalization fenomena.
        let LowerMolarConcentration = 0;
        let MiddleMolarConcentration = 47.5;
        let HigherMolarConcentration = 95;
        let VaporPressure = 0;
        for(let i = 0; i < 40; i++){
            VaporPressure = this.AmmoniaVaporPressure(Temperature, MiddleMolarConcentration);
            if (VaporPressure > Pressure){
                HigherMolarConcentration = MiddleMolarConcentration;
                MiddleMolarConcentration = (HigherMolarConcentration + LowerMolarConcentration) * 0.5;
            }else{
                LowerMolarConcentration = MiddleMolarConcentration;
                MiddleMolarConcentration = (HigherMolarConcentration + LowerMolarConcentration) * 0.5;
            }
        }
        return MiddleMolarConcentration;
    },
    Enthalpy:function(Temperature, MolalConcentration){
    },
}