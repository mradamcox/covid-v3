import React from 'react'
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import TocIcon from '@mui/icons-material/Toc'
import ShowChartIcon from '@mui/icons-material/ShowChart'
import MapIcon from '@mui/icons-material/Map'
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import styled from 'styled-components'

const StyledSpeedDial = styled(SpeedDial)`
    .MuiSpeedDialAction-staticTooltipLabel {
        color: black;
        white-space: nowrap;
    }
`

/**
 * Helper component to manage adding items to a report
 *
 * @category Components/ReportBuilder
 * @example
 *     function ParentComponent() {
 *         const [canAddItem, setCanAddItem] = useState(false)
 *         const [reportItems, setReportItems] = useState([])
 *         return (
 *             <AddItemsSpeeedDial
 *                 canAddItem={canAddItem}
 *                 handleAddItem={handleAddItem}
 *             />
 *         )
 *     }
 *
 * @param {Object} props
 * @param {boolean} props.canAddItem - Whether the user can add items to the
 *   report
 * @param {function} props.handleAddItem - Callback for when an item is added
 *   (Item: Partial<ReportItem>): void See reportSlice for more info on Item
 * @component
 */
function AddItemsSpeeedDial({ handleAddItem, canAddItem }) {
    const actions = [
        {
            name: canAddItem ? 'Add New Page' : 'Page is Full - Add New Page',
            icon: <NoteAddIcon />,
            disabled: false,
            item: {
                type: 'page',
            },
        },
        {
            name: 'Map',
            icon: <MapIcon />,
            disabled: !canAddItem,
            item: {
                type: 'map',
                w: 2,
                h: 3,
                variable: 'Confirmed Count per 100K Population',
            },
        },
        {
            name: 'Table',
            icon: <TocIcon />,
            disabled: !canAddItem,
            item: {
                type: 'table',
                w: 2,
                h: 3,
                label: 'COVID Summary Table',
                topic: 'COVID',
            },
        },
        {
            name: 'Line Chart',
            icon: <ShowChartIcon />,
            disabled: !canAddItem,
            item: {
                table: 'cases',
                w: 2,
                h: 3,
                type: 'lineChart',
                label: 'Cases Line Chart',
            },
        },
        {
            name: 'Scatter Chart',
            icon: <ScatterPlotIcon />,
            disabled: !canAddItem,
            item: {
                xAxisVar: 'Percent Fully Vaccinated',
                yAxisVar: 'Death Count per 100K Population',
                w: 2,
                h: 3,
                type: 'scatterChart',
                label: 'Vaccinations vs Deaths Line Chart',
            },
        },
    ]

    return (
        <StyledSpeedDial
            ariaLabel="Add elements to this report page"
            icon={<SpeedDialIcon />}
            //   sx={{ position: "absolute", right: "2em", bottom: "4em" }}
            direction={'left'}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    sx={{
                        opacity: action.disabled ? 0.5 : 1,
                        pointerEvents: action.disabled ? 'none' : 'auto',
                    }}
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    ariaLabel={action.name}
                    // tooltipOpen
                    onClick={() => handleAddItem(action.item)}
                />
            ))}
        </StyledSpeedDial>
    )
}

export { AddItemsSpeeedDial }
