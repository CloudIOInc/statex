/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { useState, Suspense } from 'react';
import {
  Path,
  useStateXSetter,
  useStateXValue,
  useStateXForTextInput,
} from '@cloudio/statex';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {
  fullNameSelector,
  fullNameCountSelector,
  firstNameAtom,
  lastNamePath,
} from './state';

function FullName() {
  const fname = useStateXValue(fullNameSelector);
  if (!fname) {
    return <>Type your first name!</>;
  }
  return <>Full Name: {fname}</>;
}

function FullNameCount() {
  const count = useStateXValue(fullNameCountSelector);

  if (count === 0) {
    return <>...</>;
  }
  return <>{count} chars!</>;
}

interface Props {
  path: Path;
  label: string;
  autoFocus?: boolean;
}

function TextInput({ path, label, autoFocus }: Props) {
  const atom = useStateXForTextInput(path, '');

  return (
    <>
      <TextField
        {...atom}
        autoFocus={autoFocus}
        label={label}
        helperText={`@ path [${path.join('.')}]`}
        fullWidth
      />
    </>
  );
}

function Clear() {
  const set = useStateXSetter();

  function clear() {
    set(firstNameAtom, '');
    set(lastNamePath, '');
  }

  return (
    <>
      <Button variant="contained" onClick={clear}>
        Clear
      </Button>
    </>
  );
}

function DynamicField() {
  const [field, setField] = useState('firstName');
  return (
    <div>
      <RadioGroup value={field} onChange={(e, value) => setField(value)} row>
        <FormControlLabel
          value="firstName"
          control={<Radio />}
          label="First Name"
        />
        <FormControlLabel
          value="lastName"
          control={<Radio />}
          label="Last Name"
        />
      </RadioGroup>
      <TextInput label={field} path={['form', 'person', field]} />
    </div>
  );
}

function ShowState() {
  const json = useStateXValue(['form'], {});
  return <pre>{JSON.stringify(json, null, '  ')}</pre>;
}

export default function Form() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <TextInput autoFocus label="First Name" path={firstNameAtom.path} />
      </Grid>
      <Grid item xs={6}>
        <TextInput label="Last Name" path={lastNamePath} />
      </Grid>
      <Grid item xs={12}>
        <DynamicField />
      </Grid>
      <Grid item xs={12}>
        <FullName />
      </Grid>
      <Grid item xs={12}>
        <Suspense fallback={<Typography>Loading count...</Typography>}>
          <FullNameCount />
        </Suspense>
      </Grid>
      <Grid item xs={12}>
        <Clear />
      </Grid>
      <Grid item xs={12}>
        <ShowState />
      </Grid>
    </Grid>
  );
}
