// import { DEFAULT_METRICS } from "../PageComponents/constants";

export const templates = {
  "My County's Stats": [[{"w":4,"h":3,"x":0,"y":0,"type":"text","content":{"preset":"7day"}},{"w":4,"h":15,"x":4,"y":0,"type":"map","variable":"Confirmed Count per 100K Population"},{"w":4,"h":12,"x":0,"y":3,"type":"textReport"},{"w":4,"h":12,"x":0,"y":15,"type":"lineChart","table":"cases"},{"w":4,"h":12,"x":4,"y":15,"type":"lineChart","table":"deaths"},{"w":4,"h":15,"x":0,"y":27,"type":"table","topic":"COVID","metrics":["Cases","Deaths","Vaccination","Testing"]},{"w":4,"h":14,"x":4,"y":27,"type":"table","topic":"SDOH","metrics":["Uninsured Percent","Over 65 Years Percent","Life Expectancy","Percent Essential Workers","Adult Obesity","Preventable Hospital Stays","Severe Housing Problems"]}]],
  "A National Snapshot": [
    [
        {
            "type": "map",
            "w": 4,
            "h": 14,
            "variable": "Confirmed Count per 100K Population",
            "scale": "national",
            "x": 0,
            "y": 0
        },
        {
            "type": "map",
            "w": 4,
            "h": 14,
            "variable": "Death Count per 100K Population",
            "scale": "national",
            "x": 4,
            "y": 0
        },
        {
            "type": "map",
            "w": 4,
            "h": 14,
            "variable": "7 Day Testing Positivity Rate Percent",
            "scale": "national",
            "x": 0,
            "y": 14
        },
        {
            "type": "map",
            "w": 4,
            "h": 14,
            "variable": "Percent Fully Vaccinated",
            "scale": "national",
            "x": 4,
            "y": 14
        },
        {
            "type": "table",
            "w": 8,
            "h": 11,
            "label": "COVID Summary Table",
            "topic": "COVID",
            "metrics": [
                "Cases",
                "Deaths",
                "Vaccination",
                "Testing"
            ],
            "x": 0,
            "y": 28,
            "includedColumns": [
                "Metric",
                "nationQ50",
                "nationMin",
                "nationMax",
                "nationQ25",
                "nationQ75"
            ]
        }
    ],
    [
        {
            "table": "cases",
            "w": 8,
            "h": 15,
            "type": "lineChart",
            "label": "Cases Line Chart",
            "populationNormalized": false,
            "shouldShowVariants": true,
            "x": 0,
            "y": 0
        },
        {
            "table": "deaths",
            "w": 8,
            "h": 14,
            "type": "lineChart",
            "label": "Cases Line Chart",
            "shouldShowVariants": true,
            "x": 0,
            "y": 15
        },
        {
            "table": "vaccines_fully_vaccinated",
            "w": 8,
            "h": 14,
            "type": "lineChart",
            "label": "Cases Line Chart",
            "shouldShowVariants": true,
            "x": 0,
            "y": 29
        }
    ]
],
  "My Region's Snapshot": [
    [
        {
            "type": "map",
            "w": 4,
            "h": 14,
            "variable": "Confirmed Count per 100K Population",
            "scale": "region",
            "x": 0,
            "y": 0
        },
        {
            "type": "map",
            "w": 4,
            "h": 14,
            "variable": "Death Count per 100K Population",
            "scale": "region",
            "x": 4,
            "y": 0
        },
        {
            "type": "map",
            "w": 4,
            "h": 14,
            "variable": "7 Day Testing Positivity Rate Percent",
            "scale": "region",
            "x": 0,
            "y": 14
        },
        {
            "type": "map",
            "w": 4,
            "h": 14,
            "variable": "Percent Fully Vaccinated",
            "scale": "region",
            "x": 4,
            "y": 14
        },
        {
            "type": "table",
            "w": 8,
            "h": 11,
            "label": "COVID Summary Table",
            "topic": "COVID",
            "metrics": [
                "Cases",
                "Deaths",
                "Vaccination",
                "Testing"
            ],
            "x": 0,
            "y": 28,
            "includedColumns": [
                "Metric",
                "County",
                "regionQ50",
                "regionMin",
                "regionMax",
                "regionQ25",
                "regionQ75"
            ]
        }
    ],
    [
        {
            "table": "cases",
            "w": 8,
            "h": 15,
            "type": "lineChart",
            "label": "Cases Line Chart",
            "populationNormalized": false,
            "shouldShowVariants": true,
            "linestoShow": "secondOrderNeighbors",
            "x": 0,
            "y": 0
        },
        {
            "table": "deaths",
            "w": 8,
            "h": 14,
            "type": "lineChart",
            "label": "Cases Line Chart",
            "shouldShowVariants": true,
            "linestoShow": "secondOrderNeighbors",
            "x": 0,
            "y": 15
        },
        {
            "table": "vaccines_fully_vaccinated",
            "w": 8,
            "h": 14,
            "type": "lineChart",
            "label": "Cases Line Chart",
            "shouldShowVariants": true,
            "linestoShow": "secondOrderNeighbors",
            "x": 0,
            "y": 29
        }
    ]
],
  "My Neighboring County's Stats": [
    [
        {
            "type": "map",
            "w": 4,
            "h": 14,
            "variable": "Confirmed Count per 100K Population",
            "scale": "region",
            "x": 0,
            "y": 0
        },
        {
            "type": "map",
            "w": 4,
            "h": 14,
            "variable": "Death Count per 100K Population",
            "scale": "region",
            "x": 4,
            "y": 0
        },
        {
            "type": "map",
            "w": 4,
            "h": 14,
            "variable": "7 Day Testing Positivity Rate Percent",
            "scale": "region",
            "x": 0,
            "y": 14
        },
        {
            "type": "map",
            "w": 4,
            "h": 14,
            "variable": "Percent Fully Vaccinated",
            "scale": "region",
            "x": 4,
            "y": 14
        },
        {
            "type": "table",
            "w": 8,
            "h": 11,
            "label": "COVID Summary Table",
            "topic": "COVID",
            "metrics": [
                "Cases",
                "Deaths",
                "Vaccination",
                "Testing"
            ],
            "x": 0,
            "y": 28,
            "includedColumns": [
                "Metric",
                "County",
                "neighborQ50",
                "neighborMin",
                "neighborMax",
                "neighborQ25",
                "neighborQ75"
            ]
        }
    ],
    [
        {
            "table": "cases",
            "w": 8,
            "h": 15,
            "type": "lineChart",
            "label": "Cases Line Chart",
            "populationNormalized": false,
            "shouldShowVariants": true,
            "linesToShow": "neighbors",
            "x": 0,
            "y": 0
        },
        {
            "table": "deaths",
            "w": 8,
            "h": 14,
            "type": "lineChart",
            "label": "Cases Line Chart",
            "shouldShowVariants": true,
            "linesToShow": "neighbors",
            "x": 0,
            "y": 15
        },
        {
            "table": "vaccines_fully_vaccinated",
            "w": 8,
            "h": 14,
            "type": "lineChart",
            "label": "Cases Line Chart",
            "shouldShowVariants": true,
            "linesToShow": "neighbors",
            "x": 0,
            "y": 29
        }
    ]
],
  "Something Else (Blank Report)": [[]],
};
