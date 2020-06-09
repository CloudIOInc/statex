/**
 * Copyright (c) CloudIO, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';

const container: React.CSSProperties = { display: 'flex' };

const left: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  padding: 20,
  whiteSpace: 'nowrap',
};
const right: React.CSSProperties = { flex: 1, padding: 20 };

export interface MasterType extends Record<string, string> {
  key: string;
}

export interface DetailType {
  key: string;
  desc: string;
}

const masterData: MasterType[] = [
  {
    key: 'Lorem',
  },
  {
    key: 'Mauris',
  },
  {
    key: 'Nam',
  },
  {
    key: 'Curabitur',
  },
];

const Lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent egestas iaculis nibh, vel vestibulum augue. Nunc imperdiet, tortor et accumsan egestas, nisl mi porta mi, bibendum congue libero orci sit amet orci. Ut pharetra at urna a accumsan. Nulla leo felis, tristique eget metus maximus, rhoncus ornare ante. Donec mi est, aliquet pretium placerat id, dignissim in erat. Suspendisse convallis a mauris id tincidunt. Curabitur et mattis arcu, ac sodales massa. Praesent porttitor mauris eu nunc tempor, sit amet imperdiet lacus vulputate. Aliquam scelerisque risus eu elementum molestie. Aenean blandit euismod molestie.`;
const Mauris = `Mauris ac sollicitudin odio. Integer nec viverra purus. Quisque eget sodales velit, et pulvinar enim. Pellentesque pulvinar faucibus lorem, at sagittis lectus suscipit ut. Phasellus tristique enim eu feugiat rutrum. Quisque sollicitudin eros erat, eget rhoncus arcu euismod in. Sed non enim nulla. Duis non sagittis lorem. Fusce at vulputate dui, at faucibus turpis. In vel cursus dolor, quis hendrerit urna. Proin non ultricies augue, semper placerat sem. Sed at metus quis nisl sodales consectetur in in dolor.`;
const Nam = `Nam convallis efficitur faucibus. Suspendisse molestie mauris vitae turpis vestibulum, vel finibus dolor tempus. Nullam non urna sed neque dignissim pulvinar. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque pretium diam vitae mollis elementum. In vitae pretium sem, ut euismod enim. Fusce varius justo in massa viverra, ac pellentesque libero dignissim. Sed ullamcorper eleifend diam. Ut leo turpis, pharetra nec ipsum vitae, elementum dignissim sem. Donec eu lectus eget tellus pharetra vulputate. Vivamus non mi ac turpis accumsan egestas at iaculis lectus.`;
const Curabitur = `Curabitur efficitur laoreet libero non vulputate. Fusce ultricies sapien in ligula rhoncus accumsan. Nunc ac est blandit tellus convallis maximus nec quis risus. Mauris tincidunt sapien id lacinia mollis. Curabitur suscipit egestas ante at porta. Nam dui justo, lobortis a auctor et, viverra non nunc. Quisque cursus aliquet tortor eget finibus. Suspendisse potenti. Vestibulum neque augue, suscipit vitae augue ut, tristique imperdiet leo. Suspendisse ante mi, pharetra quis pretium facilisis, dignissim in neque. Donec vehicula sem nec leo rutrum tincidunt. Nulla facilisi.`;

const detailsData: Record<string, DetailType[]> = {
  Lorem: [{ key: 'Lorem', desc: Lorem }],
  Mauris: [{ key: 'Mauris', desc: Mauris }],
  Nam: [{ key: 'Nam', desc: Nam }],
  Curabitur: [{ key: 'Curabitur', desc: Curabitur }],
};

export { masterData, detailsData, container, left, right };
