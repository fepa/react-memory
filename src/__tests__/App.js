import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import App from '../App';
import Card from '../Card';

const instance = <App />;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(instance, div);
});


it('renders right amount of cards when dragging slider', () => {
  const div = document.createElement('div');
  const tree = ReactDOM.render(instance, div);

  const rangeNode = ReactDOM.findDOMNode(tree).querySelector('input[type="range"]');
  rangeNode.value = 1;
  TestUtils.Simulate.change(rangeNode);

  expect(TestUtils.scryRenderedComponentsWithType(tree, Card).length).toEqual(2);
});

it('flips cards down when pressing the reset button', () => {
  const div = document.createElement('div');
  const tree = ReactDOM.render(instance, div);
  const resetButton = ReactDOM.findDOMNode(tree).querySelector('input[type="button"]');

  const appNode = ReactDOM.findDOMNode(tree);
  const card = appNode.querySelectorAll('.card')[0];

  TestUtils.Simulate.click(card);
  TestUtils.Simulate.click(resetButton);

  expect(appNode.querySelectorAll('.card:not(.-face-down)').length).toEqual(0);
});


it('changes image placeholder service with select box', () => {
  const div = document.createElement('div');
  const tree = ReactDOM.render(instance, div);
  const resetButton = ReactDOM.findDOMNode(tree).querySelector('input[type="button"]');

  const appNode = ReactDOM.findDOMNode(tree);
  const serviceOption = appNode.querySelector('option');

  serviceOption.value = 'http://example.com?';
  TestUtils.Simulate.change(serviceOption);

  const serviceURL = Array.from(appNode.querySelectorAll('img')).map(img => {
    return img.getAttribute('src').split('?')[0];
  }).filter((elem, pos, arr) => {
    return arr.indexOf(elem) == pos;
  });

  expect(serviceURL[0]).toEqual('http://example.com');
});
