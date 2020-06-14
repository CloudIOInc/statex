---
title: Installation
---

The StateX package lives in <a href="https://www.npmjs.com/get-npm" target="_blank">npm</a>. To install the latest stable version, run the following command:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
defaultValue="yarn"
values={[
{ label: 'Yarn', value: 'yarn', },
{ label: 'NPM', value: 'npm', },
]
}>
<TabItem value="yarn">

```bash {1}
yarn add @cloudio/statex
```

</TabItem>
<TabItem value="npm">

```bash {1}
npm install --save @cloudio/statex
```

</TabItem>
</Tabs>

### Create React App Tempates

<Tabs
defaultValue="Typescript"
values={[
{ label: 'Typescript', value: 'Typescript', },
{ label: 'Javascript', value: 'Javascript', },
]
}>
<TabItem value="Typescript">

```bash {1}
yarn create react-app my-app --template statex-typescript
```

</TabItem>
<TabItem value="Javascript">

```bash {1}
yarn create react-app my-app --template statex
```

</TabItem>
</Tabs>

##### TodoMVC App built with create-react-app & StateX

Checkout https://github.com/CloudIOInc/statex-todomvc

[![Edit CloudIOInc/statex-todomvc](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/CloudIOInc/statex-todomvc/tree/master/?autoresize=1&fontsize=14&hidenavigation=1&module=%2Fsrc%2FApp.tsx&theme=dark)
