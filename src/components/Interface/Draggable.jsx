
// Import libraries
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
// Import config and actions
import colors from '../../config/colors';
import {Icon} from '../../components';
import { paramsSelectors, paramsActions } from '../../stores/paramsStore';
const { selectSinglePanelState } = paramsSelectors;
const { togglePanel } = paramsActions;
// Styles - Container
const DragContainer = styled.div`
  position: fixed;
  overflow: hidden;
  background: ${colors.gray};
  padding: 0;
  box-sizing: border-box;
  border:1px solid black;
  /* box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.7);
  border-radius: 0.5vh; */
  &.collapsed {
    display: none;
  }
`;

// Drag button (crosshair)
const DragButton = styled.button`
  position: absolute;
  left: 5px;
  top: 5px;
  background: none;
  outline: none;
  border: none;
  cursor: move;
  svg {
    fill: white;
    width: 20px;
    height: 20px;
  }
`;

// Hide panel // collapse button
const CollapseButton = styled.button`
  position: absolute;
  top: 3px;
  right: 5px;
  font-size: 200%;
  cursor: pointer;
  padding: 0;
  background: none;
  outline: none;
  border: none;
  color: white;
  p {
    font-size: 50%;
    display: inline;
    font-family: 'Montserrat', sans-serif;
    line-height: 1;
  }
  svg {
    fill: white;
    width: 40px;
    height: 30px;
  }
`;

/**
 * A wrapper component that allows the children to be dragged around the screen
 * Often composed with Scaleable
 * 
 * @component
 * @category Components/Interface
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content of the panel
 * @param {String} props.title - The id of the panel in the store
 * @param {Boolean} props.allowCollapse - Whether the panel can be collapsed or not
 * @param {number} props.z - zindex of the panel, when multiple panels are open
 * @param {number} props.defaultX - default x position of the panel
 * @param {number} props.defaultY - default y position of the panel
 * 
 * @example 
 * function MyComponent() {
 *  return (
 *   <Draggable title="myPanel" allowCollapse={true} defaultX={100} defaultY={100}>
 *    <div>My panel content</div>
 *  </Draggable>
 * )
 */
const Draggable = ({
  title='',
  defaultX=0,
  defaultY=0,
  allowCollapse=true,
  z,
  children,
}) => {
  // Redux Dispatch and selector
  const dispatch = useDispatch();
  const open = useSelector(selectSinglePanelState(title));

  // Local state, dragging
  const [X, setX] = useState(defaultX);
  const [Y, setY] = useState(defaultY);
  const [isDragging, setIsDragging] = useState(false);

  // Listener and touch listeners for moving
  // On touch/mouseup, the listeners remove themselves
  const listener = (e) => {
    const divider = e?.view?.devicePixelRatio || 1;
    setX((prevWidth) => prevWidth + (e.movementX/divider));
    setY((prevHeight) => prevHeight + (e.movementY/divider));
  };

  const touchListener = (e) => {
    setX(e?.targetTouches[0]?.clientX - 15);
    setY(e?.targetTouches[0]?.clientY - 15);
  };

  const removeListener = () => {
    window.removeEventListener('mousemove', listener);
    window.removeEventListener('mouseup', removeListener);
    setIsDragging(false);
  };

  const removeTouchListener = () => {
    window.removeEventListener('touchmove', touchListener);
    window.removeEventListener('touchend', removeTouchListener);
  };

  const handleDown = () => {
    window.addEventListener('mousemove', listener);
    window.addEventListener('mouseup', removeListener);
    setIsDragging(true);
  };

  const handleTouch = () => {
    window.addEventListener('touchmove', touchListener);
    window.addEventListener('touchend', removeTouchListener);
  };

  // End Listeners

  // Hide Panel
  const handleCollapse = () =>  dispatch(togglePanel(title))

  // Props change when window changes, updates local state here
  useEffect(() => {
    setX(defaultX);
    setY(defaultY);
  }, [open, defaultX, defaultY]);

  // Component return
  return (
    <DragContainer
      style={{ left: `${X}px`, top: `${Y}px`, zIndex: z || 1 }}
      className={open ? '' : 'collapsed'}
      isDragging={isDragging}
    >
      {children}
      <DragButton
        id="resize"
        onMouseDown={handleDown}
        onTouchStart={handleTouch}
        style={{ zIndex: 10 }}
      >
        <Icon symbol="drag" />
      </DragButton>
      {allowCollapse && <CollapseButton onClick={handleCollapse}>×</CollapseButton>}
    </DragContainer>
  );
};

export default Draggable;
