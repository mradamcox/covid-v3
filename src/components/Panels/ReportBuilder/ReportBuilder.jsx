import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import colors from '../../../config/colors'
import countyList from '../../../meta/countyNames'
import StepperComponent from './InterfaceComponents/Stepper'
import TemplateSelector from './TemplateSelector'
import { ReportEditor } from './ReportPage/ReportEditor'
import { Stack, Box, Typography, Modal } from '@mui/material'
import { ViewportProvider } from '../../../contexts/Viewport'
import { paramsSelectors, paramsActions } from '../../../stores/paramsStore'
import { reportSelectors, reportActions } from '../../../stores/reportStore'
const { selectAllReports } = reportSelectors
const { selectSinglePanelState, selectDates } = paramsSelectors
const { togglePanel } = paramsActions
const { addNewReport } = reportActions

const defaultViewport = {
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
    bearing: 0,
    pitch: 0,
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1140,
    maxWidth: {
        xs: '100vw',
        sm: '100vw',
        md: '100vw',
        lg: '80vw',
        xl: '80vw',
    },
    height: '100%',
    bgcolor: colors.gray,
    border: '1px solid #000',
    fontFamily: "'Lato', sans-serif",
    color: 'white',
    boxShadow: 0,
    p: {
        xs: 1,
        sm: 2,
        md: 2,
        lg: 4,
        xl: 4,
    },
}
const ModalInner = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    padding-bottom: 4em;
    max-height: 100vh;
    min-height: 40vh;
    overflow: hidden;
    transition: 250ms all;
    display: flex;
    flex-direction: column;
`

const CloseButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.5em;
    background: none;
    color: white;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
`

const steps = [
    'Choose a template',
    'Select your community',
    'Customize',
    'Save or Print',
]
/**
 * Outer container for the report builder. Manage state for the template
 * selector, active step, and template customization
 *
 * @category Components/ReportBuilder
 * @param {Object} props
 * @param {boolean} props.isPage
 * @component
 */
