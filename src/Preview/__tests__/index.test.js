import test from 'ava'
import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'

import Preview from '../'

test('Preview output is a <div>', (t) => {
    t.plan(1);

    const renderer = TestUtils.createRenderer();
    renderer.render(<Preview />);
    const result = renderer.getRenderOutput();

    t.is(result.type, 'div', 'Preview result.type expect to be a div');
});
