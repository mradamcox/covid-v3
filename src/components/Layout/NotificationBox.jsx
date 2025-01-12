import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import colors from '../../config/colors'
import { paramsSelectors, paramsActions } from '../../stores/paramsStore'

const { selectNotification } = paramsSelectors
const { setNotification } = paramsActions

const Notification = styled.div`
    width: 300px;
    max-width: 90vw;
    position: fixed;
    left: ${(props) =>
        props.location === 'center'
            ? '50%'
            : props.location.includes('left')
            ? '4rem'
            : 'intial'};
    right: ${(props) => (props.location.includes('right') ? '4rem' : 'intial')};
    top: ${(props) =>
        props.location === 'center'
            ? '50%'
            : props.location.includes('top')
            ? '4rem'
            : 'intial'};
    bottom: ${(props) =>
        props.location.includes('bottom') ? '3rem' : 'intial'};
    z-index: 15;
    background: ${colors.gray};
    color: ${colors.white};
    padding: 0;
    overflow: hidden;
    border-radius: 4px;
    padding: 20px 30px 20px 20px;
    -moz-box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: 0 0 2px rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    transform: ${(props) =>
        props.location === 'center' ? 'translate(-50%, -50%)' : 'none'};
    a {
        color: ${colors.yellow};
    }
`

const CloseNotification = styled.button`
    position: absolute;
    top: 12px;
    right: 10px;
    font-size: 200%;
    cursor: pointer;
    padding: 0;
    background: none;
    outline: none;
    border: none;
    color: white;
`

/**
 * Notification box for manual notes. Currently used to notify of situations
 * where red on hotspot is good, not bad. Usese UI state for managing
 * notification text
 *
 * TODO: Deprecate in favor of Mui snackbar / toast
 *
 * @category Components/Layout
 * @component
 */
const NotificationBox = () => {
    const dispatch = useDispatch()
    const clearNotification = () =>
        dispatch(setNotification({ info: null, location: '' }))
    const notification = useSelector(selectNotification)

    return (
        notification.info && (
            <Notification location={notification.location}>
                <div
                    dangerouslySetInnerHTML={{ __html: notification.info }}
                ></div>
                <CloseNotification onClick={clearNotification}>
                    ×
                </CloseNotification>
            </Notification>
        )
    )
}

export default NotificationBox
