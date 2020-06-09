import { selector, atom } from '@cloudio/statex';
import { MasterType, masterData, DetailType, detailsData } from './types';

const activeMasterAtom = atom<MasterType | null>({
  path: ['data', 'activeMaster'],
  defaultValue: null,
});

const masterSelector = selector<MasterType[]>({
  path: ['data', 'master'],
  defaultValue: [],
  get: () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(masterData), 1000);
    });
  },
});

const detailsSelector = selector<DetailType[]>({
  path: ['data', 'details', ':key'],
  defaultValue: [],
  get: ({ params }) => {
    if (!params?.key) {
      return [];
    }
    return new Promise((resolve) => {
      setTimeout(() => resolve(detailsData[params.key]), 1000);
    });
  },
});

export { detailsSelector, masterSelector, activeMasterAtom };
