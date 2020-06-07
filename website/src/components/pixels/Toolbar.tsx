import React from 'react';
import { useStateXForCheckbox } from '@cloudio/statex';
import Perf from './Perf';

export default function Toolbar() {
  const show = useStateXForCheckbox(['show'], false);
  const all = useStateXForCheckbox(['all'], false);

  return (
    <div className="toolbar">
      Check to show canvas <input {...show} />
      <br />
      Check to mark all <input {...all} />
      <Perf show={show.checked} all={all.checked} />
    </div>
  );
}
