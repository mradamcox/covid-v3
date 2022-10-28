/**
 * Color scales for mapping {[Key: string]: [r: number, g: number, b: number][]}
 *
 * @category Configuration
 * @type {Object}
 */
export const colorScales = {
    natural_breaks: [
        [255, 255, 204],
        [255, 237, 160],
        [254, 217, 118],
        [254, 178, 76],
        [253, 141, 60],
        [252, 78, 42],
        [227, 26, 28],
        [177, 0, 38],
    ],
    lisa: [
        [255, 255, 255],
        [255, 0, 0],
        [0, 0, 255],
        [167, 173, 249],
        [244, 173, 168],
        // [70, 70, 70],
        // [153, 153, 153]
    ],
    hinge15_breaks: [
        [1, 102, 94],
        [90, 180, 172],
        [199, 234, 229],
        [246, 232, 195],
        [216, 179, 101],
        [140, 81, 10],
    ],
    uninsured: [
        [247, 252, 253],
        [224, 236, 244],
        [191, 211, 230],
        [158, 188, 218],
        [140, 150, 198],
        [140, 107, 177],
        [136, 65, 157],
        [129, 15, 124],
        // [77,0,75],
    ],
    over65: [
        [247, 252, 240],
        [224, 243, 219],
        [204, 235, 197],
        [168, 221, 181],
        [123, 204, 196],
        [78, 179, 211],
        [43, 140, 190],
        [8, 104, 172],
        // [8,64,129],
    ],
    lifeExp: [
        [247, 252, 240],
        [224, 243, 219],
        [204, 235, 197],
        [168, 221, 181],
        [123, 204, 196],
        [78, 179, 211],
        [43, 140, 190],
        [8, 104, 172],
        // [8,64,129],
    ],
    forecasting: [
        [239, 239, 239],
        [254, 232, 200],
        [253, 187, 132],
        [227, 74, 51],
    ],
    testing: [
        [239, 239, 239],
        [13, 8, 135],
        [92, 1, 166],
        [156, 23, 158],
        [203, 70, 121],
        [237, 121, 83],
        [253, 180, 47],
        [240, 249, 33],
    ],
    testingCap: [
        [239, 239, 239],
        [247, 251, 255],
        [222, 235, 247],
        [198, 219, 239],
        [158, 202, 225],
        [107, 174, 214],
        [66, 146, 198],
        [33, 113, 181],
        [8, 81, 156],
        [8, 48, 107],
    ],
    BuPu8: [
        [247, 252, 253],
        [224, 236, 244],
        [191, 211, 230],
        [158, 188, 218],
        [140, 150, 198],
        [140, 107, 177],
        [136, 65, 157],
        [110, 1, 107],
    ],
    purpleSingleHue8: [
        [252, 251, 253],
        [238, 236, 245],
        [217, 216, 234],
        [188, 188, 219],
        [158, 155, 201],
        [129, 123, 185],
        [106, 81, 164],
        [84, 40, 143],
    ],
    greenSingleHue8: [
        [247, 252, 245],
        [229, 245, 224],
        [199, 233, 192],
        [161, 217, 155],
        [116, 196, 118],
        [65, 171, 93],
        [35, 139, 69],
        [0, 90, 50],
    ],
    YlGnBu8: [
        [255, 255, 217],
        [237, 248, 177],
        [199, 233, 180],
        [127, 205, 187],
        [65, 182, 196],
        [29, 145, 192],
        [34, 94, 168],
        [12, 44, 132],
    ],
    YlGn8: [
        [255, 255, 229],
        [247, 252, 185],
        [217, 240, 163],
        [173, 221, 142],
        [120, 198, 121],
        [65, 171, 93],
        [35, 132, 67],
        [0, 90, 50],
    ],
    mobilityDivergingWork: [
        [50, 136, 189],
        [102, 194, 165],
        [171, 221, 164],
        [230, 245, 152],
        [254, 224, 139],
        [253, 174, 97],
        [244, 109, 67],
        [213, 62, 79],
    ],
    mobilityDivergingHome: [
        [118, 42, 131],
        [153, 112, 171],
        [194, 165, 207],
        [231, 212, 232],
        [217, 240, 211],
        [166, 219, 160],
        [90, 174, 97],
        [27, 120, 55],
    ],
    mobilityHome: [
        [252, 251, 253],
        [239, 237, 245],
        [218, 218, 235],
        [188, 189, 220],
        [158, 154, 200],
        [128, 125, 186],
        [106, 81, 163],
        [74, 20, 134],
    ],
    mobilityWork: [
        [255, 245, 235],
        [254, 230, 206],
        [253, 208, 162],
        [253, 174, 107],
        [253, 141, 60],
        [241, 105, 19],
        [217, 72, 1],
        [140, 45, 4],
    ],
    maskMandates: [
        [247, 252, 253],
        [255, 100, 100],
        [255, 255, 0],
    ]
}

/**
 * Map bins and breaks {[Key: string]: { bins: strinp[], breaks?: number[]}}
 *
 * @category Configuration
 * @type {Object}
 */
export const fixedScales = {
    testing: {
        bins: ['No Data', '<3%', '5%', '10%', '15%', '20%', '>25%'],
        breaks: [-1, 3, 5, 10, 15, 20, 25, Math.pow(10, 12)],
    },
    testingCap: {
        bins: [
            'No Data',
            '<50',
            '100',
            '150',
            '200',
            '250',
            '300',
            '350',
            '>400',
        ],
        breaks: [0, 50, 100, 150, 200, 250, 300, 350, 400, Math.pow(10, 12)],
    },
    lisa: {
        bins: [
            'Not significant tooltip:NotSig',
            'High-High tooltip:HighHigh',
            'Low-Low tooltip:LowLow',
            'Low-High  tooltip:LowHigh',
            'High-Low  tooltip:HighLow',
        ], //"Undefined", "Isolated"
    },
    forecasting: {
        bins: ['N/A', 'Low', 'Medium', 'High'],
        breaks: [1, 2, 3, 4],
    },
    maskMandates: {
        bins: ['No Data', 'No', 'Yes'],
        breaks: [-1.1, 0.1, 1.1],
    }
}
