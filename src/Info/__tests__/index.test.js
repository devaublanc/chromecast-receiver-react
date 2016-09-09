import test from 'ava'
import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'

import Info from '../'

test('Info output is a <div>', (t) => {
    t.plan(1);

    const renderer = TestUtils.createRenderer();
    renderer.render(<Info />);
    const result = renderer.getRenderOutput();

    t.is(result.type, 'div', 'Info result.type expect to be a div');
});
