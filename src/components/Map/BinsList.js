import React from 'react';
import { Tooltip } from '../../components';
import { formatNumber } from '../../utils';
// Helper function to clean bins generated by JsGeoDa
// Not Used
const BinsList = ({
  data=[]
}) => {
  const bins = data.map((bin) => formatNumber(bin));
  // Return div with bins, tooltip if using
  return bins.map((bin, index) => (
    <div
      className={`bin label ${
        bins.some((bin) => bin.includes('tooltip')) ? 'tooltipText' : ''
      }`}
      key={`${bin}_${index}`}
    >
      {bin.indexOf('tooltip') === -1 && bin}
      {bin.indexOf('tooltip') !== -1 && (
        <span>
          {bin.split(' tooltip:')[0]}
          <Tooltip id={bin.split(' tooltip:')[1]} />
        </span>
      )}
    </div>
  ));
};

export default BinsList;
