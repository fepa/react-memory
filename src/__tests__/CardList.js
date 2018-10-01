import React from 'react';
import ReactDOM from 'react-dom';
import CardList from '../CardList';
import renderer from 'react-test-renderer';

const instance = <CardList
                   finished={false}
                   activeCards={[]}
                   count={1}
                   imageURL={() => { return 'foo'; }}
                   matchedPairs={{}}
                 />;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(instance, div);
});

it('does not render the finished header by default', () => {
  expect(renderer.create(instance).toJSON()).toMatchSnapshot();
});

it('renders the finished header when all pairs have been found', () => {
  const component = renderer.create(
    <CardList
      finished={true}
      activeCards={[]}
      count={1}
      imageURL={() => { return 'foo'; }}
      matchedPairs={{}}
    />,
  );
  expect(component.toJSON()).toMatchSnapshot();
});
