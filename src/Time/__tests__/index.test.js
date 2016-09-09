import test from 'ava'
import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'

import Time from '../'

test('Time output is a <div>', (t) => {
    t.plan(1);

    const renderer = TestUtils.createRenderer();
    renderer.render(<Time />);
    const result = renderer.getRenderOutput();

    t.is(result.type, 'div', 'Time result.type expect to be a div');
});
