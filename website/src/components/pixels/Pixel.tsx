import React from 'react';
import { pixelWithID } from './helpers';
import { useStateX, useStateXValue } from '@cloudio/statex';

export default function Pixel({ id }: { id: string }) {
  const [value, setValue] = useStateX(pixelWithID(id), 0);
  useStateXValue(['all'], false, {
    onChange: ({ value }) => {
      setValue(value ? 1 : 0);
    },
  });

  // const [value, setValue] = useState(0);
  // const [color, setColor] = useRecoilState(pixelColorByID(id))

  function onMouseEnter() {
    setValue(1);
  }
  const className = value
    ? 'pixel pixel-stats-full'
    : 'pixel pixel-stats-empty';
  return <span className={className} onMouseEnter={onMouseEnter} />;
}
