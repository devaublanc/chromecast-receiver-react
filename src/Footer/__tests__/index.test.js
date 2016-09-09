import test from 'ava'
import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'

import Footer from '../'

test('Footer output is a <div>', (t) => {
    t.plan(1);

    const renderer = TestUtils.createRenderer();
    renderer.render(<Footer />);
    const result = renderer.getRenderOutput();

    t.is(result.type, 'div', 'Footer result.type expect to be a div');
});
