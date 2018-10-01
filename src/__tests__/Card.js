import React from 'react';
import ReactDOM from 'react-dom';
import Card from '../Card';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const instance = <Card matchedPairs={{}} activeCards={[]} imageURL='foo' />;
  ReactDOM.render(instance, div);
});

it('renders face up when matched', () => {
  const component = renderer.create(
    <Card pairing="1" matchedPairs={{"1": true}} activeCards={[]} imageURL='foo' />
  );
  expect(component.toJSON()).toMatchSnapshot();
});

// it('renders face up when active', () => {
//   console.log('active');
//   const inst = <Card pairing="1" matchedPairs={{}} activeCards={[]} />;
//   inst.props.activeCards.push(inst);
//   const component = renderer.create(
//     inst,
//   );

//   let tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });

it('renders face down when not matched and not active', () => {
  const component = renderer.create(
    <Card pairing="1" matchedPairs={{}} activeCards={[]} imageURL='foo' />,
  );
  expect(component.toJSON()).toMatchSnapshot();
});
