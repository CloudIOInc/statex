import React from 'react';
import { StateX } from '../core/StateXStore';
import MutationObserver from 'mutation-observer';

window.MutationObserver = window.MutationObserver ?? MutationObserver;

const spyDebug = jest.fn().mockImplementation();
jest.spyOn(React, 'useLayoutEffect');
const debug = StateX.prototype.debug;

function mockDebug() {
  StateX.prototype.debug = spyDebug;
}

function resetDebug() {
  StateX.prototype.debug = debug;
}

mockDebug();

export { mockDebug, resetDebug, spyDebug };
