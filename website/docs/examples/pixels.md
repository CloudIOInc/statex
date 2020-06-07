---
id: performance
title: Performance
---

In this example, we'll take StateX to a ride and see how it performs!

Click on `Check to show canvas` to render 20K atoms using [useStateX](../api-reference/core/useStateX) hook. Then move your mouse over the canvas to see the pixels turning orange.

Click on `Check to mark all` to call setValue on all 20K atoms to mark all cells orange, i.e. 20K state updates!

import App from '../../src/components/pixels/App';

<App />