function ReportBuilder({ isPage = false }) {
    const dispatch = useDispatch()
    const reportBuilderOpen = useSelector(
        selectSinglePanelState('reportBuilder')
    )
    const open = isPage || reportBuilderOpen
    const handleClose = () => dispatch(togglePanel('reportBuilder'))
    // trigger update to parent context for dnd / resizing
    useSelector(selectAllReports)
    const dates = useSelector(selectDates)
    const dateInputs = useMemo(
        () => [
            { value: null, label: 'Latest Available Data' },
            ...(dates
                ? dates.map((f, idx) => ({ label: f, value: idx })).reverse()
                : []),
        ],
        [dates.length]
    )

    // builder temp state
    const [activeStep, setActiveStep] = useState(0)
    useEffect(() => {
        setActiveStep(0)
    }, [open])
    const [selectedTemplate, setSelectedTemplate] = useState(null)
    const [selectedCounty, setSelectCounty] = useState(null)
    const [selectedDate, setSelectedDate] = useState({
        value: null,
        label: 'Latest Available Data',
    })
    const [templateName, setTemplateName] = useState('Template Name')
    const handleRenameTemplate = (e) => {
        setTemplateName(e.target.value)
    }
    useEffect(() => {
        setTemplateName(
            `${selectedTemplate} - ${selectedCounty?.label || ''} - ${
                selectedDate?.label || ''
            }`
        )
    }, [selectedCounty, selectedDate, selectedTemplate])

    const canProgress =
        (activeStep === 0 && selectedTemplate !== null) ||
        (activeStep === 1 && selectedCounty !== null) ||
        ['A National Snapshot', 'Something Else (Blank Report)'].includes(
            selectedTemplate
        ) ||
        activeStep === 2 ||
        activeStep === 3

    const templates = [
        {
            label: "My County's Stats",
            icon: 'placeMarker',
            customization: [
                {
                    label: selectedCounty
                        ? `You selected ${selectedCounty?.label}. Click 'Next' to continue`
                        : 'What is the name of your county?',
                    input: {
                        type: 'comboBox',
                        content: {
                            label: 'Type to search (eg. Miami-Dade)',
                            items: countyList,
                        },
                        action: setSelectCounty,
                        value: selectedCounty,
                    },
                },
                {
                    label: 'What date would you like to see?',
                    input: {
                        type: 'comboBox',
                        content: {
                            label: 'Select a date',
                            items: dateInputs,
                        },
                        action: setSelectedDate,
                        value: selectedDate,
                    },
                },
                {
                    label: 'What would you like to name your report?',
                    input: {
                        type: 'textInput',
                        content: {
                            label: 'Type a name',
                        },
                        action: handleRenameTemplate,
                        value: templateName,
                    },
                },
            ],
        },
        {
            label: 'A National Snapshot',
            icon: 'usMap',
            customization: [
                {
                    label: 'What date would you like to see?',
                    input: {
                        type: 'comboBox',
                        content: {
                            label: 'Select a date',
                            items: dateInputs,
                        },
                        action: setSelectedDate,
                        value: selectedDate,
                    },
                },
                {
                    label: 'What would you like to name your report?',
                    input: {
                        type: 'textInput',
                        content: {
                            label: 'Type a name',
                        },
                        action: handleRenameTemplate,
                        value: templateName,
                    },
                },
            ],
        },
        {
            label: "My Region's Snapshot",
            icon: 'focus',
            customization: [
                {
                    label: selectedCounty
                        ? `You selected ${selectedCounty?.label}. Click 'Next' to continue`
                        : 'What is the name of your county?',
                    input: {
                        type: 'comboBox',
                        content: {
                            label: 'Type to search (eg. Miami-Dade)',
                            items: countyList,
                        },
                        action: setSelectCounty,
                        value: selectedCounty,
                    },
                },
                {
                    label: 'What date would you like to see?',
                    input: {
                        type: 'comboBox',
                        content: {
                            label: 'Select a date',
                            items: dateInputs,
                        },
                        action: setSelectedDate,
                        value: selectedDate,
                    },
                },
                {
                    label: 'What would you like to name your report?',
                    input: {
                        type: 'textInput',
                        content: {
                            label: 'Type a name',
                        },
                        action: handleRenameTemplate,
                        value: templateName,
                    },
                },
            ],
        },
        {
            label: "My Neighboring County's Stats",
            icon: 'neighbors',
            customization: [
                {
                    label: selectedCounty
                        ? `You selected ${selectedCounty?.label}. Click 'Next' to continue`
                        : 'What is the name of your county?',
                    input: {
                        type: 'comboBox',
                        content: {
                            label: 'Type to search (eg. Miami-Dade)',
                            items: countyList,
                        },
                        action: setSelectCounty,
                        value: selectedCounty,
                    },
                },
                {
                    label: 'What date would you like to see?',
                    input: {
                        type: 'comboBox',
                        content: {
                            label: 'Select a date',
                            items: dateInputs,
                        },
                        action: setSelectedDate,
                        value: selectedDate,
                    },
                },
                {
                    label: 'What would you like to name your report?',
                    input: {
                        type: 'textInput',
                        content: {
                            label: 'Type a name',
                        },
                        action: handleRenameTemplate,
                        value: templateName,
                    },
                },
            ],
        },
        {
            label: 'Something Else (Blank Report)',
            icon: false,
            customization: [
                {
                    label: 'What would you like to name your report?',
                    input: {
                        type: 'textInput',
                        content: {
                            label: 'Type a name',
                        },
                        action: handleRenameTemplate,
                        value: templateName,
                    },
                },
            ],
        },
    ]

    const handleStep = (step) => {
        if (activeStep === 2 && step === 1) {
            setActiveStep(0)
        } else if (activeStep < 2 && step === 2) {
            dispatch(
                addNewReport({
                    reportName: templateName,
                    spec: selectedTemplate,
                    meta: {
                        county: selectedCounty?.label,
                        state:
                            selectedCounty?.label &&
                            selectedCounty.label.split(',').slice(-1)[0],
                        geoid: selectedCounty?.value,
                        date: selectedDate?.label,
                        dateIndex: selectedDate?.value,
                    },
                })
            )
            setActiveStep(step)
        } else {
            setActiveStep(step)
        }
    }
    const innerContent = (
        <ModalInner>
            <Stack
                direction="row"
                spacing={2}
                alignItems="top"
                borderBottom={'1px solid white'}
                position="relative"
                paddingBottom="40px"
            >
                <Typography
                    id="modal-modal-title"
                    fontWeight="bold"
                    flexShrink={'0'}
                >
                    Report Builder
                </Typography>

                <StepperComponent
                    steps={steps}
                    activeStep={activeStep}
                    handleStep={handleStep}
                    canProgress={canProgress}
                />
            </Stack>
            {/* <Typography id="modal-modal-title" variant="h4" component="h2">
    This feature is coming soon. Please check back later!
  </Typography> */}
            {(activeStep === 0 || activeStep === 1) && (
                <>
                    {activeStep === 0 ? (
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Use this tool to build a report to help you and your
                            community understand the context of COVID and
                            determinants of health.
                            <br />
                            <br />
                            To get started, which template best fits your needs?
                        </Typography>
                    ) : (
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Customize your template:
                        </Typography>
                    )}
                    <TemplateSelector
                        selectedTemplate={selectedTemplate}
                        setSelectedTemplate={setSelectedTemplate}
                        templates={templates}
                        showTemplateCustomizer={activeStep === 1}
                        setActiveStep={setActiveStep}
                    />
                </>
            )}
            {activeStep >= 2 && (
                <ViewportProvider defaultViewport={defaultViewport}>
                    <ReportEditor
                        activeStep={activeStep}
                        handleStep={handleStep}
                    />
                </ViewportProvider>
            )}
        </ModalInner>
    )

    if (isPage) {
        return <div>{innerContent}</div>
    } else {
        return (
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {innerContent}
                    <CloseButton
                        onClick={handleClose}
                        title="Close Report Builder"
                    >
                        &times;
                    </CloseButton>
                </Box>
            </Modal>
        )
    }
}

export default ReportBuilder
