import React from 'react';
import { useStateXValue } from '@cloudio/statex';

const PixelStats = () => {
  const pixels = useStateXValue<Record<string, number>>(['pixel'], {});
  const values = Object.values(pixels);
  const full = values.filter((v) => v === 1).length;
  const empty = values.length - full;

  return (
    <div className="pixel-stats">
      <label className="pixel-stats-full">
        {full} / {values.length}
      </label>
      <label className="pixel-stats-empty">
        {empty} / {values.length}
      </label>
    </div>
  );
};

export default PixelStats;
