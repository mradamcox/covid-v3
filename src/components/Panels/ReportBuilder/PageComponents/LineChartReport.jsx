import { ControlPopover, LineChartInner } from '../../..'
import {
    PanelItemContainer,
    GrabTarget,
    DeleteBlock,
    CenteredChartTitle,
} from './PageComponentsLayout'
import colors from '../../../../config/colors'
import countyList from '../../../../meta/countyNames'
import { NoInteractionGate } from './MapReport'
import { HoverButtonsContainer } from '../InterfaceComponents/HoverButtonsContainer'
import useGetNeighbors from '../../../../hooks/useGetNeighbors'

const tableOptions = [
    {
        text: 'Cases',
        value: 'cases',
    },
    {
        text: 'Deaths',
        value: 'deaths',
    },
    {
        text: 'Fully Vaccinated Persons',
        value: 'vaccines_fully_vaccinated',
    },
    // {
    //   text: "Weekly Positivity",
    //   value: "testing_wk_pos",
    // },
]

/**
 * Wrapper report item for a line chart in the report builder. This component shouldn't be called directly, but through the report spec and builder.
 *
 * @category Components/ReportBuilder
 * @param {Object} props
 * @param {number[]} props.geoid GEOID of county(s) to display
 * @param {function} props.handleChange Function to partially change a report
 *   item (props: Partial<ReportItem>) => void See Report Slice for more
 * @param {function} props.handleToggle Function to toggle property of a report
 *   item (toggleProperty: string) => void
 * @param {function} props.handleRemove Function to remove this report item from
 *   the report () => void
 * @param {string} props.table Table to display - 'cases' | 'deaths' |
 *   'vaccination'
 * @param {boolean} props.logChart Whether to display the chart on a log scale
 * @param {boolean} props.showSummarized Whether to display the summarized data,
 *   such as the total for selected counties
 * @param {boolean} props.populationNormalized Whether to display the data
 *   normalized by population or total counts
 * @param {boolean} props.shouldShowVariants Whether to display the variants
 *   time stamps
 * @param {string} props.linesToShow County, neighbors, or secondOrderNeighbors
 *   -- if using neighboring counties
 * @param {function} props.loadedCallback Function after chart is loaded
 *   (isLoaded: boolean) => void
 * 
 */
function LineChartReport({
    geoid = [],
    // pageIdx = 0,
    // contentIdx = 0,
    handleChange,
    handleToggle,
    handleRemove,
    // width,
    // height,
    table,
    logChart,
    showSummarized,
    populationNormalized,
    shouldShowVariants,
    // neighbors, secondOrderNeighbors,
    linesToShow = 'county',
    loadedCallback = () => {},
}){
    const [
        neighbors,
        secondOrderNeighbors,
        // state
    ] = useGetNeighbors({
        geoid,
        currentData: 'county_usfacts.geojson',
    })

    const ids = {
        county: geoid,
        neighbors,
        secondOrderNeighbors,
    }[linesToShow]

    return (
        <PanelItemContainer style={{ padding: '1em 1em 0 0' }}>
            <CenteredChartTitle>
                <h3>{tableOptions.find((f) => f.value === table)?.text}</h3>
            </CenteredChartTitle>
            <NoInteractionGate>
                <LineChartInner
                    docked={true}
                    colorScheme="light"
                    geoid={
                        typeof ids === 'number' || typeof ids === 'string'
                            ? [ids]
                            : ids
                    }
                    {...{
                        table,
                        logChart,
                        showSummarized,
                        populationNormalized,
                        shouldShowVariants,
                        loadedCallback,
                    }}
                />
            </NoInteractionGate>
            <HoverButtonsContainer>
                <ControlPopover
                    className="hover-buttons"
                    inline
                    size={4}
                    iconColor={colors.strongOrange}
                    controlElements={[
                        {
                            type: 'header',
                            content: 'Controls for Line Chart Block',
                        },
                        {
                            type: 'helperText',
                            content: 'Select the data to display on the chart.',
                        },
                        {
                            type: 'select',
                            content: {
                                label: 'Change Table',
                                items: tableOptions,
                            },
                            action: (e) =>
                                handleChange({
                                    table: e.target.value,
                                }),
                            value: table,
                        },
                        {
                            type: 'switch',
                            content: 'Logarithmic Scale',
                            action: () => handleToggle('logChart'),
                            value: logChart,
                        },
                        {
                            type: 'switch',
                            content: 'Normalize to 100K Population',
                            action: () => handleToggle('populationNormalized'),
                            value: populationNormalized,
                        },
                        {
                            type: 'switch',
                            content: 'Show Variant Designation Dates',
                            action: () => handleToggle('shouldShowVariants'),
                            value: shouldShowVariants,
                        },
                        {
                            type: 'comboBox',
                            content: {
                                label: 'Change County',
                                items: countyList,
                            },
                            action: (e) => handleChange({ geoid: e.value }),
                            value: geoid,
                        },

                        {
                            type: 'select',
                            content: {
                                label: 'Show neighboring counties?',
                                items: [
                                    {
                                        text: 'Selected County Only',
                                        value: 'county',
                                    },
                                    {
                                        text: 'Selected County and Neighbors',
                                        value: 'neighbors',
                                    },
                                    {
                                        text: 'Selected County and Region',
                                        value: 'secondOrderNeighbors',
                                    },
                                ],
                            },
                            action: (e) =>
                                handleChange({ linesToShow: e.target.value }),
                            value: linesToShow,
                        },

                        // {
                        //   ...widthOptions,
                        //   action: (e) =>
                        //     handleChange({ W: e.target.value }),
                        //   value: width,
                        // },
                        // {
                        //   ...heightOptions,
                        //   action: (e) =>
                        //     handleChange({ height: e.target.value }),
                        //   value: height,
                        // },
                    ]}
                />
                <GrabTarget
                    iconColor={colors.strongOrange}
                    className="hover-buttons"
                />
                <DeleteBlock
                    iconColor={colors.strongOrange}
                    className="hover-buttons"
                    onClick={handleRemove}
                />
            </HoverButtonsContainer>
        </PanelItemContainer>
    )
}

export {
    LineChartReport
}