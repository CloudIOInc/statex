import React, { useState, Suspense } from 'react';
import {
  Path,
  atom,
  useStateXValueSetter,
  selector,
  useStateXValue,
  useStateXForTextInput,
} from '@cloudio/statex';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import CircularProgress from '@material-ui/core/CircularProgress';

const lastName = ['form', 'person', 'lastName'];

const firstName = atom({
  path: ['form', 'person', 'firstName'],
  defaultValue: '',
  updater: ({ value, oldValue, get, set }) => {
    const name = get<string>(lastName);
    if (name?.toUpperCase() === oldValue?.toUpperCase()) {
      set(lastName, value.toLowerCase());
    }
    return value.toUpperCase();
  },
});

const fullName = selector({
  path: ['form', 'person', 'fullName'],
  defaultValue: '',
  get: ({ get }) => {
    const fn = get(firstName);
    const ln = get(lastName);
    if (fn && ln) {
      return `${fn} ${ln}`;
    }
    return '';
  },
});

const fullNameCount = selector({
  path: ['form', 'person', 'fullNameCount'],
  defaultValue: 0,
  get: ({ get }) => {
    const fn = get(fullName);
    // return fn.length;
    return new Promise<number>((resolve) => {
      setTimeout(() => resolve(fn.length), 1000);
    });
  },
});

function FullName() {
  const fname = useStateXValue(fullName);
  if (!fname) {
    return <Typography>Type your first name!</Typography>;
  }
  return <Typography>Full Name: {fname}</Typography>;
}

function FullNameCount() {
  const count = useStateXValue(fullNameCount);

  if (count === 0) {
    return <Typography>...</Typography>;
  }
  return <Typography>{count} chars!</Typography>;
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
        style={{ margin: 8 }}
        placeholder={label}
        helperText={`@ path [${path.join('.')}]`}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </>
  );
}

function Clear() {
  const setFirstName = useStateXValueSetter(firstName);
  const setLastName = useStateXValueSetter(lastName);

  function clear() {
    setFirstName('');
    setLastName('');
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
  return (
    <Card variant="outlined" color="black">
      <CardContent>
        <pre>{JSON.stringify(json, null, '  ')}</pre>
      </CardContent>
    </Card>
  );
}

export default function Form() {
  return (
    <Container maxWidth="sm">
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextInput autoFocus label="First Name" path={firstName.path} />
        </Grid>
        <Grid item xs={6}>
          <TextInput label="Last Name" path={lastName} />
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
    </Container>
  );
}
