import test from 'ava'
import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'

import Seekbar from '../'

test('Seekbar output is a <div>', (t) => {
    t.plan(1);

    const renderer = TestUtils.createRenderer();
    renderer.render(<Seekbar />);
    const result = renderer.getRenderOutput();

    t.is(result.type, 'div', 'Seekbar result.type expect to be a div');
});
