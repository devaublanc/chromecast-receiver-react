import test from 'ava'
import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'

import Control from '../'

test('Control output is a <div>', (t) => {
    t.plan(1);

    const renderer = TestUtils.createRenderer();
    renderer.render(<Control />);
    const result = renderer.getRenderOutput();

    t.is(result.type, 'div', 'Control result.type expect to be a div');
});
