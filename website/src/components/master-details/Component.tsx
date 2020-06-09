import React, { Suspense } from 'react';
import { useStateX, useStateXValue } from '@cloudio/statex';
import { activeMasterAtom, detailsSelector, masterSelector } from './state';
import { container, left, right } from './types';

function DetailComponent() {
  const master = useStateXValue(activeMasterAtom);
  const rows = useStateXValue(detailsSelector, {
    params: { key: master?.key ?? 'DEFAULT' },
  });
  if (!master || !rows) {
    return <div>&#9756; Click on a master link...</div>;
  }
  return (
    <>
      {master.key}
      {rows.map((v) => (
        <div key={v.key}>{v.desc}</div>
      ))}
    </>
  );
}

function MasterComponent() {
  const rows = useStateXValue(masterSelector);
  const [activeMaster, setActiveMaster] = useStateX(activeMasterAtom);
  return (
    <>
      {rows.map((m) => (
        <div key={m.key}>
          {activeMaster === m ? <>&#10147; </> : null}
          <a href="#/" onClick={() => setActiveMaster(m)}>
            {m.key}
          </a>
        </div>
      ))}
    </>
  );
}

export default function MasterDetails() {
  return (
    <div style={container}>
      <div style={left}>
        <Suspense fallback={'Loading Master...'}>
          <MasterComponent />
        </Suspense>
      </div>
      <div style={right}>
        <Suspense fallback={'Loading Details...'}>
          <DetailComponent />
        </Suspense>
      </div>
    </div>
  );
}
