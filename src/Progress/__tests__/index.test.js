import test from 'ava'
import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'

import Progress from '../'

test('Progress output is a <div>', (t) => {
    t.plan(1);

    const renderer = TestUtils.createRenderer();
    renderer.render(<Progress />);
    const result = renderer.getRenderOutput();

    t.is(result.type, 'div', 'Progress result.type expect to be a div');
});
