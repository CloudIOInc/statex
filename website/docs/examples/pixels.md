---
id: performance
title: Performance
---

In this example, we'll take StateX to a ride and see how it performs!

Click on `Check to show canvas` to render 20K atoms using [useStateX](../api-reference/core/useStateX) hook. Then move your mouse over the canvas to see the pixels turning orange.

Toggle `Check to mark all` to update all atoms to 1 or 0 and watch all pixels turning Orange or Black., i.e. 20K subscriptions in action!

import App from '../../src/components/pixels/App';

<App />

[View this code on github](https://github.com/CloudIOInc/statex/blob/master/website/src/components/pixels/App.tsx)
