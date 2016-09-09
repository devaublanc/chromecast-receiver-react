import test from 'ava'
import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'

import ControlBar from '../'

test('ControlBar output is a <div>', (t) => {
    t.plan(1);

    const renderer = TestUtils.createRenderer();
    renderer.render(<ControlBar />);
    const result = renderer.getRenderOutput();

    t.is(result.type, 'div', 'ControlBar result.type expect to be a div');
});
