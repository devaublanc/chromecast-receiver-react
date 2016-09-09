import test from 'ava'
import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'

import Icon from '../'

test('Icon output is a <i>', (t) => {
    t.plan(1);

    const renderer = TestUtils.createRenderer();
    renderer.render(<Icon />);
    const result = renderer.getRenderOutput();

    t.is(result.type, 'i', 'Icon result.type expect to be a div');
});
